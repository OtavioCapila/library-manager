const Book = require('../models/bookModel');
const User = require('../models/userModel');
module.exports = {

    async createBook(req, res) {
        const {
            bookName,
            bookCreator
        } = req.body;
        Book.create({
            bookName,
            bookCreator
        }).then((book) => {
            console.log('book: ', book);
            res.status(200).json({
                data: book,
                message: 'Success'
            })
        }).catch((err) => {
            res.status(500).json({
                message: 'Failed to create a new book'
            })
        })
    },

    async getAllBooks(req, res) {
        Book.find().populate('bookTakenBy')
            .then((books) => {
                res.status(200).json({
                    data: books,
                    message: 'Success'
                })
            }).catch(() => {
                res.status(500).json({
                    message: 'Failed to get all books'
                })
            })
    },

    async updateBook(req, res) {
        const bookQuery = {
            _id: req.params.id
        }
        const userQuery = {
            _id: req.params.userId
        }
        Book.findOneAndUpdate(bookQuery, {
                $push: {
                    bookTakenBy: req.params.userId
                }
            })
            .then((book) => {
                User.findOneAndUpdate(userQuery, {
                    $push: {
                        booksUserTaken: book._id
                    }
                }).populate('booksUserTaken').then((user) => {
                    res.status(200).json({
                        data: book,
                        message: 'Updated with success'
                    })
                }).catch((err) => {
                    res.status(500).json({
                        message: 'Failed to update book'
                    })
                })
            })
            .catch((err) => {
                res.status(500).json({
                    message: 'Failed to update book'
                })
            })


    },

    async returnBook(req, res) {
        const bookQuery = {
            _id: req.params.id
        }
        const userQuery = {
            _id: req.params.userId
        }
        Book.findOneAndUpdate(bookQuery, {
                $pull: {
                    bookTakenBy: req.params.userId
                }
            })
            .then((book) => {
                User.findOneAndUpdate(userQuery, {
                    $pull: {
                        booksUserTaken: req.params.id
                    }
                }).then((user) => {
                    res.status(200).json({
                        data: book,
                        message: 'Updated with success'
                    })
                }).catch((err) => {
                    res.status(500).json({
                        message: 'Failed to update book'
                    })
                })
            }).catch((err) => {
                res.status(500).json({
                    message: 'Failed to update book'
                })
            })

    },

    async setBookToUser(req, res) {
        console.log('req: ', req.body);
        const userQuery = {
            _id: req.body.client_id
        }
        const bookQuery = {
            _id: req.params.id
        }
        User.findOneAndUpdate(userQuery, {
            $push: {
                booksUserTaken: req.params.id
            }
        }).then((user) => {
            console.log('user: ', user);
            Book.findOneAndUpdate(bookQuery, {
                $push: {
                    bookTakenBy: req.body.client_id
                }
            }).then((book) => {
                console.log('book: ', book);
                res.status(200).json({
                    data: book,
                    message: 'Success'
                })
            }).catch((err) => {
                res.status(500).json({
                    message: 'Failed to set book to user'
                })
            })
        }).catch((err)=>{
            res.status(500).json({               
                message: 'Failed to set book to user'
            })
        })

    }
}