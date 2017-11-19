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
var url ='';
app.post('/video',function(req,res){
    url = req.body["video-url"];
    ytdl.getInfo(url,function(err,info){
        if(err){
            throw err;
        }
var imageUrl = info.iurlmq;
        res.render('video-info',
        {videoInfo:info,
            imgSrc:imageUrl,
            videoUrl:url
        });
    });
    
    //urlname should be used in ejs template
});

app.get('/filez',function(req,res){
    var id = req.params.id;
    console.log('id is : ',id);

  var video =   ytdl(url, { filter: (format) => format.container === 'mp4' })
    .pipe(fs.createWriteStream('video.mp4'));
    res.download('video.mp4');
   
   /*
    ytdl.downloadFromInfo(id,{filter:'mp4'},function(err,data){
        if(err){
            throw err;
        }
        console.log(data);
    } );
    */
    
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