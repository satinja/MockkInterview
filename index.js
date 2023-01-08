const express = require('express'); //Import the express dependency
var mongoose = require('mongoose');

const app = express();              //Instantiate an express app, the main work horse of this server
const port = 5000;                  //Save the port number where your server will be listening
app.use(express.static(__dirname + '/public'));
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.post('/login',function(req,res){
   var MongoClient = require('mongodb').MongoClient;
	MongoClient.connect('mongodb://admin:password@localhost:27017', function(err, client){
		if(err) throw err;
		console.log("DB Connected!");
		var db = client.db('user_db');
		var query = {userid: req.body.username};
		db.collection('users').findOne(query, function(err, result){
			if(err) throw err;
			client.close();
			if(result.password == req.body.password)
			{
				res.sendFile('landing.html', {root: __dirname}); 
			}
			else {
				console.log("Username or password mismatch!");
			}
		});
	});
});

//Idiomatic expression in express to route and respond to a client request
app.get('/', (req, res) => {        //get requests to the root ("/") will route here
    res.sendFile('index.html', {root: __dirname});      //server responds by sending the index.html file to the client's browser
                                                        //the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile 
});

app.get('/u/signup/identifier', (req, res) => {        //get requests to the root ("/") will route here
    res.sendFile('error.html', {root: __dirname}); 
});

app.post('/',function(req,res){
   var username = req.body.username;
   var htmlData = 'Hello:' + username;
   //res.send(htmlData);
   res.sendFile('error.html', {root: __dirname}); 
});

app.post('/email_next',function(req,res){
   res.sendFile('password.html', {root: __dirname}); 
});

app.post('/login',function(req,res){
   res.sendFile('password.html', {root: __dirname}); 
});

app.get('/reset_password',function(req,res){
   res.sendFile('reset_password.html', {root: __dirname}); 
});

app.get('/signup1',function(req,res){
   res.sendFile('signup.html', {root: __dirname}); 
});

app.post('/check_your_email',function(req,res){
   res.sendFile('check_your_email.html', {root: __dirname}); 
});

app.post('/account_password',function(req,res){
   res.sendFile('account_password.html', {root: __dirname}); 
});

app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${port}`); 
});