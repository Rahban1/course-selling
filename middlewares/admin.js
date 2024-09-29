const jwt = require('jsonwebtoken')

const adminMiddleware = (req,res,next)=>{
    const token = req.headers.token;
    const decoded = jwt.verify(token,process.env.JWT_ADMIN_PASSWORD);
    if(!decoded){
        res.status(403).json({
            msg : "auth error"
        })
    }
    req.userId = decoded.id;
    next();

}

module.exports = {
    adminMiddleware
}