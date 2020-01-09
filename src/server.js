import express from 'express';
import cors from 'cors';
import 'babel-polyfill';
import Auth from '../api/v1/middleware/Auth';
import UserService from '../api/v1/services/UserService';
import CreditCardService from '../api/v1/services/CreditCardService';
const path = require('path')
import uuidv4 from 'uuid/v4';

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
console.log(uuidv4());
app.use(cors(corsOpts));
app.listen(port); 

app.post('/api/register', UserService.create);
app.post('/api/login', UserService.login);
app.get('/api/card', CreditCardService.verify, Auth.verifyToken);
app.post('/api/card/connect', CreditCardService.connect);
console.log('app running on port ', 3000);
