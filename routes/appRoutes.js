const express = require('express')
const appRouter = express.Router()


const {getMenu, getDish, getReviews, addReview} = require('../controllers/menu.controllers')
const {addDish} = require('../controllers/fileUpload.controllers')
const {signUpCheck, login} = require('../controllers/authentication.controllers')
const {auth, isCustomer} = require('../middlewares/auth.middlewares')

appRouter.get('/home', getMenu)
appRouter.get('/dish/:id', getDish)
appRouter.post('/addDish', addDish)
appRouter.post('/signup', signUpCheck)
appRouter.post('/login', login)
appRouter.get('/reviews', getReviews)
appRouter.post('/addReview', addReview)
appRouter.get('/isCustomer', auth, isCustomer, (req, res) => {
    res.status(200).json({
        success: true,
        message: 'successfully logged in',
        user: req.user
    })
})

module.exports = appRouter