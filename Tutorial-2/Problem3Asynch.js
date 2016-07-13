
/*
Example of ASYNCHRONOUS file read.
Function readFile does not block (wait) for the file to be read. 

Instead its argument function(err,data) will be called once the file has been read. 
function(err,data) is the "call back" function that will be called when readFile's task is done.
*/


var fs = require('fs'); 

fs.readFile('songs/sister_golden_hair.txt', function(err, data) {

  if(err) throw err; 
  var array = data.toString().split("\n"); 
  //get rid of any return characters
  for(i in array) 	 
     array[i] = array[i].replace(/(\r\n|\n|\r)/gm,"");

  var chordLine = '';
  var lyricLine = '';

  for(var i=0; i<array.length; i++) { 
     var line = array[i];
	 //console.log(line);
	 //console.log(typeof line);
	 var isReadingChord = false;
     chordLine = '';
	 lyricLine = '';
	 var chordLength = 0; //length of chord symbol 

	 //The for-each loop will not work when require('colour') is used.
	 //Exercise -can you tell why?
	 //for(charIndex in line) {

	 for(var charIndex = 0; charIndex < line.length; charIndex++) {
	    var ch = line.charAt(charIndex);
		if(ch === '['){isReadingChord = true; chordLength = 0;}
		if(ch === ']'){isReadingChord = false;}
		if(!isReadingChord && ch != ']'){
	       lyricLine = lyricLine + ch;
		   if(chordLength > 0) chordLength--;
		   else chordLine = chordLine + " ";
		}
		if(isReadingChord && ch != '['){
		   chordLine = chordLine + ch;
		   chordLength++;
		}

	 }

     console.log('');
     console.log(chordLine);
	 console.log(lyricLine);
  } 
});

