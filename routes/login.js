const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = "secretkey23456";
const {findUserByEmail, createUser} = require('../db/user/userRepository');

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    findUserByEmail(email, (err, user)=>{
        if (err) return  res.status(500).send('Server error!');
        if (!user) return  res.status(404).send('User not found!');
        const  result  =  bcrypt.compareSync(password, user.password);
        if(!result) return  res.status(401).send('Password not valid!');

        const expiresIn = 24  *  60  *  60;
        const accessToken = jwt.sign({ id:  user.id }, SECRET_KEY, {
            expiresIn: expiresIn
        });
        res.status(200).send({ "user":  user, "access_token":  accessToken, "expires_in":  expiresIn});
    });
});

module.exports = router