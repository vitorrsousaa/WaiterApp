import express from 'express';
import http from 'node:http';
import mongoose from 'mongoose';
import path from 'node:path';
import { router } from './router';

import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);
export const io = new Server(server);

mongoose
  .connect('mongodb://127.0.0.1:27017')
  .then(() => {
    app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
      res.setHeader('Access-Control-Allow-Methods', '*');
      res.setHeader('Access-Control-Allow-Headers', '*');

      next();
    });

    app.use(
      '/uploads',
      express.static(path.resolve(__dirname, '..', 'uploads'))
    );

    app.use(express.json());

    app.use(router);

    server.listen(3001, () => {
      console.log('server is running on http://localhost:3001');
    });

    console.log('Conectado ao mongo');
  })
  .catch(() => console.log('Erro ao conectar ao mongo, ta errando'));
