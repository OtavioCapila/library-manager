const User = require('../models/userModel.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/secret.js');

module.exports = {

    userLogin(req, res) {       
        const password = req.body.password;
        User.findOne({
                email: req.body.email
            })
            .then((user) => {
                try {
                    return bcrypt.compare(password, user.password)
                        .then((result) => {
                            if (result) {
                                const token = jwt.sign({
                                    data: user
                                }, config.JWT_SECRET, {
                                    expiresIn: '10h'
                                })
                                res.cookie('auth', token);
                                res.status(200).json({
                                    message: 'Success',
                                    data: user,
                                    token
                                })
                            } else {
                                res.status(500).json({
                                    error: result,
                                    message: 'Failed to login'
                                })
                            }
                        })
                } catch (err) {
                    res.status(500).json({
                        message: 'User not registered'
                    })
                }
            })
            .catch((err) => {
                res.status(500).json({
                    error: err,
                    message: 'User not registered'
                })
            })
    }
}