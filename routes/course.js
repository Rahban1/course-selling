const { Router } = require('express');

const courseRouter = Router();

courseRouter.post('/purchase',(req,res)=>{

    res.json({
        msg: "course purchased"
    })
})

courseRouter.get('/preview',(req,res)=>{
    res.send("hello from preview")
})

module.exports = {
    courseRouter
}