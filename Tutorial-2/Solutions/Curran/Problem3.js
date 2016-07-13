/*

Line Reader

Requires npm module "line-reader"
npm install line-reader

*/

var lineReader = require('line-reader');

lineReader.eachLine( // For every line in the song
    'songs/sister_golden_hair.txt', 
    function(line, last) { 
		var string1 = "";
		var string2 = "";
		var stringLine = line;
		var skipSpaces = 0;
		for (var i=0; i<stringLine.length; i++){ // For every character in the line
			if (stringLine[i] == "["){ 
				// If the character is a '[', scan the line until ']' is found. 
				// Everything in between is the chord. Then print that chord to the top string.
				var c = "";
				var x = i+1;
				var chordString = "";
				while (c !== "]") {
					chordString += stringLine[x];
					x++;
					c = stringLine[x];
				}
				string1 += chordString;
				skipSpaces = chordString.length;
				i = x;
			} else {
				// If the character isn't a bracket, add that character to the bottom string.
				if (skipSpaces > 0){
					// Pad the top line with spaces, unless they should be skipped due to a chord having been added.
					skipSpaces--;
				} else {
					string1 += " ";
				}
				string2 += stringLine[i];
			}
		}
		console.log(string1);
		console.log(string2);
        if (last) {
            return false; // stop reading 
        } 
    }); 
