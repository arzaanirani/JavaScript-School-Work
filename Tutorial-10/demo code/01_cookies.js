/*
Example of a sending and receiving cookies within an Express 4.x app.
This example uses signed cookies.
 
PREREQUISITES:
install modules listed in package.json with command:
npm install

Use browser to view pages at http://localhost:3000/image

Exercise: use cookies to keep track of which image particular clients are
viewing so different clients can view the slide show independently.

*/


var express = require('express'); //express framework
var logger = require('morgan');  //request logger
var cookieParser = require('cookie-parser');
var fs = require('fs');

var app = express();

var imageFiles = [
   '/images/lion3.jpg',
   '/images/misty.jpg',
   '/images/moose.jpg',
   '/images/wildebeast1.jpg',
   '/images/wildebeast2.jpg'
 ];
 
 var imageNumber = 0;  //VAR TO USE FOR NOW

function serveStaticFile(response, path, contentType, responseCode){
   if(!responseCode) responseCode = 200;
   fs.readFile(__dirname + path, function(err, data){
     if(err){
       //for now use success code
       response.writeHead(200, {'Content-Type': 'text/plain'});
       response.end('[' + counter++ + ']: ' + '500 INTERNAL FILE ERROR' + '\n');
     }
     else {
       response.writeHead(responseCode , {'Content-Type': contentType});
       response.end(data);

     }
   });
}

//catch all requests an log them using app.all route
app.all('*', function(request, response, next){
  console.log('-------------------------------');
  console.log('request.path: ', request.path);
  next(); //allow next route or middleware to run
});

var cookieSecret = 'COMP2406 rules!';
app.use(cookieParser(cookieSecret)); //use signed cookies
app.use( logger('dev')); //use morgan logger to keep request log files

app.get('/image', function(request,response){

  var cookie = request.cookies.imageNumber;

  if (cookie == undefined){
    var imageNumber = 0;
    response.cookie('imageNumber', imageNumber, {maxAge: 900000, httpOnly: true});
    console.log('cookie created successfully');
  }
  else
  {
    console.log('cookie exists', cookie);
    imageNumber = (parseInt(request.cookies.imageNumber) + 1) % imageFiles.length;
    response.cookie('imageNumber', imageNumber, { maxAge: 90000, httpOnly: true});
  }

  console.log('serving image number:' + imageNumber);
  serveStaticFile(response, imageFiles[imageNumber], 'image/jpeg');

  });
  //TO DO
  /*
  1)Get cookies from request object.
  2)If no cookie exists set one in the response object with imageNumber = 0.
  3)If a  imageNumber cookie exists extract the imageNumber value as integer, increment it, 
  (mod numbers of images) set the cookie with the new value in the response object.
  4)Serve the image at location imageNumber from the imageFiles array. (Should wrap around
    to the beginning after the last one.)  
  	
  */ 
  //imageNumber = (imageNumber + 1) % imageFiles.length;  //FOR NOW
  // console.log('serving image number: ' + imageNumber);
  // serveStaticFile(response, imageFiles[imageNumber], 'image/jpeg');
  



app.listen(3000);

console.log('Express Server Running at http://127.0.0.1:3000  CNTL-C to quit');