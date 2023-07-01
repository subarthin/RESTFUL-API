const express=require('express');
const bodyparser=require('body-parser');
const ejs=require('ejs');
const mongoose=require('mongoose');
var app=express();
app.use(bodyparser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(express.static("public"));
const port=3000;
mongoose.connect("mongodb://0.0.0.0:27017/wikiDB",{useNewUrlParser:true});

const aschema=mongoose.Schema({
    title:String,
    content:String
});

const Article=mongoose.model("Article",aschema);

app.route("/articles")
.get(function(req,res){
    Article.find().then(function(data){
       res.send(data);
    }).then(function(err){
       console.log(err);
    })
})
.post(function(req,res){
    let t=req.body.title;
    let c=req.body.content;
    // console.log(t);
    // console.log(c);
    const item=new Article({
        title:t,
        content:c
    });
    item.save().then(function(){
        res.send("success inerted into database");
    }).catch(function(err){
        res.send(err);
    });
})
.delete(function(req,res){
    Article.deleteMany().then(function(){
        res.send("deleted")
    }).catch(function(err){
        res.send(err);
    });
});

// app.get("/articles",function(req,res){
//      Article.find().then(function(data){
//         res.send(data);
//      }).then(function(err){
//         console.log(err);
//      })
// })

// app.post("/articles",function(req,res){
//     let t=req.body.title;
//     let c=req.body.content;
//     // console.log(t);
//     // console.log(c);
//     const item=new Article({
//         title:t,
//         content:c
//     });
//     item.save().then(function(){
//         res.send("success inerted into database");
//     }).catch(function(err){
//         res.send(err);
//     });
// })

// app.delete("/articles",function(req,res){
//     Article.deleteMany().then(function(){
//         res.send("deleted")
//     }).catch(function(err){
//         res.send(err);
//     });
// });


app.listen(port,()=>{
    console.log("Server running at port 3000");
});