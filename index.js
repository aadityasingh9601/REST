const express = require("express");
const app = express();
const methodOverride=require("method-override");
app.use(methodOverride('_method'));
const port = 8080;
const path = require("path");
const {v4:uuidv4}= require("uuid");

app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));


app.listen(port,()=>{
    console.log(`listening to port ${port}`);
})

let posts =[
    {id:uuidv4(),
    username:"Aaditya",
    content:"Hello everyone!"},

    {id:uuidv4()
    ,username:"Kalpana",
    content:"I am very lazy."},

    {id:uuidv4(),
     username:"Yash",
    content:"I am Lulu."},

    {id:uuidv4(),
    username:"Pari",
    content:" I love Meenu mummy and Brijesh papa."},
]

app.get("/posts",(req,res)=>{    //INDEX ROUTE.
    res.render("home.ejs",{posts});
})

app.get("/posts/new",(req,res)=>{ //CREATE ROUTE.
    res.render("new.ejs");
})

app.post("/posts",(req,res)=>{
    let id=uuidv4();//So that every new post also have a id.
    let {username,content} = req.body;
    posts.push({id,username,content});
    res.redirect("/posts");
})

app.get("/posts/:id",(req,res)=>{ //Show route.
    let {id} = req.params;
    let post = posts.find((p)=> id===p.id);
    res.render("show.ejs",{post});
})

app.get("/posts/:id/edit",(req,res)=>{
    let {id}= req.params;
    let post = posts.find((p)=> id===p.id);
    res.render("edit.ejs",{post});
})

app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newContent = req.body.content;
    console.log(newContent);
    let post = posts.find((p)=> id===p.id);
    //console.log(post);
    post.content = newContent;
    res.redirect("/posts");
})

app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p)=> id !== p.id);//Jiski id post ki id ke equal nhi h vo filter ho jayegi.
    res.redirect("/posts");
})