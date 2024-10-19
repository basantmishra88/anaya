const express=require("express");
const app=express();
const First=require("./models/first.js");
const Second=require("./models/second.js");
const methodOverride=require("method-override");

const path=require("path");
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));




app.get("/buy",async (req,res)=>{
    products= await First.find()
    res.render("index.ejs",{products});
});
app.get("/buy/:id",async(req,res)=>{
    let {id}=req.params;
    let product= await First.findById(id);
    res.render("buy.ejs",{product});
});

//order now route-/buy/order
app.post("/buy/order",async(req,res)=>{
    let {prname,prquantity,prprice,name,contect}=req.body;
    let product= new Second({
        prname:prname,
        prquantity:prquantity,
        prprice:prprice,
        name:name,
        contect:contect
    });
    await product.save();
    res.redirect("/buy");
});


//adimin page
app.get("/buy/order/admin",(req,res)=>{
    res.render("admin.ejs");
});

//admin page post route
app.post("/buy/order/admin",(req,res)=>{
    let {email,password}=req.body;
    // console.log(email+" "+password);
    // res.redirect("/buy/order/admin");
    if(email === "basantmishra3875@gmail.com" && password === "basant88"){
        res.redirect("/buy/order/allorder");
    }else{
        res.redirect("/buy/order/admin");
    }
});

//all order list page
app.get("/buy/order/allorder",async(req,res)=>{
    let orders= await Second.find();
    res.render("allorder.ejs",{orders})
});

//order delete
app.get("/buy/order/:id",async(req,res)=>{
    let {id}=req.params;
    await Second.findByIdAndDelete(id);
    res.redirect("/buy/order/allorder");
});




app.get("/",(req,res)=>{
    res.send("ok working");
})

app.listen(8080,()=>{
    console.log("server on 8080");
});
