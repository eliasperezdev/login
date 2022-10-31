import express from 'express';
import authRouter from './routes/authRouter';

const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);

app.listen('3000', () => {
  console.log('Servidor web escuchando en el puerto 3000');
});
