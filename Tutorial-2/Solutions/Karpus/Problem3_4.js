/* #######################################*/
/* ############# PROBLEM 3/4 #############*/
/* #######################################*/

var fs = require('fs'); 
var colour = require('colour');
var array = fs.readFileSync('songs/sister_golden_hair.txt').toString().split("\n"); 

var count = 0;

var chords =[];
var lyrics =[]; 

for(var i in array) {
	count++;
	
	if (count >= 3) {			// Begin checking at index 3 of the array		
		var cnt = 0;			// which is the first line of the lyric
		lyrics[count-3] = [];	
		chords[count-3] = [];
		
		// while '[' can be found, iterate to distinguish between lyric and chord
		// and add it into the respective lyric/chord array
		while (array[i].indexOf("[") != -1) {
			lyrics[count-3][cnt] = array[i].substring(0, array[i].indexOf("["));
			array[i] = array[i].substring(array[i].indexOf("[")+1, array[i].length);
			chords[count-3][cnt] = array[i].substring(0, array[i].indexOf("]"));
			array[i] = array[i].substring(array[i].indexOf("]")+1, array[i].length);
			cnt++;
		}
		if (array[i].length > 0) {
			lyrics[count-3][cnt] = array[i];
			chords[count-3][cnt] = "";			// Padding
		}
	}
	else {
		console.log(array[i]);
	}
}

for (var i = 0; i < chords.length; i++) {
	for (var ii = 0; ii < chords[i].length; ii++) {
		if (ii == 0) {
			for (var iii = 0; iii < lyrics[i][ii].length; iii++) {			// Added offset to first chord so others will not be displaced
				process.stdout.write(" ");									// in the same line lyric.
			}		
			process.stdout.write(chords[i][ii].green);						// Printout green chords
		}
		else {
			for (var iii = 0; iii < lyrics[i][ii].length - chords[i][ii-1].length; iii++) {
				process.stdout.write(" ");
			}		
			process.stdout.write(chords[i][ii].green);						// Printout green chords
		}
	}
	console.log();
	for (var ii = 0; ii < lyrics[i].length; ii++) {
			process.stdout.write(lyrics[i][ii].yellow);						// Printout yellow lyrics
	}
}