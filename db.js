const mongoose = require('mongoose');

const ObjectId = mongoose.Types.ObjectId;
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    firstName: String,
    lastName: String
})

const adminSchema = new mongoose.Schema({
    email: String,
    password: String,
    firstName: String,
    lastName: String
})

const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    imageUrl: String,
    price: Number
})

const purchaseSchema = new mongoose.Schema({
    userId: ObjectId,
    courseId: ObjectId
})

const userModel = mongoose.model('userModel',userSchema);
const adminModel = mongoose.model('adminModel',adminSchema);
const courseModel = mongoose.model('courseModel',courseSchema);
const purchaseModel = mongoose.model('purchaseModel',purchaseSchema);

module.exports = {
  userModel,
  adminModel,
  courseModel,
  purchaseModel
}