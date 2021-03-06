
/*
Demonstration code to access MongoDB database from Node.js application:

Prerequisites:

1)You must have mongodb server running. It should have a database called "dbSongs" which contains a collection named "Songs".

2)You must have installed the npm module: mongodb by executing
the command:

npm install mongodb

*/


var MongoClient = require('mongodb').MongoClient;
var Server = require('mongodb').Server;
var mongo = new MongoClient();


mongo.connect("mongodb://localhost:27017/", function(err, db){
   if(err) console.log('FAILED TO CONNECT TO DATABASE');
   else{
   var myDB = db.db("dbSongs");
   console.log('CONNECTED TO DATABASE');
   myDB.collection("Songs", function(err, collection){
     var cursor = collection.find();
     cursor.each(function(err,document){
        console.log(document);
        if(document == null) myDB.close();
     });
   });
   }
   
});

