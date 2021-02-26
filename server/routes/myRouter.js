const express = require('express')

const MbDetectCtrl = require('../controllers/myController')
const auth = require('../middleware/auth') //include middleware

const router = express.Router()
const { body, check } = require('express-validator/check');

router.post('/register',
    body('name','Please Enter valid name').not().isEmpty(),
    body('email', 'Please enter valid email').isEmail(),
    body('password', 'Password length must be min a length of 5').isLength({ min: 5 }),
    MbDetectCtrl.registerUser
)


router.post('/login', 
    body('email', 'Please enter valid email').isEmail(),
    body('password', 'Password is required').exists(),
    MbDetectCtrl.login
)

router.get('/login', auth, MbDetectCtrl.getLogin)

router.get('/profile/me', auth, MbDetectCtrl.myProfile)

//Create/update user profile
//private
router.post('/profile/' ,[auth, [
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
router.put('/profile/experience', [auth,[
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'Company is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty()
]], MbDetectCtrl.addExperience)

//Delete experience from profile
//private
router.delete('/profile/experience:exp_id', auth, MbDetectCtrl.deleteExperience)

//@ Add profile education
//@ private

router.put('/profile/education', [auth,[
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