import express from 'express';
import cors from 'cors';
import 'babel-polyfill';
import Auth from './api/v1/middleware/Auth';
import UserService from './api/v1/services/UserService';
import CreditCardService from './api/v1/services/CreditCardService';
const path = require('path');

import TransactionHistoryService from './api/v1/services/TransactionHistoryService';
import ProductService from "./api/v1/services/ProductService";

require('dotenv').config({ path: path.resolve(__dirname, '../env') });

const port = process.env.PORT || 3000;
const corsOpts = {
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'x-access-token', 'Authorization']
};
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('This is an authentication server');
});
app.use(cors(corsOpts));
app.listen(port);

app.post('/api/login', UserService.login);
app.patch('/api/users', Auth.verifyToken, UserService.edit);
app.post('/api/users', UserService.create);

app.get('/api/cards', Auth.verifyToken, CreditCardService.verify);
app.post('/api/cards', Auth.verifyToken, CreditCardService.create);

app.get('/api/products/:id', Auth.verifyToken, ProductService.getProduct);
app.get('/api/products', Auth.verifyToken, ProductService.getProducts);
app.post('/api/products', Auth.verifyToken, ProductService.addProduct);
app.patch('/api/products/:id', Auth.verifyToken, ProductService.editProduct);
app.delete('/api/products/:id', Auth.verifyToken, ProductService.removeProduct);

app.get('/api/transactions', Auth.verifyToken, TransactionHistoryService.balance);
app.post('/api/transactions', Auth.verifyToken, TransactionHistoryService.addTransaction);
console.log('app running on port ', 3000);
