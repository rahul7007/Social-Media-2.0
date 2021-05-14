const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const request = require('request')
const { check, validationResult } = require('express-validator');

const User = require('../models/User')
const Profile = require('../models/Profile');
const Post = require('../models/Post');

registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body

    try {
        //Checks if user already exists
        let user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({
                errors:
                    [
                        { msg: 'User already exists' }
                    ]
            })
        }

        //Get users Gravater
        const avatar = gravatar.url(email, {
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
            user: {
                id: user.id
            }
        }
        jwt.sign(
            payload,
            'mySevretToken',
            { expiresIn: 36000 },
            (err, token) => {
                if (err) throw err
                res.json({ token })
            }
        );

        // res.send('User registered')

    } catch (err) {
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

    try {
        //Checks if user exists
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                errors:
                    [
                        { msg: 'Invalid credentials' }
                    ]
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({
                errors:
                    [
                        { msg: 'Invalid credentials!' }
                    ]
            })
        }

        //Return jsonwebtoken if credential matches
        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(
            payload,
            'mySevretToken',
            { expiresIn: 36000 },
            (err, token) => {
                if (err) throw err
                res.json({ token })
            }
        );

        // res.send('User registered')

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }
}

getLogin = async (req, res) => {
    try {
        //when we send req with token, we are expecting all the detail associated with that token except password
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error")
    }
}

myProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar'])
        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' })
        }
        res.json(profile)
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }
}

createProfile = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
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
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
        profileFields.skills = skills.split(',').map(skill => skill.trim())
    }
    // console.log(skills)
    // console.log(profileFields.skills);

    //Build social object
    profileFields.social = {}
    if (youtube) profileFields.social.youtube = youtube;
    if (facebook) profileFields.social.facebook = facebook;
    if (twitter) profileFields.social.twitter = twitter;
    if (instagram) profileFields.social.instagram = instagram;
    if (linkedin) profileFields.social.linkedin = linkedin;

    //update & insert the data
    try {
        let profile = await Profile.findOne({ user: req.user.id })

        if (profile) {
            //update
            profile = await Profile.findByIdAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true }
            );
            return res.json(profile)
        }

        //create
        profile = new Profile(profileFields)
        await profile.save()
        res.json(profile)

    } catch (error) {
        console.log(err.message)
        res.status(500).send("Server Error")
    }

    //res.send("HELLO")
}

getAllProfile = async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar'])
        res.json(profiles)
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error")
    }
}

getProfileByUser_id = async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar'])

        if (!profile) {
            return res.status(500).json({ msg: "Profile not found" })
        }

        res.json(profile)
    } catch (err) {
        console.log(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(500).json({ msg: "Invalid User ID" })
        }
        res.status(500).send("Server Error")
    }
}

deleteUser = async (req, res) => {
    try {
        //@todo - remove user posts

        //delete profile
        await Profile.findOneAndRemove({ user: req.user.id })

        //delete user
        await User.findOneAndRemove({ _id: req.user.id })

        res.json({ msg: "User deleted" })
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Sever Error")
    }



}

addExperience = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    //destructure from body
    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body

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

        profile.experience.unshift(newExp) //unshift pushes in first

        await profile.save()

        res.json(profile)
    } catch (error) {
        console.log(error, message);
        res.status(500).send("Server Error")
    }
}

deleteExperience = async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id })

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

addEducation = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    //destructure from body
    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = req.body

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

deleteEducation = async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id })

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

gitGuthubRepo = async (req, res) => {
    try {
        //display the last 5 repo (per_page=5)
        const options = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc
                    &client_id=&client_secret=`,
            method: 'GET',
            headers: { 'user-agent': 'node.js' }
        };
        request(options, (error, response, body) => {
            if (error) console.log(error);

            //send 404 if username is not exist
            if (response.statusCode !== 200) {
                return res.status(404).json({ msg: 'No github account found' })
            }

            // res.json(body)
            res.json(JSON.parse(body))
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error")
    }
}

createPosts = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const user = await User.findById(req.user.id).select('-password') //will bring user model except password
        console.log("user's info :", user);

        const newPost = new Post({
            text: req.body.text,
            name: user.name, // name, avatar & user object id will come from user
            avatar: user.avatar,
            user: req.user.id
        })

        const post = await newPost.save()

        res.json(post)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server error")
    }
}

getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 })
        res.json(posts)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error")
    }
}

getAllPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        //if there is no post against this user
        if (!post) {
            return res.status(500).json({ msg: "Post not found" })
        }
        res.json(post)
    } catch (error) {
        console.log(error.message);
        //if the id is not a valid ObjectId
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found against this user' })
        }
        res.json(500).send("Server Error")
    }
}

detPostById = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        //if there is no post against this user
        if (!post) {
            return res.status(500).json({ msg: "Post not found" })
        }

        //check if the same user is deleting the post who posted
        if (post.user.toString() !== req.user.id) //check post associated if with id from token
        {
            return res.status(401).json({ msg: 'User not authorised' })
        }

        await post.remove()

        res.json({ msg: 'Post deleted' })
    } catch (error) {
        console.log(error.message);
        //if the id is not a valid ObjectId
        if (error.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Post not found against this user' })
        }
        res.status(500).send("Server Error")
    }
}

likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        /* post : 
        {
            _id: 6039e68f0aa1965fe440ec62,
            text: 'Hi Friends, chai pee lo !',
            name: 'rahul sarma',
            avatar: '//www.gravatar.com/avatar/0a9d2a6050f73e99a100e3fdde942e8b?s=200&r=pg&d=mm',
            user: 6033d3aaa070f7419c7e3e0c,
            likes: [],
            comments: [],
            date: 2021-02-27T06:28:31.906Z,
            __v: 0
        }
        */

        //check if the post has already been liked
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ msg: "Post already liked" })
        }

        post.likes.unshift({ user: req.user.id })

        await post.save()

        res.json(post.likes)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error")
    }
}

unlikePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        //check if the post has already been unliked
        if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ msg: "Post has not been liked yet" })
        }

        //Get remove index
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id)
        post.likes.splice(removeIndex, 1)

        await post.save()

        res.json(post.likes)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error")
    }
}

commentOnPost = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const user = await User.findById(req.user.id).select('-password')

        const post = await Post.findById(req.params.id)

        const newComment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        }

        post.comments.unshift(newComment)

        await post.save()

        res.json(post.comments)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error")
    }
}

delCommentFromPost = async (req, res) => {
    try {
        //Find the post first
        const post = await Post.findById(req.params.id)

        //Find the comment to be delete
        const comment = post.comments.find(comment => comment.id === req.params.comment_id)

        //Make sure if the comment exists
        if (!comment) {
            return res.status(404).json({ msg: 'Comments does not exists!' })
        }

        //Check user
        if (comment.user.toString() !== req.user.id) { //req.user.id : logged in user
            return res.status(401).json({ msg: 'User not authorized' })
        }

        //Remove comment
        const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id)

        post.comments.splice(removeIndex, 1)

        await post.save()

        res.json(post.comments)

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error")
    }
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
    gitGuthubRepo,
    createPosts,
    getAllPosts,
    getAllPostById,
    detPostById,
    likePost,
    unlikePost,
    commentOnPost,
    delCommentFromPost
}