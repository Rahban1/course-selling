
const { adminModel, courseModel } = require('../db.js')
const express = require('express');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { adminMiddleware } = require('../middlewares/admin.js')
const adminRouter = express.Router();


adminRouter.post('/signup',async (req,res)=>{
    const {email, password,firstName, lastName} = req.body;
    
    const mail = await adminModel.findOne({ email});
    if(mail){
        res.status(409).json({
            msg: "user already present with this email"
        })
    }
    else{
        const hashedPassword = await bcrypt.hash(password,10);
        try{
            await adminModel.create({
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

adminRouter.post('/login',async (req,res)=>{
    const {email, password} = req.body;

    try{
        const admin = await adminModel.findOne({
            email
        })
        if(!admin){
            res.status(403).json({
                msg: "invalid email or password"
            })
        }
        const compare = await bcrypt.compare(password,admin.password);
        if(!compare){
            res.status(403).json({
                msg: "error while logging in"
            })
        }
        const token = jwt.sign({id: admin._id},process.env.JWT_ADMIN_PASSWORD);
        res.json({
            token
        })
    } catch(e){
        console.log(e);
        res.status(500).json({
            msg: "internal server error"
        })
    }
})

adminRouter.post('/course',adminMiddleware,async (req,res)=>{
    const adminId = req.userId;
    const { title, description, imageUrl, price } = req.body;
    try{
        const course = await courseModel.create({
            title,
            description,
            imageUrl,
            price,
            creatorId: adminId
        })
        res.json({
            msg: "course created",
            courseId: course._id
        })
    } catch(e){
        console.log(e);
        res.status(500).json({
            msg: "internal server error"
        })
    }
})

adminRouter.put('/course',adminMiddleware,(req,res)=>{

})

adminRouter.get('/course/bulk',adminMiddleware,(req,res)=>{
    const courses = courseModel.find({});
    res.json({
        courses
    })
})

module.exports = {
    adminRouter
}