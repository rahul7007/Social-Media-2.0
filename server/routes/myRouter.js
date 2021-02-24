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