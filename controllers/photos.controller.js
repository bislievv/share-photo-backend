const Photo = require('../models/Photo.model');

module.exports.photosController = {
  addPhoto: async (req, res) => {
    try {
      const photo = await Photo.create({
        name: req.body.name,
        description: req.body.description,
        author: req.user.id,
        likes: [],
        photo: `photo/${req.body.photo}`
      });

      return res.json(photo);
    } catch (e) {
      return res.status(400).json({ error: e.toString() });
    }
  },
  removePhoto: async (req, res) => {
    try {
      await Photo.findByIdAndRemove(req.params.photoId);

      res.json('Фото удалено');
    } catch (e) {
      return res.status(400).json({ error: e.toString() });
    }
  },
  getByAuthor: async (req, res) => {
    try {
      const data = await Photo.find({ author: req.params.authorId });
      res.json(data);
    } catch (err) {
      res.json(err);
    }
  },
  getAllPhotos: async (req, res) => {
    try {
      const photos = await Photo.find();

      res.json(photos);
    } catch (e) {
      res.status(400).json({ error: e.toString() });
    }
  },
  editPhoto: async (req, res) => {
    try {
      const photo = await Photo.findByIdAndUpdate(req.params.photoId, req.body);

      res.json(photo);
    } catch (e) {
      res.status(400).json({ error: e.toString() });
    }
  }
};
