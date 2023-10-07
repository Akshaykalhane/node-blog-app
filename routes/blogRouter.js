const express = require('express');
const router = express.Router();
const Blog=require('../models/BlogModel');

const bodyParser = require('body-parser');


router.get('/',(req,res)=>{
    // res.sendFile('./view/index.html',{root:__dirname});
    // res.render('index',{title:'Home'});
    Blog.find().sort({createdAt:-1})
    .then((result)=>{
        res.render('index',{title:'Home',blogs:result})
    })
    .catch((err)=>console.log(err));
})


router.get('/all-blog',(req,res)=>{
    Blog.find().then((result)=>res.send(result))
    .catch((err)=>console.log(err));
})

router.get('/about',(req,res)=>{
    // res.sendFile('./view/about.html',{root:__dirname});
    res.render('about',{title:'About'});
})

router.get('/about-us',(req,res)=>{
    res.redirect('/about');
})

router.get('/create-blog',(req,res)=>{
    res.render('newBlog',{title:'Create Blog'});
})

router.post('/add-blog',bodyParser.urlencoded({extended:true}),(req,res)=>{
    const data = new Blog(req.body);
    console.log(data);
    data.save()
    .then((result)=>{
        // res.json({message:'blog added'})
        res.redirect('/')
    })
    .catch((err)=>console.log(err));
})

router.get('/blog/:id',(req,res)=>{
    Blog.findById(req.params.id)
    .then((result)=>{
        res.render('single_blog',{title:'Single',id:req.params.id,blog:result});
    })
    // res.render('single_blog',{title:'Single',});
})

router.get('/edit-blog/:id',(req,res)=>{
    Blog.findById(req.params.id)
    .then((result)=> res.render('edit_blog',{title:'Edit Blog',blog:result,id:req.params.id}))
    .catch(err=>console.log(err))
})

router.patch('/update/:id',bodyParser.urlencoded({extended:true}),(req,res)=>{
    console.log(req.body,'body');
    res.json({message:"updated"})
    // Blog.findByIdAndUpdate(req.params.id,req.body,)
})

router.post('/test',(req,res)=>{
    res.send(req.body);
})

router.patch('/update-blog/:id',(req,res)=>{
    const data = req.body;
    const option={new :true};
    const id = req.params.id;
    console.log(id,'param id')
    Blog.findByIdAndUpdate(id,data,option)
    .then((result)=>{
        console.log(result)
        return res.json({redirect:"/"})
        // res.redirect('/')
    })
    .catch((err)=>console.log(err));
})

router.delete('/delete/:id',(req,res)=>{
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
    .then(()=>res.json({redirect:"/"}))
    .catch((err)=>console.log(err))
})


// router.get('/upload',(req,res)=>{
//     const blog = new Blog({
//         title:'How to learn javascript',
//         snippet:'learn javascript in just one day and become god of javascript..',
//         body:"do you want get mad and let people call you mad then just learn javascript in just one day with the help of our tutorial."
//     });

//     blog.save()
//     .then((result)=>res.send(result))
//     .catch((err)=>console.log(err.message));
// })

module.exports=router;