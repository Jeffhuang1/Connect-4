//creates an array of circles
var circles = [];
for(var i = 0; i < 42; i ++ ){
	var element = document.getElementById(String(i));
	circles.push( element );
	}
var buttonElement = document.getElementById("reverse");
var AIButton = document.getElementById("ai");
var moveHistory = [];
var count = 0;
var aiCount;
var aiColor;
var AIOn = false;
var j = 0;
var gameOver = false;
var changeClass = function( name, history ) {
	if(gameOver)
		return;
	j = 0;
	while( circles[j] != name ){
		j++;
	}
	if( count % 2 == 0 ){
		if(circles[j].className == 'circlered' || circles[j].className =='circleyellow'){
			while(j < 42){
				if(circles[j].className == 'circle')
					break;
				j = j + 7;
			}
		}
		if(j > 41)
			return;
		if(circles[j].className == 'circle'){
			while( j > 6){
				if(circles[j - 7].className != 'circle')
					break;
				j-=7;
			}
		}
		if( j < 0 )
			return;
		circles[j].className = 'circlered';
		moveHistory.push(j);
		checkWin( j, 'circlered', true, circles );
		count++;
		}
	else{
		if(circles[j].className == 'circlered' || circles[j].className =='circleyellow'){
			while(j < 42){
				if(circles[j].className == 'circle')
					break;
				j = j + 7;
			}
		}
		if(j > 41)
			return;
		if(circles[j].className == 'circle'){
			while( j > 6){
				if(circles[j - 7].className != 'circle')
					break;
				j-=7;
			}
		}
		if( j < 0 )
			return;
		circles[j].className = 'circleyellow';
		moveHistory.push(j);
		checkWin( j, 'circleyellow', true, circles );
		count++;
	}
};
var takeBack = function( button ) {
	if(moveHistory.length == 0){
		return;
	}
	if(AIOn){
		circles[moveHistory.pop()].className = 'circle';
		circles[moveHistory.pop()].className = 'circle';
		count-=2;
		aiCount-=2;
	}
	else{
		circles[moveHistory.pop()].className = 'circle';
		count--;
	}

};
//onclick event to reverse a move
buttonElement.addEventListener("click",function(){takeBack(buttonElement)});
//onclick event to play vs AI
AIButton.addEventListener("click",function(){runAI()});
//onclick event to restart game
restart.addEventListener("click",function(){restartGame()});
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
var findSurroundingCircles = function( currentId, currentColor ){
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
		if( circles[ surroundingCircles[ i ] ].className != currentColor ){
			surroundingCircles.splice(i, 1);
			i--;
		}
	};
	return surroundingCircles;
}


var checkWin = function( currentId, currentColor, notify, currentConfiguration ){
	var four_point_array = [];
	var three_point_array = [];
	var two_point_array = [];
	var one_point_array = [];
	var interval;
	var winCount = 1;
	var checkWinArray = [8,6,1,7];
		//check right diagonal
		for(var i = 0; i < checkWinArray.length; i++){
			interval = 0;
			while( currentId - interval >= 0){
				if(currentColor != currentConfiguration[currentId - interval].className && interval !=0){
					break;
				}
				if((checkWinArray[i] == 1 || checkWinArray[i] == 6) && leftColumn.indexOf(currentId - interval) > -1){
					break;
				}
				if(checkWinArray[i] == 8 && rightColumn.indexOf(currentId - interval) > -1){
					break;
				}
				if(	findSurroundingCircles( currentId - interval, currentColor ).indexOf( currentId - interval - checkWinArray[i]) != -1){
					winCount ++;
				}
				interval += checkWinArray[i];
			}
			interval = 0;
			while( currentId + interval < 42 ){
				if(currentColor != currentConfiguration[currentId + interval].className && interval !=0){
					break;
				}
				if((checkWinArray[i] == 1 || checkWinArray[i] == 6) && rightColumn.indexOf(currentId + interval) > -1){
					break;
				}
				if(checkWinArray[i] == 8 && leftColumn.indexOf(currentId + interval) > -1){
					break;
				}
				if(	findSurroundingCircles( currentId + interval, currentColor ).indexOf( currentId + interval + checkWinArray[i]) != -1){
					winCount ++;
				}
				interval += checkWinArray[i];
			}
			if( winCount >= 4 && notify == true){
				if(currentColor == 'circlered'){
					currentColor = 'Red';
				}
				if(currentColor == 'circleyellow'){
					currentColor = 'Yellow';
				}
				gameOver = true;
				alert(currentColor + ' Wins!');

				return true;
			}
			if(winCount >= 4){
				four_point_array.push(currentId);
			}
			if(winCount == 3){
				three_point_array.push(currentId);
			}
			if(winCount == 2){
				two_point_array.push(currentId);
			}
			if(winCount == 1){
				one_point_array.push(currentId);
			}
		winCount = 1;
		}
		var pointObject = {currentid: currentId, four_point_array: four_point_array, three_point_array: three_point_array, two_point_array:two_point_array, one_point_array:one_point_array};
		return pointObject;
	};
var findPossibleMoves = function(currentConfiguration){
	var possibleMoves = [];
	for(var i = 0; i < 7; i++){
		for(var j = i - 7 ; j < 42; j+=7){
			if(currentConfiguration[j + 7] == null)
				break;
			else if(currentConfiguration[j + 7].className == 'circle'){
				possibleMoves.push(j+7);
				break;
			}
		}
	}
	return possibleMoves;
};

var findBestMove = function(currentConfiguration, currentColor){
	var possibleMoves = findPossibleMoves(circles);
	var results = [];
	for( var i=0; i<possibleMoves.length; i++){
		results[i] = checkWin(possibleMoves[i], currentColor, false, currentConfiguration);
	}
	//array of best moves, first index is number of points
	return filterMoves(results);
};
var filterMoves = function(results){
	var bestMoves = [[],[],[],[],[]];
	//index 0 is four points, 1 is three points, 2 is two points, and 3 is one point
	for(var i = 0; i<results.length; i++){
		//find highest point value
		if(results[i].four_point_array.length > 0){
			bestMoves[1].push(results[i].currentid);
		}
		if(results[i].three_point_array.length > 0 && results[i].four_point_array.length == 0){
			bestMoves[2].push(results[i].currentid);
		}
		if(results[i].two_point_array.length > 0 && results[i].three_point_array.length == 0 && results[i].four_point_array.length == 0){
			bestMoves[3].push(results[i].currentid);
		}
		if(results[i].one_point_array.length > 0 && results[i].three_point_array.length == 0 && results[i].two_point_array.length == 0 && results[i].four_point_array.length == 0){
			bestMoves[4].push(results[i].currentid);
		}
	}
	//add highest point array to the beginning
	if(bestMoves[1].length > 0)
		bestMoves[0][0] = 4;
	else if(bestMoves[2].length > 0)
		bestMoves[0][0] = 3;
	else if(bestMoves[3].length > 0)
		bestMoves[0][0] = 2;
	else if(bestMoves[4].length > 0)
		bestMoves[0][0] = 1;
	return bestMoves;
}
var runAI = function(){
	if(!AIOn){
		if(count %2 == 0)
			aiColor = 'circleyellow';
		else
			aiColor = 'circlered';
		aiCount = count;
		document.addEventListener("click",function(){copyAndComputeAI()});
	}

	AIOn = true;
}
var copyAndComputeAI = function(){
	if(gameOver){
		return;
	}
	var currentColor;
	var otherColor;
	if(count % 2 == 0){
		currentColor = 'circleyellow';
		otherColor = 'circlered';
	}
	else{
		currentColor = 'circlered';
		otherColor = 'circleyellow';
	}
	if(count == 0){
		bestMove = Math.floor(Math.random() * (4 - 2 + 1)) + 2;
		circles[bestMove].className = otherColor;
		moveHistory.push(bestMove);
		aiCount+=2;
		count++;
		return;
	}
	if(aiCount == count){
		//new copy of circles
		var circlesCopy = [];
		for(var i = 0; i < circles.length; i++){
			circlesCopy[i] = {className: circles[i].className};
		}
		bestMove = computeAI(circlesCopy, currentColor);
		circles[bestMove].className = otherColor;
		checkWin( bestMove, otherColor, true, circles );
		moveHistory.push(bestMove);
		aiCount+= 2;
		count++;
	}
}
var computeAI = function(currentConfiguration, currentColor){
	var otherColor;
	var bestMove = [[]];
	if(currentColor == 'circlered')
		otherColor = 'circleyellow';
	else
		otherColor = 'circlered';
	var possibleMoves = findPossibleMoves(currentConfiguration);
	var possibleMovesWithPoints = [];
	for(var i = 0; i < possibleMoves.length; i++){
		possibleMovesWithPoints.push(checkMoveValue(currentConfiguration, possibleMoves[i], currentColor));
		possibleMovesWithPoints.push(checkMoveValue(currentConfiguration, possibleMoves[i], otherColor));
	}
	//remove moves that result in instant loss
	for(var i = 0; i < possibleMovesWithPoints.length; i++){
		if(possibleMovesWithPoints[i][1] < -500){
			var badIndex = possibleMovesWithPoints[i][0];
			for(var j = 0; j < possibleMovesWithPoints.length; j++){
				if(possibleMovesWithPoints[j][0] == badIndex && possibleMovesWithPoints.length > 1){
					possibleMovesWithPoints.splice(j, 1);
					j--;
				}
			}
		}
	}
	//find highest value in array
	var highest_value = -100000;
	var high_value_array = [];
	for(var i = 0; i < possibleMovesWithPoints.length; i++){
		if(possibleMovesWithPoints[i][1] > highest_value){
			highest_value = possibleMovesWithPoints[i][1];
		}
	}
	for(var i = 0; i < possibleMovesWithPoints.length; i++){
		if(possibleMovesWithPoints[i][1] == highest_value){
			high_value_array.push(possibleMovesWithPoints[i]);
		}
	}
	console.log(high_value_array);
	bestMove = high_value_array[Math.floor(Math.random()*high_value_array.length)][0];
	return bestMove;
}
var checkMoveValue = function(currentConfiguration, currentId, currentColor ){
	var otherColor;
	if(currentColor == 'circlered')
		otherColor = 'circleyellow';
	else
		otherColor = 'circlered';
	var currentColorPoints = [];
	currentColorPoints[0] = currentId;
	currentColorPoints[1] = 0;
	var checkWinObject2;
	var checkWinObject = checkWin(currentId, currentColor, false, currentConfiguration);
	if(currentId + 7 < 42)
		checkWinObject2 = checkWin(currentId+7, otherColor, false, currentConfiguration);
	if(currentColor == aiColor && checkWinObject2 == null){
		currentColorPoints[1] = checkWinObject.four_point_array.length*1500 + checkWinObject.three_point_array.length*3 + checkWinObject.two_point_array.length*2;
	}
	else if(currentColor == aiColor){
		currentColorPoints[1] = checkWinObject.four_point_array.length*1500 + checkWinObject.three_point_array.length*3 + checkWinObject.two_point_array.length*2 - checkWinObject2.four_point_array.length*1000 - checkWinObject2.three_point_array.length*3 - checkWinObject2.two_point_array.length*2;

	}
	else if(checkWinObject2 == null){
		currentColorPoints[1] = checkWinObject.four_point_array.length*2000 + checkWinObject.three_point_array.length*3 + checkWinObject.two_point_array.length*2;
	}
	else{
		currentColorPoints[1] = checkWinObject.four_point_array.length*2000 + checkWinObject.three_point_array.length*3 + checkWinObject.two_point_array.length*2 - checkWinObject2.four_point_array.length*1000 - checkWinObject2.three_point_array.length*3 - checkWinObject2.two_point_array.length*2;
	}
	return currentColorPoints;
}
var restartGame = function(){
	for(var i = 0; i < circles.length; i++){
		circles[i].className = 'circle';
	}
	gameOver = false;
	count = 2;
	AIOn = false;
}



