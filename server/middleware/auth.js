const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {

    //Get the token from header
    const token = req.params.tempToken
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBhMjhkNzhjMzEyYjAzOGM0ODY3NGE1In0sImlhdCI6MTYyMTI2NTc4NCwiZXhwIjoxNjIxMzAxNzg0fQ.wPmy_IJnt2Dl46tTnyL2TymbEfHWrkD_esvIe2jL7QM'
    console.log("auth TOKEN ", token)

    //Check if no token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied!' })
    }

    //Verify token
    try {
        const decoded = jwt.verify(token, 'mySevretToken');
        req.user = decoded.user
        next()
    } catch (err) {
        return res.status(401).json({ msg: 'Invalid token!' })
    }
}