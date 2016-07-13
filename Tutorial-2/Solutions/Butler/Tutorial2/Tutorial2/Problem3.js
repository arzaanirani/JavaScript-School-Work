var colour = require('colour');

//this function takes in 1 line of text
//this function will print 2 lines of text:
// line 1: chords extracted from input
// line 2: lyrics extracted from input
function printChords(inp){
  var result = ["",""]; //output lines
  var str = inp; //local copy of input for modifying
  var offset = 0; //offset caused by pasting the last chord (e.g. Esus2 shifts the following E 5 characters over)

  while(str.indexOf("[") != -1){
    //all chords are of the format [chord], find it by finding [ and ]
    var leftBrace = str.indexOf("[");
    var rightBrace = str.indexOf("]");

    //take the lyrics from start to [
    result[0] += str.substring(0,leftBrace);

    //pad spaces to where the chord belongs on the chord line
    for(i = offset; i < leftBrace; i++)
      result[1] += " ";
    if(leftBrace < offset) result[1] += " "; //if no padding was added (two chords in a row), add a space

    //get the chord from between the braces
    result[1] += str.substring(leftBrace+1, rightBrace);
    offset = rightBrace-leftBrace;

    //str = remainder of string after ]
    str = str.substring(rightBrace+1, 999).trim();
  }
  result[0] += str;
  console.log(result[1] .green);
  console.log(result[0] .yellow);
}


var fs = require('fs'); 
var array = fs.readFileSync('songs/sister_golden_hair.txt').toString().split("\n"); 
for(var i in array) {
    printChords(array[i]);
}
