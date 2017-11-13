var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var ytdl = require('ytdl-core');
var things = require('./things.js');
var bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/',function(req,res){
    //res.sendFile(path.join(__dirname + '/index.ejs'));
    res.render('index');
});

app.post('/video',function(req,res){
    var url = req.body["video-url"];
    ytdl.getInfo(url,function(err,info){
        if(err){
            throw err;
        }
var imageUrl = info.iurlsd;
        res.render('video-info',{videoInfo:info,imgSrc:imageUrl});
    });
    
    //urlname should be used in ejs template
});

/*
//Simple request time logger
app.use( '/things' ,function(req, res, next){
    console.log("A new request received at " + Date.now());
    
    //This function call is very important. It tells that more processing is
    //required for the current request and is in the next middleware function/route handler.
    
    next();
 });
 

app.use('/things',things);

*/
app.get('/hello',function(req,res){
    res.send('Hello World');
});

app.get('/:id',function(req,res){
    res.send('The id you specified is : '+req.params.id);
})

app.post('/hello',function(req,res){
    res.send('You just called the post at hello route');
});

app.listen(3000);
console.log('server running on 3000');