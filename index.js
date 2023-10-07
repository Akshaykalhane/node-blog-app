// const http = require('http');
// const fs = require('fs');

// // const streams = fs.createReadStream('./test/test.txt',{encoding:'utf-8'})

// // streams.on('data',(err,data)=>{
// //     if(err){
// //         console.log(err);
// //     }
// //     console.log("********************header*******************************")
// //     console.log(data)
// // })

// const server = http.createServer((req,res)=>{
//     // fs.writeFile('./test/test.txt','hekljkejrkjer',(err,data)=>{
//     //     if(err){
//     //         console.log(err.message);
//     //     }
//     //     console.log('write')
//     // });
//     // fs.readFile('./test/test.txt',(err,data)=>{
//     //     res.setHeader('Content-Type','text/html');
//     //     if(err){
//     //         console.log(err)
//     //     }
//     //     res.write();
//     //     res.end();
//     // })
//     res.setHeader('Content-Type','text/html')
//     let path='./view/';
//     let url=req.url;
//     switch(url){
//         case '/' :
//             path+='index.html'
//             res.statusCode=200;
//             break;
//         case '/about' :
//             path+='about.html'
//             res.statusCode=200;
//             break;
//         case '/about-me':
//             res.setHeader('Location','/about');
//             res.statusCode=301
//             break;
//         default :
//         path+='/404notfound.html'
//         res.statusCode=404;
//         break;
//     }
//     fs.readFile(path,(err,data)=>{
//         err ? console.log(err) : res.write(data);
//         res.end();
//     })
// })

// server.listen(3000,()=>{
//     console.log('server started')
// })

const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
require('dotenv').config();
const Blog=require('./models/BlogModel');
const blogRouter = require('./routes/blogRouter');
const morgan = require('morgan');
const bodyParser = require('body-parser');


const app = express();
const options={
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
}

app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.urlencoded({extended:true}))
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});
app.use(express.static('styles'));

const mongoLink=process.env.DB_LINK;
mongoose.connect(mongoLink,options)
.then((result)=>console.log('connected to db'))
.catch((err)=>console.log(err)).finally(()=>console.log('all work done'))

app.use((req,res,next)=>{
    console.log(req.url);
    next();
})
app.use(morgan('dev'));

app.use(blogRouter);

// app.post('/test',(req,res)=>{
//     res.send(req.body);
// })

// app.get('/')
app.use((req,res)=>{
    res.status(404).render('404',{title:'404'});
})

app.listen(3000);
