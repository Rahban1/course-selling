const { Router } = require('express');
const { purchaseModel } = require('../db');
const { userMiddleware } = require('../middleware/user')
const courseRouter = Router();

courseRouter.post('/purchase',(req,res)=>{
    const userId = req.userId;
    const courseId  = req.body.courseId;

    const purchased = purchaseModel.create({
        userId,
        courseId
    })
    //you would expect the user to pay you here
    res.json({
        msg: "course purchased"
    })
})

courseRouter.get('/preview',async (req,res)=>{
    const courses = await courseModel.find({});
    res.json({
        courses
    })
})

module.exports = {
    courseRouter
}