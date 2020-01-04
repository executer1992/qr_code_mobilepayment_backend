// // const express = require('express'),   
// //     register = require('./routes/register'),
// //     login = require('./routes/login'),
// //     app = express(),
// //     cors = require('cors'),
//     port = process.env.PORT  ||  3000,    
//     app.use(express.json());
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import 'babel-polyfill';
import Auth from './usingDB/middleware/Auth';
import UserController from './usingDB/controller/UserController';
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

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
console.log('app running on port ', 3000);
