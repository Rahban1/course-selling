const { Router } = require('express');
const { userModel, purchaseModel } = require('../db.js');
const userRouter = Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { userMiddleware} =require('../middlewares/user.js')


userRouter.post('/signup',async (req,res)=>{
    const {email, password,firstName, lastName} = req.body;
    
    const mail = await userModel.findOne({ email});
    if(mail){
        res.status(409).json({
            msg: "user already present with this email"
        })
    }
    else{
        const hashedPassword = await bcrypt.hash(password,10);
        try{
            await userModel.create({
                email,
                password : hashedPassword,
                firstName,
                lastName
            });
        } catch(e){
            console.log(e)
            res.status(500).json({ msg : " internal server error"})
        }
        res.json({
            msg: "signed up"
        })
    }
})

userRouter.post('/login',async (req,res)=>{
    const {email , password} = req.body;
    try{
        const user = await userModel.findOne({
            email
        })
        if(!user){
            res.status(403).json({
                msg: "invalid username or password"
            })
        }
        const compare = await bcrypt.compare(password,user.password);
        if(!compare){
            res.status(403).json({
                msg: "invalid username or password"
            })
        }
        const token = jwt.sign({id: user._id},process.env.JWT_USER_PASSWORD);
        res.json({
            token
        })
    } catch(e){
        console.log(e)
        res.status(500).json({
            msg: "internal server error"
        })
    }
})

userRouter.get('/purchases',async (req,res)=>{
    const userId = req.userId;

    const purchases = await purchaseModel.find({
        userId
    })
    res.json({
        courses
    })
})

module.exports = {
    userRouter: userRouter
}