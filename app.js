var express = require('express'),
 mongoose = require('mongoose');
 bodyParser= require ('body-parser');

var db = mongoose.connect('mongodb://admin:admin@ds157187.mlab.com:57187/vollyballdb');

var News = require('./models/newsModel');

var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var newsRouter = express.Router();
newsRouter.route('/News')
.post(function(req,res){
var news = new News(req.body);
//console.log(book);
news.save();
//res.send(book);
//mongodb://admin:admin@ds157187.mlab.com:57187/vollyballdb
res.status(201).send(news);
	
})

//All books	
/*
.get(function(req,res){
	Book.find(function(err,books){
		if(err)
			//v1.0 console.log(err);
		res.status(500).send(err);
		else
			res.json(books);
	});
	//res.render for html
});
*/
//here it filter on all filters
/*
.get(function(req,res){
	var query=req.query;
	Book.find(query,function(err,books){
		if(err)
			//v1.0 console.log(err);
		res.status(500).send(err);
		else
			res.json(books);
	});
	//res.render for html
});
*/

.get(function(req,res){
	//this way we are only allowing our selves to filter on that one piece of info
	//so it includes both above solutions in 1
	var query={};
	if(req.query.genre)
	{
		query.genre=req.query.genre;
	}
	News.find(query,function(err,news){
		if(err)
			//v1.0 console.log(err);
		res.status(500).send(err);
		else 
			res.json(news);
	});
	//res.render for html
});

/*
//second video on GET
bookRouter.route('/Books')
.get(function(req,res){
	var responseJson ={hello : "this is my Api"};
	res.json(responseJson);
	//res.render for html
});
*/
/*
//select by id
newsRouter.route('/News/:newsId')
.get(function(req,res){
	//this way we are only allowing our selves to filter on that one piece of info
	//so it includes both above solutions in 1
	
	News.findById(req.params.newsId,function(err,news){
		if(err)
			//v1.0 console.log(err);
		res.status(500).send(err);
		else
			res.json(news);
	});
	//res.render for html
});
*/
app.use('/api',newsRouter);

app.get('/', function(req, res){
	res.send('welcome to my volly api')
	});

app.listen(port,function(){
	console.log('we are Running on port : '+ port)
	});
