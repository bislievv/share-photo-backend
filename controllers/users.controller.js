const User = require('../models/User.model');
const Photo = require('../models/Photo.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports.usersController = {
  getMyProfile: async (req, res) => {
    try {
      const profile = await User.findById(req.user.id);

      return res.json(profile);
    } catch (e) {
      return res.status(400).json({ error: e.toString() });
    }
  },
  likedPhotos: async (req, res) => {
    try {
      const candidate = await Photo.findOne({
        $and: [{ _id: req.params.id }, { likes: req.user.id }]
      });

      if (candidate) {
        await Photo.findByIdAndUpdate(req.params.id, {
          $pull: { likes: req.user.id }
        });

        await User.findByIdAndUpdate(req.user.id, {
          $pull: { likedPhotos: req.params.id }
        });

        return res.json({ photoId: req.params.id });
      } else {
        await Photo.findByIdAndUpdate(req.params.id, {
          $push: { likes: req.user.id }
        });

        await User.findByIdAndUpdate(req.user.id, {
          $push: { likedPhotos: req.params.id }
        });

        return res.json({ photoId: req.params.id });
      }
    } catch (e) {
      return res.status(400).json({ error: e.toString() });
    }
  },
  postUser: async (req, res) => {
    try {
      const { name, email, password, avatar } = req.body;

      const hash = await bcrypt.hash(password, 10);

      const findLog = await User.findOne({ email });

      if (findLog) {
        return res
          .status(401)
          .json({ error: 'Пользователь с таким логином уже существует' });
      }

      await User.create({
        name,
        email,
        avatar,
        password: hash,
        subscriptions: [],
        subscribers: [],
        likedPhotos: []
      });
      res.json('Пользователь создан');
    } catch (err) {
      res
        .status(400)
        .json({ error: `Ошибка при регистрации: ${err.toString()}` });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const candidate = await User.findOne({ email });

      if (!candidate) {
        return res.status(401).json({ error: 'Неверный email' });
      }

      const valid = await bcrypt.compare(password, candidate.password);

      if (!valid) {
        return res.status(401).json({ error: 'Неверный пароль' });
      }

      const payload = {
        id: candidate._id
      };

      const token = await jwt.sign(payload, process.env.SECRET_JWT_KEY, {
        expiresIn: '24h'
      });

      return res.json({ token, id: payload.id });
    } catch (err) {
      res.json(err);
    }
  },
  getUsers: async (req, res) => {
    try {
      const data = await User.find({});
      res.json(data);
    } catch (err) {
      res.json(err);
    }
  },
  getUser: async (req, res) => {
    try {
      const data = await User.findById(req.params.id);
      res.json(data);
    } catch (err) {
      res.json(err);
    }
  },
  editProfile: async (req, res) => {
    try {
      const profile = await User.findByIdAndUpdate(req.user.id, req.body);

      res.json(profile);
    } catch (e) {
      res.status(400).json({ error: e.toString() });
    }
  },
  subscribeUser: async (req, res) => {
    try {
      const candidate = await User.findOne({
        $and: [{ _id: req.params.id }, { subscribers: req.user.id }]
      });

      if (candidate) {
        await User.findByIdAndUpdate(req.params.id, {
          $pull: { subscribers: req.user.id }
        });

        await User.findByIdAndUpdate(req.user.id, {
          $pull: { subscriptions: req.params.id }
        });

        return res.json('Отписка оформлена');
      } else {
        await User.findByIdAndUpdate(req.params.id, {
          $push: { subscribers: req.user.id }
        });

        await User.findByIdAndUpdate(req.user.id, {
          $push: { subscriptions: req.params.id }
        });

        return res.json('Подписка оформлена');
      }
    } catch (e) {
      return res.status(400).json({ error: e.toString() });
    }
  }
};
