const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/secret.js');

module.exports = {

    async createUser(req, res) {
        const userPass = req.body.password;
        const userHash = bcrypt.hash(userPass, 10, (err, hash) => {
            if (!req.body.name || !req.body.email || !req.body.password) {
                res.status(500).json({
                    message: 'Todos os campos são obrigatórios',
                })
            } else {
                const userData = {
                    name: req.body.name,
                    email: req.body.email,
                    userType: req.body.userType,
                    password: hash,
                };

                User.create(userData)
                    .then((user) => {
                        const token = jwt.sign({
                            data: user
                        }, config.JWT_SECRET, {
                            expiresIn: '10h'
                        })
                        res.cookie('auth', token);
                        res.json({
                            message: 'Conta criada com Sucesso',
                            data: user,
                            token
                        })
                    })
                    .catch((err) => {
                        res.status(500).json({
                            message: 'Usuário já cadastrado',
                            status: 500
                        })
                    })
                return userHash;
            }
        })
    },

    async getUserData(req, res) {
        const userQuery = {
            _id: req.params.userId
        }
        User.findById(userQuery).populate('booksUserTaken')
            .then((user) => {
                res.status(200).json({
                    data: user,
                    message: 'Success'
                })
            }).catch((err) => {
                res.status(500).json({
                    data: user,
                    message: 'Failed to get user'
                })
            })
    },

    async getAllUsers(req, res) {
        User.find().populate('booksUserTaken')
            .then((users) => {
                res.status(200).json({
                    data: users,
                    message: 'Success'
                })
            }).catch((err) => {
                res.status(500).json({
                    data: user,
                    message: 'Failed to get user'
                })
            })
    }
}