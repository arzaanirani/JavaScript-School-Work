
/*
Example of a SYNCHRONOUS file read.
the readFileSync() function blocks (waits) and only returns once the file is read.

See
http://nodejs.org/api/fs.html
and more specifically: http://nodejs.org/api/fs.html#fs_fs_readfilesync_filename_options

*/

var fs = require('fs'); 
//below: Split the source string by "\n" store into array 
var array = fs.readFileSync('songs/sister_golden_hair.txt').toString().split("\n");
// Placeholder array
var spcarray;
//Feed array2 individual lines from source
for (i=0; i<array.length; i++){
  //Split the line into words.
  array2 = array[i].split(" ");
  var spc;
  //Go through each word and check whether a chord is present.
  //If there is a chord, print it. Otherwise, print " " * length of word. (Padding)
  for (k=0; k<array2.length; k++){
      if (array2[k].charAt(0) == "["){
        //spcarray += " ";
        spcarray += array2[k];
        //spcarray += " ";
        spc = array2[k].length;
      }
      else{
        var trk = 0;
        while (trk < array2[k].length-spc){
          //spc = 0;
          spcarray += " ";
          trk++;
          }
        if (spc != 0) spcarray += " ";
      }
      spc = 0;
  }
  //The carriage return is nulled, so feed it back into the array.
  spcarray += "\n ";
  //Go through the lines again and add the actual lyrics.
  //If a chord is present, print "^" instead of the chord.
  for (k=0; k<array2.length; k++){
      if (array2[k].charAt(0) != "["){
        spcarray += array2[k];
        if (k<array2.length-1 && array2[k+1].charAt(0) != "[")
          spcarray += " ";
      }
      else{
        //for (r=0; r<array2[k].length; r++) spcarray += " ";
        //spcarray += array2[k].length;
        spcarray += "^";
      }

  }
  spcarray += "\n ";
}
//console.log(spcarray);

//Coloring the lines and printing the lyrics line by line.
spcarray = spcarray.split("\n");
var line = 1;
var colour = require('colour');
for(i=0; i<spcarray.length; i++){
  if (line == 1) {
    console.log(spcarray[i].red);
    line += 1;
  }
  else{
    console.log(spcarray[i].green);
    line -=1;
  }
};
