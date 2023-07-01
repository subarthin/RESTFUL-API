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

app.route("/articles/:name")
.get(function(req,res){
    Article.findOne({title:req.params.name}).then(function(data){
        res.send(data);
    }).catch(function(err){
        res.send("err");
    })
})
.put(function(req,res){
    Article.updateOne(
        {title:req.params.name},
        {title:req.body.title,
        content:req.body.content},
        {overwrite:false}).then(function(data){
            res.send(data)
        }).catch(function(err){
            res.send(err)
        });
})
.patch(function(req,res){
    Article.updateOne(
        {title:req.params.name},
        { $set:req.body}).then(function(data){
            res.send(data)
        }).catch(function(err){
            res.send(err)
        })
})
.delete(function(req,res){
    Article.deleteOne(
        {title:req.params.name}
    ).then(function(data){
        res.send("deleted")
    }).catch(function(err){
        res.send(err)
    })
})

app.listen(port,()=>{
    console.log("Server running at port 3000");
});