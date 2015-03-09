//creates an array of circles
var circles = [];
for(var i = 0; i < 42; i ++ ){
	var element = document.getElementById(String(i));
	circles.push( element );
	}
var buttonElement = document.getElementById("reverse");
var moveHistory = [];
var count = 0;
var j = 0;
var changeClass = function( name, history ) {
	j = 0;
	while( circles[j] != name ){
		j++;
	}
	if( count % 2 == 0 ){
		if( j-7 > 0 && circles[j-7].className == 'circle' || (circles[j].className == 'circlered' || circles[j].className == 'circleyellow' )){return;}
		name.className = 'circlered';
		moveHistory.push(j);
		checkWin( j );
		count++;
	}
	else{
		if( j-7 > 0 && circles[j-7].className == 'circle' || (circles[j].className == 'circlered' || circles[j].className == 'circleyellow' )){return;}
		name.className = 'circleyellow';
		moveHistory.push(j);
		checkWin( j );
		count++;
	}
};
var takeBack = function( button ) {
	if(moveHistory.length == 0){
		return;
	}
	circles[moveHistory.pop()].className = 'circle';
	count--;
};
//onclick event to reverse a move
buttonElement.addEventListener("click",function(){takeBack(buttonElement)});
//onclick events to fill circles
for(var i = 0; i < circles.length; i ++){
	(function(i){
	circles[i].addEventListener("click",function(){changeClass(circles[i])});
	}(i));
}

//adds the left and right column to an array to check for overflow
var leftColumn = [];
var rightColumn = [];
var bottomLeftInteger = 0;
var bottomRightInteger = 6;
for (var i = 0; i < 6; i ++) {
	leftColumn[i] = bottomLeftInteger;
	rightColumn[i] = bottomRightInteger;
	bottomLeftInteger += 7;
	bottomRightInteger += 7;
};



//array containing numbers to add and subtract to find the surrounding circles
var findCircleArray = [ -8, -7, -6, -1, 1, 6, 8];
var surroundingCircles = [];
var findSurroundingCircles = function( currentId ){
		if( circles[currentId].className == 'circle'){
		return surroundingCircles;
	}
	surroundingCircles = [];
	var id = parseInt( currentId );

	//adds surrounding circles to an array
	for(var i = 0; i < findCircleArray.length; i ++) {
		if( id + findCircleArray[ i ] >= 0 && id + findCircleArray[ i ] < 42)
			surroundingCircles.push(id + findCircleArray[ i ] );
		else
			continue;
	};
	//checks for overflow if the currentId is in the left or right column
	if( leftColumn.indexOf( id ) != -1 ){
		var leftColumnExtras = [ 6, -1, -8];
		for (var i = 0; i < leftColumnExtras.length; i++) {
			if( id + leftColumnExtras[ i ] >= 0){
				surroundingCircles.splice( surroundingCircles.indexOf( id + leftColumnExtras[ i ] ), 1 );
			}
		};
	}
	if( rightColumn.indexOf( id ) != -1 ){
		var rightColumnExtras = [ 8, 1, -6 ];
		for (var i = 0; i < rightColumnExtras.length; i++) {
			if( id + rightColumnExtras[ i ] < 42){
				surroundingCircles.splice( surroundingCircles.indexOf( id + rightColumnExtras[ i ] ), 1 );
			}
		};
	}
	//checks for circles that are not the same color
	for(var i = 0; i < surroundingCircles.length; i++) {
		if( circles[ surroundingCircles[ i ] ].className != circles[ id ].className ){
			surroundingCircles.splice(i, 1);
			i--;
		}
	};

	return surroundingCircles;
}

var checkWin = function( currentId ){
	currentColor = circles[currentId].className;
	var interval;
	var winCount = 1;
	var checkWinArray = [8,6,1,7];
		//check right diagonal
		for(var i = 0; i < checkWinArray.length; i++){
			interval = 0;
			while( currentId - interval >= 0){
				if(currentColor != circles[currentId - interval].className){
					break;
				}
				if(	findSurroundingCircles( currentId - interval ).indexOf( currentId - interval - checkWinArray[i]) != -1){
					winCount ++;
				}
				if(checkWinArray[i] == 1 && leftColumn.indexOf(currentId - interval) > -1){
					break;
				}
				interval += checkWinArray[i];
			}
			interval = 0;
			while( currentId + interval < 42 ){
				if(currentColor != circles[currentId + interval].className){
					break;
				}
				if(	findSurroundingCircles( currentId + interval ).indexOf( currentId + interval + checkWinArray[i]) != -1){
					winCount ++;
				}
				if(checkWinArray[i] == 1 && rightColumn.indexOf(currentId + interval) > -1){
					break;
				}
				interval += checkWinArray[i];
			}
			if( winCount >= 4){
				alert('win');
				return true;
			}
		winCount = 1;
		}
	};












