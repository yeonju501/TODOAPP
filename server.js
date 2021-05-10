const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));
const MongoClient = require('mongodb').MongoClient;

var db;
MongoClient.connect('mongodb+srv://admin:qwer1234@cluster0.ikiru.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', function(에러, client){
    if(에러) return console.log(에러);
    db = client.db('todoapp');

    app.listen(8000, function(){
        console.log('listening on 8000')
    });
    
})

app.get('/write', function(req, res){
    res.sendFile(__dirname + '/write.html')
})

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html')
})

app.post('/add', function(req, res){
    res.send('전송완료');
    //console.log(req.body);
    //console.log(req.body.title);
    //console.log(req.body.date);
    db.collection('post').insertOne({title : req.body.title, date : req.body.date}, function(에러, 결과){
        console.log('저장완료');
    })
})

app.get('/list', function(req, res){
    db.collection('post').find().toArray(function(error, result){
        console.log(result);
    });
    res.render('list.ejs');
})
