const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config/secret');
const Book = require('../models/bookModel.js');
const BookCtrl = require('../controllers/bookController.js');
const UserCtrl = require('../controllers/userController.js');
const AuthCtrl = require('../controllers/authController.js');




/**
 * Auth Routes
 */
router.post('/register', UserCtrl.createUser);
router.post('/login', AuthCtrl.userLogin);

/**
 * Book Routes
 */
router.get('/books', verifyJWT, BookCtrl.getAllBooks);
router.post('/books', verifyJWT, BookCtrl.createBook);
router.put('/book/return/:id', verifyJWT, BookCtrl.returnBook);
router.put('/book/:id', verifyJWT, async (req, res) => {
    Book.findById(req.params.id).populate('bookTakenBy')
        .then((book) => {
            if (!book.bookTakenBy) {
                BookCtrl.updateBook(req, res);
            } else {
                res.status(500).json({
                    data: book,
                    message: 'Book already taken'
                })
            }
        })
});
router.put('/books/user/:id', verifyJWT, async (req, res) => {
    Book.findById(req.params.id).populate('bookTakenBy')
        .then((book) => {
            if (!book.bookTakenBy) {
                BookCtrl.setBookToUser(req, res);
            } else {
                res.status(500).json({
                    data: book,
                    message: 'Book already taken'
                })
            }
        })
});

/**
 * User Routes
 */
router.get('/profile', verifyJWT, UserCtrl.getUserData);
router.get('/users', verifyJWT, UserCtrl.getAllUsers);


async function verifyJWT(req, res, next) {
    var token = req.headers['x-access-token'] || req.headers['authorization'];
    if (!token) return res.status(401).send({
        auth: false,
        message: 'No token provided.'
    });
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }
    if (token) {
        jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
            if (err) return res.status(500).send({
                auth: false,
                message: 'Failed to authenticate token.'
            });
            req.params.userId = decoded.data._id
            next();
        });
    }
}

module.exports = router;