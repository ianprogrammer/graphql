const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization')

    if (!authHeader) {

        req.isAuth = false
        next();
    } else {

        const token = authHeader.split(' ')[1]

        if (!token || token === '') {
            req.isAuth = false
            next();
        }
        let decodedToken;
        try {
            decodedToken = jwt.verify(token, 'secretkey')
        } catch (error) {
            req.isAuth = false
            next();
        }
        if (!decodedToken) {
            req.isAuth = false
            next();
        }
        console.log(decodedToken.userId)
        req.isAuth = true
        req.userId = decodedToken.userId
        next();
    }
}