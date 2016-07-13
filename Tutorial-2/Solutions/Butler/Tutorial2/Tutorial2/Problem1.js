
var landscape = function(questionnumber) {
//array of 3 strings
  var result = ["","",""];

//flat(2): __

  var flat = function(size) {
    for (var count = 0; count < size; count++){
//bottom string: _, other strings " "
      result[0] += "_";
      result[1] += " ";
      result[2] += " ";
    }
  };

//hill(2):  __
//         /  \
  var hill = function(size) {
//start with the slant up
    result[0] += "/";
    result[1] += " ";
    result[2] += " ";
    for (var count = 0; count < size; count++){
//put the hilltop in
      result[0] += " ";
      result[1] += "_";
      result[2] += " ";
    }
//end with the slant down
    result[0] += "\\";
    result[1] += " ";
    result[2] += " ";
  };
  var mountain = function(size) {
//slant up
    result[0] += "/";
    result[1] += " ";
    result[2] += " ";

//even further up
    result[0] += " ";
    result[1] += "/";
    result[2] += " ";

    for (var count = 0; count < size; count++){
//mountaintop
      result[0] += " ";
      result[1] += " ";
      result[2] += "_";
    }

//slant down
    result[0] += " ";
    result[1] += "\\";
    result[2] += " ";

//to the ground
    result[0] += "\\";
    result[1] += " ";
    result[2] += " ";
  };

//Question 1: flat and hill
  if(questionnumber == 1){
    flat(3)
    hill(4);
    flat(6);
    hill(1);
    flat(1);
    return result[1] + "\n" + result[0];
  }
//Question 2: flat and hill and mountain
  if(questionnumber == 2){
    flat(2);
    mountain(7);
    flat(2);
    mountain(4);
    flat(4);
    hill(3);
    flat(1);

    return result[2] + "\n" + result[1] + "\n" + result[0];
  }
};

console.log("Problem 1: ");
console.log(landscape(1));

console.log("Problem 2: ");
console.log(landscape(2));
