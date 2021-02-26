const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const request = require('request')
const { check, validationResult } = require('express-validator');

const User = require('../models/User')
const Profile = require('../models/Profile')

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

getLogin = async(req, res) => {
    try{
        //when we send req with token, we are expecting all the detail associated with that token except password
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server Error")
    }
}

myProfile = async (req, res) => {
    try{
        const profile = await Profile.findOne({user: req.user.id}).populate('user',['name', 'avatar'])
        if(!profile){
            return res.status(400).json({msg: 'There is no profile for this user'})
        }
        res.json(profile)
    } catch(err){
        console.log(err.message);
        res.status(500).send('Server Error')
    }
}

createProfile = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    
    //destructure profile data
    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = req.body
 
    //build profile object
    const profileFields = {}
    profileFields.user = req.user.id;
    if(company) profileFields.company = company;
    if(website) profileFields.website = website;
    if(location) profileFields.location = location;
    if(bio) profileFields.bio = bio;
    if(status) profileFields.status = status;
    if(githubusername) profileFields.githubusername = githubusername;
    if(skills){
        profileFields.skills = skills.split(',').map(skill => skill.trim())
    }
    // console.log(skills)
    // console.log(profileFields.skills);

    //Build social object
    profileFields.social = {}
    if(youtube) profileFields.social.youtube = youtube;
    if(facebook) profileFields.social.facebook = facebook;
    if(twitter) profileFields.social.twitter = twitter;
    if(instagram) profileFields.social.instagram = instagram;
    if(linkedin) profileFields.social.linkedin = linkedin;

    //update & insert the data
    try{
        let profile = await Profile.findOne({user:req.user.id})

        if(profile){
            //update
            profile = await Profile.findByIdAndUpdate(
                {user:req.user.id},
                {$set: profileFields},
                {new: true}
            );
            return res.json(profile)
        }

        //create
        profile = new Profile(profileFields)
        await profile.save()
        res.json(profile)
    
    } catch(error){
        console.log(err.message)
        res.status(500).send("Server Error")
    }

    //res.send("HELLO")
}

getAllProfile = async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name','avatar'])
        res.json(profiles)
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error")
    }
}

getProfileByUser_id = async (req, res) => {
    try {
        const profile = await Profile.findOne({user:req.params.user_id}).populate('user', ['name','avatar'])
        
        if(!profile){
            return res.status(500).json({msg:"Profile not found"})
        }
        
        res.json(profile)
    } catch (err) {
        console.log(err.message);
        if(err.kind == 'ObjectId'){
            return res.status(500).json({ msg: "Invalid User ID" })
        }
        res.status(500).send("Server Error")
    }
}

deleteUser = async (req, res) => {
    try {
        //@todo - remove user posts
        
        //delete profile
        await Profile.findOneAndRemove({user:req.user.id})
        
        //delete user
        await User.findOneAndRemove({_id:req.user.id}) 
        
        res.json({ msg: "User deleted"})
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Sever Error")
    }



}

addExperience = async(req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors : errors.array()})
    }

    //destructure from body
    const{
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } =req.body

    const newExp = {
        title: title,
        company: company,
        location,
        from,
        to,
        current,
        description
    }

    try {
        const profile = await Profile.findOne({ user: req.user.id }) //user id will get from token

        profile.experience.unshift(newExp)

        await profile.save()

        res.json(profile)
    } catch (error) {
        console.log(error,message);
        res.status(500).send("Server Error")
    }
}

deleteExperience = async(req, res) =>{
    try {
        const profile = await Profile.findOne({user: req.user.id})

        //Get remove index
        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id)

        profile.experience.splice(removeIndex, 1)

        await profile.save()
        
        res.json(profile)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error")
    }
}

addEducation = async (req, res) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors : errors.array()})
    }

    //destructure from body
    const{
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } =req.body

    const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    }

    try {
        const profile = await Profile.findOne({ user: req.user.id }) //user id will get from token

        profile.education.unshift(newEdu)

        await profile.save()

        res.json(profile)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error")
    }
}

deleteEducation = async(req, res) =>{
    try {
        const profile = await Profile.findOne({user: req.user.id})

        //Get remove index
        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id)

        profile.education.splice(removeIndex, 1)

        await profile.save()
        
        res.json(profile)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error")
    }
    console.log("DELETE");
}

gitGuthubRepo = async (req, res) =>{
    try {
        //display the last 5 repo (per_page=5)
        const options = {
            uri : `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc
                    &client_id=&client_secret=`,
            method: 'GET',
            headers: { 'user-agent' : 'node.js' }
        };
        request(options, (error, response, body) =>{
            if(error) console.log(error);

            //send 404 if username is not exist
            if(response.statusCode !== 200){
                return res.status(404).json({ msg: 'No github account found'})
            }

            // res.json(body)
            res.json(JSON.parse(body))
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error")
    }
    // console.log("TEST");
}

module.exports = {
    registerUser,
    login,
    getLogin,
    myProfile,
    createProfile,
    getAllProfile,
    getProfileByUser_id,
    deleteUser,
    addExperience,
    deleteExperience,
    addEducation,
    deleteEducation,
    gitGuthubRepo
    // ac5ee8981422ef02f74a
    //d114aa875f835bb7a127971de5b3c524734f2ed9
}