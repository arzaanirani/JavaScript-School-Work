
/*
Example of ASYNCHRONOUS file read.
Function readFile does not block (wait) for the file to be read. 

Instead its argument function(err,data) will be called once the file has been read. function(err,data) is the "call back" function that will be called when readFile's task is done.
*/


var fs = require('fs'); 
fs.readFile('songs/sister_golden_hair.txt', function(err, data) {
  if(err) throw err; 
  var array = data.toString().split("\n"); 
  //for(i in array) { console.log(array[i]); }
var spcarray;
for (i=0; i<array.length; i++){
  array2 = array[i].split(" ");
  for (k=0; k<array2.length; k++){
      if (array2[k].charAt(0) == "[") spcarray += array2[k];
      var trk = 0;
      while (trk < array2[k].length){
        spcarray += " ";
        trk++;
        }
  }
  spcarray += "\n ";
  for (k=0; k<array2.length; k++){
      if (array2[k].charAt(0) != "["){
        spcarray += array2[k];
        spcarray += " ";
      }
      else{
        spcarray += " ";
      }

  }
  spcarray += "\n ";
}
console.log(spcarray);



});


