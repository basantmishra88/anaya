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
const secondSchema=new mongoose.Schema({
    prname:String,
    prquantity:String,
    prprice:Number,
    name:String,
    contect:Number,
})
const Second=mongoose.model("Second",secondSchema);

module.exports= Second;

