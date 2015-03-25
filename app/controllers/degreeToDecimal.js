

var degreeToDecimal = function (coord, compass){ 
	//transorms standard degree min sec EXIF coord to decimal value, latitude or longitude
	//N and E compass positive, S and W compass negative
	var direction = 1;  // N or E
  	var decimalCoord; // return value
  	var elements = coord.split(",");//should give 3 element array>>> 45/1,31/1,54636/1000
	var degrees=elements[0].split("/"); //should give 2 element array 45,1 
    var finalDegrees = degrees[0]/degrees[1];
    var minutes = elements[1].split("/"); //should give 2 element array 31,1
    var finalMinutes = minutes[0]/minutes[1];
    var seconds = elements[2].split("/");  //should give 2 element array 54636/1000
    var finalSeconds = seconds[0]/seconds[1];
    if ((compass === "S")|| (compass === "W"))
    	{direction=-1 }; 
    decimalCoord = direction * (Math.abs(finalDegrees) + (finalMinutes/60.0) + (finalSeconds / 3600.0) );
    return decimalCoord;
 };

 module.exports = degreeToDecimal;