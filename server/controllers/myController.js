const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator');

const User = require('../models/User')

registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body

    try{
        //Checks if user already exists
        let user = await User.findOne({ email })
        if(user){
            return res.status(400).json({ 
                errors: 
                    [
                        {msg: 'User already exists'}
                    ] 
            })
        }
    
        //Get users Gravater
        const avatar = gravatar.url( email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })

        user = new User({
            name,
            email,
            password,
            avatar
        })
    
        //Encrypt password
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)
        console.log(req.body);
        await user.save()
    
        //Return jsonwebtoken
        const payload = {
            user : {
                id: user.id
            }
        }
        jwt.sign(
            payload, 
            'mySevretToken',
            { expiresIn:36000 },
            (err, token) => {
                if(err) throw err
                res.json({ token })
            }
        );
    
        // res.send('User registered')

    } catch(err){
        console.log(err.message);
        res.status(500).send('Server Error')
    }
}

login = async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body

    try{
        //Checks if user exists
        let user = await User.findOne({ email })
        if(!user){
            return res.status(400).json({ 
                errors: 
                    [
                        {msg: 'Invalid credentials'}
                    ] 
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(400).json({ 
                errors: 
                    [
                        {msg: 'Invalid credentials!'}
                    ] 
            })
        }
    
        //Return jsonwebtoken if credential matches
        const payload = {
            user : {
                id: user.id
            }
        }
        jwt.sign(
            payload, 
            'mySevretToken',
            { expiresIn:36000 },
            (err, token) => {
                if(err) throw err
                res.json({ token })
            }
        );
    
        // res.send('User registered')

    } catch(err){
        console.log(err.message);
        res.status(500).send('Server Error')
    }
}

getLogin = async(req, res) =>{
    try{
        //when we send req with token, we are expecting all the detail associated with that token except password
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server Error")
    }
}


module.exports = {
    registerUser,
    login,
    getLogin
}