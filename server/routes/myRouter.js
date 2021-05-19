const express = require('express')

const MbDetectCtrl = require('../controllers/myController')
const auth = require('../middleware/auth') //include middleware

const router = express.Router()
const { body, check } = require('express-validator');

router.post('/register',
    body('name', 'Please Enter valid name').not().isEmpty(),
    body('email', 'Please enter valid email').isEmail(),
    body('password', 'Password length must be min a length of 5').isLength({ min: 5 }),
    MbDetectCtrl.registerUser
)


router.post('/login',
    body('email', 'Please enter valid email').isEmail(),
    body('password', 'Password is required').exists(),
    MbDetectCtrl.login
)

router.get('/login/:tempToken', auth, MbDetectCtrl.getLogin) //hit this all the time to see if the user is logged or not and it will also give the user data

router.get('/profile/me/:tempToken', auth, MbDetectCtrl.myProfile)

//Create/update user profile
//private
router.post('/profile/:tempToken', [auth, [
    body('status', 'Status is required').not().isEmpty(),
    body('skills', 'Skills is required').not().isEmpty()
]], MbDetectCtrl.createProfile)

module.exports = router

//Get all profile
//public
router.get('/profile', MbDetectCtrl.getAllProfile)

//Get profile by user_id
//public
router.get('/profile/user/:user_id', MbDetectCtrl.getProfileByUser_id)

//Delete profile, user & posts
//private
router.delete('/profile', auth, MbDetectCtrl.deleteUser)

//Add experience
//private
router.put('/profile/experience', [auth, [
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'Company is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty()
]], MbDetectCtrl.addExperience)

//Delete experience from profile
//private
router.delete('/profile/experience:exp_id', auth, MbDetectCtrl.deleteExperience)

//@ Add profile education
//@ private

router.put('/profile/education', [auth, [
    check('school', 'School is required').not().isEmpty(),
    check('degree', 'Degree is required').not().isEmpty(),
    check('fieldofstudy', 'Field of study is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty()
]], MbDetectCtrl.addEducation)


//Delete education from profile
//private
router.delete('/profile/education:edu_id', auth, MbDetectCtrl.deleteEducation)

//Get user repo from guthub
//public
router.get('/profile/github/:username', MbDetectCtrl.gitGuthubRepo)

//Create a post
//private
router.post('/posts', [auth, [
    check('text', 'Text is required').not().isEmpty()
]], MbDetectCtrl.createPosts)

//Get all posts
//private
router.get('/getAllPosts', auth, MbDetectCtrl.getAllPosts)

//Get post by id
//private
router.get('/getPostById/:id', auth, MbDetectCtrl.getAllPostById)

//Delete a post by id
//private
router.delete('/detPostById/:id', auth, MbDetectCtrl.detPostById)

// @route    PUT api/posts/like/:id
// @desc     Like a post
// @access   Private
router.put('/posts/like/:id', auth, MbDetectCtrl.likePost)

// @route    PUT api/posts/unlike/:id
// @desc     Unlike a post
// @access   Private
router.put('/posts/unlike/:id', auth, MbDetectCtrl.unlikePost)

// @route    POST api/posts/comment/:id
// @desc     Comment on a post
// @access   Private
router.post('/posts/comment/:id', [auth, [
    check('text', 'text is requird').not().isEmpty()
]], MbDetectCtrl.commentOnPost)

// @route    DELETE api/posts/comment/:id/:comment_id
// @desc     Delete comment
//we need both : post id & comment id. Find a post by id and which post to delete
// @access   Private
router.delete('/posts/comment/:id/:comment_id', auth, delCommentFromPost)