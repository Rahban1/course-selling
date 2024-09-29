const express = require('express');
const { userRouter } = require('./routes/user');
const { courseRouter } = require('./routes/course');
const { adminRouter } = require('./routes/admin');
const dotenv = require('dotenv');
const mongoose = require('mongoose')

dotenv.config();
const app = express();
app.use(express.json());

app.use("/api/v1/user", userRouter)
app.use("/api/v1/course", courseRouter)
app.use("/api/v1/admin", adminRouter)


async function main(){
    try{
        await mongoose.connect(process.env.MONGO)
        console.log("db is connected")
        app.listen(3000,()=>{
            console.log('servers is running on 3000')
        });
    } catch(e){
        console.log(e);
    }
}
main()