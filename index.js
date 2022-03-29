require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const { PORT, MONGO_SERVER } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(require('./routes'));

const connectAndStartServer = async () => {
  try {
    await mongoose.connect(MONGO_SERVER);

    app.listen(PORT, () => {
      console.log(`Успешно соединились. Порт ${PORT}`);
    });
  } catch (e) {
    console.log(`Ошибка при подключении: ${e.toString()}`);
  }
};

connectAndStartServer().then();
