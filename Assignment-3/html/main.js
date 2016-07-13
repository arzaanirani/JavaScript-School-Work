


var baseUrl = 'https://localhost:3000';
var tempUpdateInterval = 1000 * 2 //1 sec

function changeTheremostatTemp(type){
	var url = baseUrl + '/updateTemp/'
	var data = JSON.stringify({ type: type });
	$.ajax({
		type: "POST",
		url: url,
		data: data,
		success: function(){}
	});
}
/* Updates the temperature
*/
function UpdateTemp(){
	$.post('/getTemp/', function(res){
		var response = JSON.parse(res);
		$('#currentTemp').html(response.temperature);	
		$('#desiredTemp').html(response.desired);	
		$('#furnaceState').html(response.furnaceState);	
		
	});
}
/* Increases the temperature
*/
function increaseThermostTemp () {
	changeTheremostatTemp('increase');
	UpdateTemp();
}
/* Decreases the temperature
*/
function decreaseThermostTemp () {
	changeTheremostatTemp('decrease');
	UpdateTemp();
}
/* Updates the weather.
*/
function updateWeather(){
	$.post('/getWeather/', function(res){
		var response = JSON.parse(res);
		$('#description').html(response.desc);	
		$('#out_temp').html(response.main.temp);	
		$('#temp_min').html(response.main.temp_min);	
		$('#temp_max').html(response.main.temp_max);	
		$('#sea_level').html(response.main.sea_level);	
		$('#humidity').html(response.main.humidity);	
		$('#general').html(response.general);	
		$('#ground_level').html(response.main.grnd_level);	
	});
}

function refresh(){
	UpdateTemp();
	updateWeather();
}

setInterval(function(){
	UpdateTemp();
}, tempUpdateInterval);

updateWeather();
