//Use javascript array of objects to represent words and their locations

var words = [];

var movingString = {word: "Moving", 
                    x: 100, 
					y:100, 
					xDirection: 1, //+1 for leftwards, -1 for rightwards
					yDirection: 1, //+1 for downwards, -1 for upwards
					stringWidth: 50, //will be updated when drawn
					stringHeight: 24}; //assumed height based on drawing point size 

//indended for keyboard control					
var movingBox = {x: 50,
                 y: 50,
				 width: 100,
				 height: 100};
				 
var wayPoints = []; //locations where the moving box has been
					
var timer;

var wordBeingMoved;

var deltaXWord, deltaYWord; //location where mouse is pressed
var canvas = document.getElementById('canvas1'); //our drawing canvas

function getWordAtLocation(aCanvasX, aCanvasY){
	
	  //locate the word near aCanvasX,aCanvasY
	  //Just use crude region for now.
	  //should be improved to using lenght of word etc.

      var context = canvas.getContext('2d');

      for(var i=0; i<words.length; i++){
        if(aCanvasX < (words[i].x + context.measureText(words[i].word).width) &&
           aCanvasX > words[i].x &&
    	   Math.abs(words[i].y - aCanvasY) < 10) return words[i];
        }

      return null;
}

var drawCanvas = function(){

    var context = canvas.getContext('2d');
	
    context.fillStyle = 'white';
    context.fillRect(0,0,canvas.width, canvas.height); //erase canvas
   
    context.font = '10pt Courier';
    context.fillStyle = 'cornflowerblue';
    context.strokeStyle = 'blue';

    for(var i=0; i<words.length; i++){  //note i declared as var

	  var data = words[i];
	  context.fillText(data.word, data.x, data.y);
      context.strokeText(data.word, data.x, data.y);
		
	}     

    movingString.stringWidth = context.measureText(movingString.word).width;
    context.fillText(movingString.word, movingString.x, movingString.y);
	
}

function handleMouseDown(e){
	
	//get mouse location relative to canvas top left
	var rect = canvas.getBoundingClientRect();
    var canvasX = e.pageX - rect.left; //use jQuery event object pageX and pageY
    var canvasY = e.pageY - rect.top;
	console.log("mouse down:" + canvasX + ", " + canvasY);
	
	wordBeingMoved = getWordAtLocation(canvasX, canvasY);

	if(wordBeingMoved != null && wordBeingMoved.x != null){
	   deltaXWord = wordBeingMoved.x - canvasX; 
	   deltaYWord = wordBeingMoved.y - canvasY;
	   //document.addEventListener("mousemove", handleMouseMove, true);
       //document.addEventListener("mouseup", handleMouseUp, true);
	$("#canvas1").mousemove(handleMouseMove);
	$("#canvas1").mouseup(handleMouseUp);
	   
	}

    // Stop propagation of the event and stop any default 
    //  browser action

    e.stopPropagation();
    e.preventDefault();
	
	drawCanvas();
	}
	
function handleMouseMove(e){
	
	console.log("mouse move");
	
	//get mouse location relative to canvas top left
	var rect = canvas.getBoundingClientRect();
    var canvasX = e.pageX - rect.left;
    var canvasY = e.pageY - rect.top;
	
	wordBeingMoved.x = canvasX + deltaXWord;
	wordBeingMoved.y = canvasY + deltaYWord;
	
	e.stopPropagation();
	
	drawCanvas();
	}
	
function handleMouseUp(e){
	console.log("mouse up");
  		
	e.stopPropagation();

	//remove mouse move and mouse up handlers but leave mouse down handler
    $("#canvas1").off("mousemove", handleMouseMove); //remove mouse move handler
    $("#canvas1").off("mouseup", handleMouseUp); //remove mouse up handler
		
	drawCanvas(); //redraw the canvas
	}
	
//JQuery Ready function -called when HTML has been parsed and DOM
//created
//can also be just $(function(){...});
//much JQuery code will go in here because the DOM will have been loaded by the time
//this runs

function handleTimer(){
	movingString.x = (movingString.x + 5*movingString.xDirection); 
	movingString.y = (movingString.y + 5*movingString.yDirection); 
	
	//keep inbounds of canvas	
	if(movingString.x + movingString.stringWidth > canvas.width) movingString.xDirection = -1;
	if(movingString.x < 0) movingString.xDirection = 1;
	if(movingString.y > canvas.height) movingString.yDirection = -1;
	if(movingString.y - movingString.stringHeight < 0) movingString.yDirection = 1;
	
	drawCanvas()
}

    //KEY CODES
	//should clean up these hard coded key codes
	var ENTER = 13;
	var RIGHT_ARROW = 39;
	var LEFT_ARROW = 37;
	var UP_ARROW = 38;
	var DOWN_ARROW = 40;


function handleKeyDown(e){
	
	console.log("keydown code = " + e.which );
		
	var dXY = 5; //amount to move in both X and Y direction
	if(e.which == UP_ARROW && movingBox.y >= dXY) 
	   movingBox.y -= dXY;  //up arrow
	if(e.which == RIGHT_ARROW && movingBox.x + movingBox.width + dXY <= canvas.width) 
	   movingBox.x += dXY;  //right arrow
	if(e.which == LEFT_ARROW && movingBox.x >= dXY) 
	   movingBox.x -= dXY;  //left arrow
	if(e.which == DOWN_ARROW && movingBox.y + movingBox.height + dXY <= canvas.height) 
	   movingBox.y += dXY;  //down arrow
	
    var keyCode = e.which;
    if(keyCode == UP_ARROW | keyCode == DOWN_ARROW){
       //prevent browser from using these with text input drop downs	
       e.stopPropagation();
       e.preventDefault();
	}

}

function handleKeyUp(e){
	console.log("key UP: " + e.which);
	if(e.which == RIGHT_ARROW | e.which == LEFT_ARROW | e.which == UP_ARROW | e.which == DOWN_ARROW){
	var dataObj = {x: movingBox.x, y: movingBox.y}; 
	//create a JSON string representation of the data object
	var jsonString = JSON.stringify(dataObj);

 
	$.post("positionData", jsonString, function(data, status){
			console.log("data: " + data);
			console.log("typeof: " + typeof data);
			var wayPoint = JSON.parse(data);
			wayPoints.push(wayPoint);
			for(i in wayPoints) console.log(wayPoints[i]);
			});
	}
	
	if(e.which == ENTER){		  
	   handleSubmitButton(); //treat ENTER key like you would a submit
	   $('#userTextField').val(''); //clear the user text field
	}

	e.stopPropagation();
    e.preventDefault();


}

/*
    Formats the response from the server side code,
    so that the words array is properly oriented for
    the drawing of the lyrics and chords.
*/
function handleSubmitButton () {
    var context = canvas.getContext('2d');
    context.font = '10pt Courier';
    var m = context.measureText('m').width;

    var userText = $('#userTextField').val(); //get text from user text input field
	  if(userText && userText != ''){
	   var userRequestObj = {text: userText};
       var userRequestJSON = JSON.stringify(userRequestObj);
	   $('#userTextField').val(''); //clear the user text field

	   $.post("userText", userRequestJSON, function(data, status){
			console.log("data: " + data);
			console.log("typeof: " + typeof data);
			var responseObj = JSON.parse(data);

			movingString.word = responseObj.text;

            var lengthOfWords = 0;
            
            if (responseObj.words) {

                words = [];

                var lengthOfWords = 15;
                var heightOfY = 40;
                var overlap = false;
                var wordCount = 0;

                for (var i = 0; i < responseObj.words.length; i++) {
                    var currWord = responseObj.words[i];
                    var currWordWidth = context.measureText(currWord).width;

                    if (lengthOfWords > 600 || currWord === "\n") {
                        lengthOfWords = 15;
                        heightOfY += 40;
                        continue;
                    }

                    if (currWord[0] == "[") {
                        if (overlap === false) {
                            words[wordCount] = { word: currWord, x: lengthOfWords - (currWordWidth/4), y: heightOfY - 15 };
                        } else {
                            words[wordCount] = { word: currWord, x: lengthOfWords + context.measureText(currWord).width + m, y: heightOfY - 15 };
                        }

                        overlap = true;
                    
                    } else {
                        words[wordCount] = { word: currWord, x: lengthOfWords, y: heightOfY }
                        lengthOfWords += context.measureText(currWord).width + m;
                        overlap = false;
                    }

                    wordCount++;
                }
            }

		});
	}
							
}

/*
    Posts a request for the server that is used to store
    a text file containing lyrics and chords. The text file is
    partially processed here, and on the server side code, so
    that it is properly saved in a chord pro style .txt file.
*/
function handleSaveButton () {
    var userText = $('#userTextField').val(); //get text from user text input field

    var dictY = {};
    var tempYVar = 0;
    var yvalues = [];

    var dictX = {};

    for (var i = 0; i < words.length; i++) {
        tempYVar = words[i].y;

        if (words[i].word[0] === "[") {
          tempYVar += 20;
        }

        tempYVar = Math.ceil(tempYVar / 20) * 20;
        tempYVar = Math.floor(tempYVar / 40) * 40;

        if (tempYVar in dictY) {
          dictY[tempYVar].push(words[i].x);
          yvalues.push(tempYVar); 
        } else {
          dictY[tempYVar] = [words[i].x];
          yvalues[i] = tempYVar;
        }

        if (words[i].x in dictX) {
          dictX[words[i].x].push(words[i].word);
        } else {
          dictX[words[i].x] = [words[i].word];
        }

    }

    yvalues.sort( function(a, b) {return a - b;} );

    if(userText && userText != ''){
       var userRequestObj = {text: userText, dictY, dictX, yvalues};
       var userRequestJSON = JSON.stringify(userRequestObj);
       $('#userTextField').val(''); //clear the user text field()
       alert('Saved');


     $.post("userText", userRequestJSON, function(data, status){
            console.log("data: " + data);
            console.log("typeof: " + typeof data);
     });
    }
}


$(document).ready(function(){
	//This is called after the broswer has loaded the web page
	
	//add mouse down listener to our canvas object
	$("#canvas1").mousedown(handleMouseDown);
	
	//add key handler for the document as a whole, not separate elements.	
	$(document).keydown(handleKeyDown);
	$(document).keyup(handleKeyUp);
		
	timer = setInterval(handleTimer, 100); 
    //timer.clearInterval(); //to stop
	
	drawCanvas();
});


