/* #####################################*/
/* ############# PROBLEM 1 #############*/
/* #####################################*/
var landscape = function() {
  var top= "";
  var bottom= "";
  
  var flat = function(size) {						// when flat is called, the top line is empty
    for (var count = 0; count < size; count++) 		// while the bottom line consists of underscores
      bottom += "_";								
	for (var count = 0; count < size; count++) 
	  top += " ";
  };
  var hill = function(size) {
   	top += " ";										// Pre-offset
	bottom += "/";
    for (var count = 0; count < size - 2; count++)	// when hill is called, the top line consists
      top += "_";									// of underscores and empty space for the bottom
	for (var count = 0; count < size - 2; count++) 
		bottom += " ";
	top += " ";										// Post-offset
	bottom += "\\";	
  };

  //BUILD SCRIPT
	flat(3)
	hill(7);
	flat(2);
	hill(5);
	flat(4);
	hill(2);
	flat(2);
  //END SCRIPT
  return top + ("\n") + bottom;						// return the top and bottom line separated by a 
													// new line
};
console.log(landscape());

/* #####################################*/
/* ############# PROBLEM 2 #############*/
/* #####################################*/
var landscape = function() {
  var top= "";
  var middle= "";
  var bottom= "";
  
  var flat = function(size) {						// empty characters for top/middle rows and
    for (var count = 0; count < size; count++) 		// underscores for bottom row
	  top += " ";
	for (var count = 0; count < size; count++) 
	  middle += " ";
	for (var count = 0; count < size; count++) 
      bottom += "_";
  };
  var hill = function(size) {
    bottom += "/";									// Pre-offset
	middle += " ";
	top += " ";
	
    for (var count = 0; count < size-2; count++) 
      bottom += " ";
	for (var count = 0; count < size-2; count++) 
	  middle += "_";
	for (var count = 0; count < size-2; count++) 
	  top += " ";
	  
	top += " ";										// Post-offset
	middle += " ";	
	bottom += "\\"; 
  };
  var mountain = function(size) {
	top += "  ";									// Pre-offset
	middle += " /";
	bottom += "/ ";
	
    for (var count = 0; count < size-4; count++) 
      bottom += " ";
	for (var count = 0; count < size-4; count++) 
	  middle += " ";
	for (var count = 0; count < size-4; count++) 
	  top += "_";
	  
	top += "  ";									// Post-offset
	middle += "\\ ";
	bottom += " \\"; 
  };
	//BUILD SCRIPT
	flat(3)
	mountain(7);
	hill(7);
	mountain(9);
	flat(4);
	hill(3);
	flat(1);
	//END SCRIPT
	return top + ("\n") + middle + ("\n") + bottom;
};
console.log(landscape());
