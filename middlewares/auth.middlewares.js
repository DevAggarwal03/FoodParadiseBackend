require('dotenv').config

const User = require('../modles/User.models')
const jwt = require('jsonwebtoken')

exports.auth = async (req, res, next) => {
    try {
        
        // const {token} = req.body;
        const authHeader = req.headers["authorization"]
        const token = authHeader.split(" ")[1];
        if(!token){
            return res.status(402).json({
                success: false,
                message: 'no token recieved fron client',
            })
        }
        
        try {
            const user = await jwt.verify(token, process.env.JWT_PRIVATE_KEY);
            req.user = user;
        } catch (error) {
            console.log('error while verifying the token');
            return res.status(400).json({
                success: false,
                message: "error while verifying the token",
            })
        }
        next()
        

    } catch (error) {
        console.log('error while making user in req: ', error);
        return res.status(401).json({
            success: false,
            message: 'error while making user in req',
            error: error,
        })
    }
}

exports.isCustomer = async(req, res, next) => {
    try {
        
        const userId = req.user.id;
        const dbUser = await User.findById({_id: userId})

        if(!dbUser){
            return res.status(404).json({
                success: false,
                message: 'no user registered for the given token please sign up first',
            })
        } 
        
        next();

    } catch (error) {
        console.log('error while confirming user ', error);
        return res.status(401).json({
            success: false,
            message: 'error while confirming user',
            error: error,
        })
    }
}

