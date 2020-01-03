"use strict";
const express = require('express'),   
    register = require('./routes/register'),
    login = require('./routes/login'),
    app = express(),
    cors = require('cors'),
    port = process.env.PORT  ||  3000,
    corsOpts = {
        origin: '*',
        methods: ['GET','POST'],
        allowedHeaders: ['Content-Type']
      }
    
    app.use(express.json());


app.get('/', (req, res) => {
    res.status(200).send('This is an authentication server');
});

app.use(cors(corsOpts));

app.listen(port); 

app.use(register);
app.use(login);
