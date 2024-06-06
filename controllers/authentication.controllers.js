require('dotenv').config()

const User = require('../modles/User.models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

exports.signUpCheck = async (req, res) => {
    try {
        const {firstName, lastName, username, email, password} = req.body;

        const duplicate = await User.findOne({email});

        if(duplicate){
            return res.status(500).json({
                success: false,
                message: 'user already exists',
                dup: duplicate,
            })
        }

        if(!isValidEmail){
            return res.status(500).json({
                success: false,
                message: 'wrong email format'
            })
        }

        let hashedPassword = null;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
            console.log(hashedPassword);
            
        } catch (error) {
           return res.status(500).json({
            success: false,
            message: 'error while hashing the password'
           }) 
        }
        
        
        const createdUser = await User.create({
            firstName,
            lastName,
            username,
            password: hashedPassword,
            email,
        })

        createdUser.password = undefined

        console.log('sign up done')
        return res.status(200).json({
            success: true,
            response: createdUser,
        })

    } catch (error) {
        console.log(`error while creating a user`)
        return res.status(500).json({
            success: false,
            message: 'error while creating a user'
        })
    }
}

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email: email});
        if(!user){
            return res.status(404).json({
                success: false,
                message: 'user not found'
            })

        }

        const correctPassword = await bcrypt.compare(password, user.password);
        if(!correctPassword){
            return res.status(400).json({
                success: false,
                message: 'not the same password'
            })
        }

        const payload = {
            email: user.email,
            id: user._id
        }

        const token = jwt.sign(payload, process.env.JWT_PRIVATE_KEY, {expiresIn: '2h'});

        const options = {
            expires: new Date(Date.now() + 2*24*60*60*1000),
            httpOnly: true,
        }

        console.log("loggedIn")
        return res.status(200).cookie('logInCookie', token, options).json({
            success: true,
            token: token,
            message: 'you logged in'
        })

    } catch (error) {
        console.log(`error while logging in: ${error}`);
        return res.status(500).json({
            success: false,
            message: "error while logging in"
        })
    }
}