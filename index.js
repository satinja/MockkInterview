const express = require("express");
// const mongoose = require('mongoose'); //Import the express dependency
console.log("Server Side code is running");
const app = express(); //Instantiate an express app, the main work horse of this server
const port = 5000;
app.set("view engine", "ejs"); //Save the port number where your server will be listening
app.use(express.static(__dirname + "/public"));
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());
app.use(express.static("public"));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.post("/login", function (req, res) {
  var MongoClient = require("mongodb").MongoClient;
  console.log("before db Connected!");
  MongoClient.connect(
    "mongodb://admin:password@localhost:27017",
    function (err, client) {
      if (err) throw err;
      console.log("DB Connected!");
      var db = client.db("user_db");
      var query = { userid: req.body.username };
      db.collection("users").findOne(query, function (err, result) {
        if (err) throw err;
        client.close();
        console.log(result);
        if (result.password == req.body.password) {
          res.sendFile("landing.html", { root: __dirname });
        } else {
          console.log("Username or password mismatch!");
        }
      });
    }
  );
});

//Idiomatic expression in express to route and respond to a client request
app.get("/", (req, res) => {
  //get requests to the root ("/") will route here
  res.sendFile("index.html", { root: __dirname }); //server responds by sending the index.html file to the client's browser
  //the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile
});

app.get("/u/signup/identifier", (req, res) => {
  //get requests to the root ("/") will route here
  res.sendFile("404.html", { root: __dirname });
});

app.post("/", function (req, res) {
  var username = req.body.username;
  var htmlData = "Hello:" + username;
  //res.send(htmlData);
  res.sendFile("404.html", { root: __dirname });
});

app.post("/email_next", function (req, res) {
  res.sendFile("password.html", { root: __dirname });
});

app.post("/login", function (req, res) {
  res.sendFile("password.html", { root: __dirname });
});

app.get("/reset_password", function (req, res) {
  res.sendFile("reset_password.html", { root: __dirname });
});

app.get("/signup1", function (req, res) {
  res.sendFile("signup.html", { root: __dirname });
});
//chnaged post to get
app.get("/check_your_email", function (req, res) {
  res.sendFile("check_your_email.html", { root: __dirname });
});

app.get("/test", function (req, res) {
  res.sendFile("test.html", { root: __dirname });
});

app.post("/account_password", function (req, res) {
  res.sendFile("account_password.html", { root: __dirname });
});
//for the server side of the button code

app.post("/start_apti", function (req, res) {
  console.log("request from postman");
  var MongoClient = require("mongodb").MongoClient;
  MongoClient.connect(
    "mongodb://admin:password@localhost:27017",
    function (err, client) {
      if (err) throw err;
      console.log("DB Connected for Test Button!");
      var db = client.db("user_db");
      //  var query = {question: 'Ques.1'};
      // res.sendFile('mcq_page.html', {root: __dirname});
      var query = { option_1: "8/14" };
      //  var query = {question_heading:'Based on Time and Work'};
      db.collection("Apti_Questions").findOne(query, function (err, result) {
        if (err) throw err;
        res.sendFile("mcq_page.html", { root: __dirname });
        console.log(result);
        client.close();
        if (
          result.option_1 == result.correct_answer ||
          result.option_2 == result.correct_answer ||
          result.option_3 == result.correct_answer ||
          result.option_4 == result.correct_answer
        ) {
          console.log("matched");
        } else {
          console.log("mismatched");
        }

        //  if((result.option_1 ||result.option_2 ||result.option_3 ||result.option_4)=== result.correct_answer){

        // 		res.sendFile(result.correct_answer);
        // 	}else{
        // 		console.log("Incorrect");
        // 	}

        console.log(result);

        //to check the correct answer
        res.send(result);
      });
    }
  );
});
function renderNextQuestion(req, res, prev_question) {
  console.log("request from post man for ejs question 1");
  var MongoClient = require("mongodb").MongoClient;
  MongoClient.connect(
    "mongodb://admin:password@localhost:27017",
    function (err, client) {
      if (err) throw err;
      console.log("ejs to be displayes in the console");
      var db = client.db("user_db");
	  var query = {question: ('Ques.' + (parseInt(prev_question)+1))}
	  console.log(query);
      db.collection("Apti_Questions").findOne(query,function (err, result) {
        if (err) throw err;

        var question = {
          question_heading: result.question_heading,
          question_type: result.question_type,
          option_1: result.option_1,
          current_Question_Number: (prev_question+1).toString(),
        };
		console.log(question);
        res.render("ques", { ques: question });
      });
    }
  );
}
app.post("/ques", function (req, res) {
  renderNextQuestion(req, res, 0);
});
// });
//  app.get('/next_apti_ques',function(req, res){
// 	console.log("request from postman");
// 	var MongoClient = require('mongodb').MongoClient;
// 	 MongoClient.connect('mongodb://admin:password@localhost:27017', function(err, client){
// 		 if(err) throw err;
// 		 console.log("DB Connected for Next_apti!");
// 		 var db = client.db('user_db');
// 		 var query = {question: 'Ques.2'};
// 		//  var query = {question_heading:'Based on Time and Work'};
// 		 db.collection('Apti_Questions').findOne(query, function(err, result){
// 			 if(err) throw err;
// 			 client.close();
// 			//  console.log(result);

// 			 res.send(result);
// 		 });
// 	 });
//  });
//  app.post('/next_apti2_ques',function(req, res){
// 	console.log("request from postman");
// 	var MongoClient = require('mongodb').MongoClient;
// 	 MongoClient.connect('mongodb://admin:password@localhost:27017', function(err, client){
// 		 if(err) throw err;
// 		 console.log("DB Connected for Next_apti_2!");
// 		 var db = client.db('user_db');
// 		 var query = {question: 'Ques.3'};
// 		//  var query = {question_heading:'Based on Time and Work'};
// 		 db.collection('Apti_Questions').findOne(query, function(err, result){
// 			 if(err) throw err;
// 			 client.close();
// 			//  console.log(result);

// 			 res.send(result);
// 		 });
// 	 });
//  });
app.post("/next_question", function (req, res) {
  console.log("request from post man for ejs question 2");
  console.log(req.body.prev_question);
  renderNextQuestion(req, res, parseInt(req.body.prev_question));


});
app.post("/algorithms", function (req, res) {
  console.log("request from postman");
  var MongoClient = require("mongodb").MongoClient;
  MongoClient.connect(
    "mongodb://admin:password@localhost:27017",
    function (err, client) {
      if (err) throw err;
      console.log("DB Connected for Algorithms");
      var db = client.db("user_db");
      var query = { Algo1: "Quick Sort" };
      //  var query = {question_heading:'Based on Time and Work'};
      db.collection("Algorithms").findOne(query, function (err, result) {
        if (err) throw err;
        client.close();
        //  console.log(result);

        res.send(result);
      });
    }
  );
});

app.listen(port, () => {
  //server starts listening for any attempts from a client to connect at port: {port}
  console.log(`Now listening on port ${port}`);
});
