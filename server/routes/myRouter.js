const express = require('express')

const MbDetectCtrl = require('../controllers/myController')
const auth = require('../middleware/auth') //include middleware

const router = express.Router()
const { body } = require('express-validator');

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
// router.put('/profile/', MbDetectCtrl.updateData)
// router.delete('/posts/', MbDetectCtrl.deleteData)

module.exports = router