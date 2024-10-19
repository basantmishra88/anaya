const express=require('express');
const app=express();
const mongoose=require("mongoose");
main().then(()=>{
    console.log("connection ok");
})
.catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/buy');
}
const firstSchema=new mongoose.Schema({
    image:String,
    name:String,
    quantity:String,
    price:Number
})
const First=mongoose.model("First",firstSchema);

module.exports= First;

