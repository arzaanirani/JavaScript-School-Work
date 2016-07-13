//Server Code

var http = require('http'); // need for http
var fs = require('fs'); // need for the reading of static files
var url = require('url');  // need to parse url strings

var counter = 1000; //to count invocations of function(req,res)
var songExists = false; //Boolean to store whether a the song file


var ROOT_DIR = 'html'; //dir to serve static files from

var MIME_TYPES = {
    'css': 'text/css',
    'gif': 'image/gif',
    'htm': 'text/html',
    'html': 'text/html',
    'ico': 'image/x-icon',
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpeg',
    'js': 'text/javascript',
    'json': 'application/json',
    'png': 'image/png',
    'txt': 'text/text'
};

var get_mime = function(filename) {
    var ext, type;
    for (ext in MIME_TYPES) {
        type = MIME_TYPES[ext];
        if (filename.indexOf(ext, filename.length - ext.length) !== -1) {
            return type;
        }
    }
    return MIME_TYPES['txt'];
};

// Creates a  server 
http.createServer(function (request,response){
     var urlObj = url.parse(request.url, true, false);
     var chordArray = [];
     var wordArray = [];
     var wordArray2 = [];

     array = [];
     songExists;

     console.log('\n============================');
	   console.log("PATHNAME: " + urlObj.pathname);
     console.log("REQUEST: " + ROOT_DIR + urlObj.pathname);
     console.log("METHOD: " + request.method);
	 
     var receivedData = '';

     //attached event handlers to collect the message data
     request.on('data', function(chunk) {
        receivedData += chunk;
     });
	 
	 //event handler for the end of the message
     request.on('end', function(){
        console.log('received data: ', receivedData);
        console.log('type: ', typeof receivedData);
		
		// If it is a POST request then echo back the data. 
    // This Post block also checks and sorts the data, then sends the sorted
    // data to the client side.
		if(request.method == "POST"){
		   var dataObj = JSON.parse(receivedData);
           console.log('received data object: ', dataObj);
           console.log('type: ', typeof dataObj);

        songExists = fs.existsSync('songs/' + dataObj.text + '.txt');

        // Write is use to assemble the string stored
        // in the chord pro file. Titile is used to
        // store the file name that is being saved.
        var write = "";
        var title = "";

        // This if block is used to assemble the strings to 
        // write to the chord pro file
        if(dataObj.dictY) {
          for (var i = 0; i < dataObj.yvalues.length; i++) {
            var currNum = dataObj.yvalues[i];
            var xNumArr = dataObj.dictY[currNum];
            
            if (dataObj.dictY[currNum]) {
              delete dataObj.dictY[currNum];
            }

            if (xNumArr != undefined) {
              xNumArr.sort( function(a, b) {return a - b;} );
              //console.log(xNumArr);

              for (var j = 0; j < xNumArr.length; j++) {
                var currX = xNumArr[j];
                write += dataObj.dictX[currX].shift() + " ";
              }

              write += "\n ";
            }
          }

          title = dataObj.text;

        }

        // Information to check the existence of files taken from the link below.
        // Taken From: https://nodejs.org/docs/latest-v0.12.x/api/fs.html#fs_fs_exists_path_callback

        if(songExists) {
          array = fs.readFileSync('songs/' + dataObj.text + '.txt').toString(); 
          wordArray = array.split("\n");

          // The for loop is used to reassemble the wordArray
          // so that the elements are split by newline and spaces.
          // Newlines are added at the end of each line for formatting 
          // the text in the canvas.
          for (i = 0; i < wordArray.length; i++) {
            wordArray2 = wordArray2.concat(wordArray[i].split(" ").concat(["\n"]));
          }

          array = wordArray2;
          
          var word = "";
          var chord = "";
          var inBracketes = false;
          var tempArr = [];

          // For loop used to format the array being sent
          // in the returnObj
          for (var i = 0; i < array.length; i++) {
              for (var j = 0; j < array[i].length; j++) {
                var currChar = array[i][j];
                //console.log(currChar);

                if (currChar === "\"") {
                  continue;
                }

                if (currChar == "[") {
                  inBracketes = true;
                }

                if (inBracketes) {
                  chord += currChar;
                } else {
                  word += currChar;
                }

                if (currChar == "]") {
                  inBracketes = false;
                }
              }
              
              if(chord !== "") {
                tempArr.push(chord);
              }              
              
              if (word !== "" && word) {
                tempArr.push(word);
              }

              chord = "";
              word = "";
          }

          array = tempArr;
        }

		   //Here we can decide how to process the data object and what
		   //object to send back to client.

  	   console.log("USER REQUEST: " + dataObj.text );
       var returnObj = {};
       returnObj.found;

       // If block will send data if the song exists
      if (songExists) {
        returnObj.text = 'FOUND: ' + dataObj.text;
        returnObj.words = array;
      }
	    else {
        returnObj.text = 'NOT FOUND: ' + dataObj.text; 
      }

      // If block will write to a file if the user sends
      // information from the client side
      if (write !== "") {
        fs.writeFile('songs/' + title + '.txt', write, function (err) {
             if (err) return console.log(err);
             write = "";
             title = "";
        });
      }
		   		   
		   //object to return to client
          response.writeHead(200, {'Content-Type': MIME_TYPES["text"]});  //does not work with application/json MIME
           response.end(JSON.stringify(returnObj)); //send just the JSON object
		 };
     });
	 
     if(request.method == "GET"){
	 //handle GET requests as static file requests
	 var filePath = ROOT_DIR + urlObj.pathname;
	 if(urlObj.pathname === '/') filePath = ROOT_DIR + '/Assignment1.html';

     fs.readFile(filePath, function(err,data){
       if(err){
		  //report error to console
          console.log('ERROR: ' + JSON.stringify(err));
		  //respond with not found 404 to client
          response.writeHead(404);
          response.end(JSON.stringify(err));
          return;
         }
         response.writeHead(200, {'Content-Type': get_mime(filePath)});
         response.end(data);
       });
	 }


 }).listen(3000);

console.log('Server Running at http://127.0.0.1:3000  CNTL-C to quit');


