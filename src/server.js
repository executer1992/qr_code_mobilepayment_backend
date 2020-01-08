import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import 'babel-polyfill';
import Auth from '../http/middleware/Auth';
import UserController from '../http/controller/UserController';
import FundsController from '../http/controller/FundsController';
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../env') });

const port = process.env.PORT  ||  3000;
const corsOpts = {
    origin: '*',
    methods: ['GET','POST'],
    allowedHeaders: ['Content-Type']};
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).send('This is an authentication server');
});

app.use(cors(corsOpts));
app.listen(port); 

app.post('/register', UserController.create);
app.post('/login', UserController.login);
app.get('/funds', FundsController.getBalance);
console.log('app running on port ', 3000);
