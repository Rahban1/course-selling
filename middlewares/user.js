const jwt = require('jsonwebtoken')

const userMiddleware = (req,res,next){
    const token = req.headers.token;
    const decodedJwt = jwt.verify(token,process.env.JWT_USER_PASSWORD);
    if(!decodedJwt){
        res.status(403).json({
            msg : "auth error"
        })
    }
    next();

}

module.exports = {
    userMiddleware
}