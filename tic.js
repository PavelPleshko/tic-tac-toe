'Use Strict';
var game;
var display;
var play;
var AI;

function Game(){
	this.inProcess = false;
	this.winArray=[
	[1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [7, 5, 3]];
    this.playerOneScore=0;
    this.playerTwoScore=0;
    var that = this;
    this.reset = $('.reset').on('click',that.reset);
}

Game.prototype.init = function(){
	this.filled = 0;
	this.currentBoard={
      1: '',
      2: '',
      3: '',
      4: '',
      5: '',
      6: '',
      7: '',
      8: '',
      9: ''
    };
}

Game.prototype.initializeGame=function(){
	this.init();
	display.drawBoard();
	var that = this;
	$('.game-choice button').off().on('click',function(){
		game.secondPlayer = play.isSinglePlayer(this);
		display.hideGameChoice();
		display.showGameStarter(game.secondPlayer);
		$('.game-starter .choose-x, .game-starter .choose-o')
  		.off().click(play.startFirstGame);
  		 $('.back-button').on('click', function() {
       display.hideGameStarter();
         display.showGameChoice();
      });
  	})

  
}

Game.prototype.reset = function(){
	display.showGameChoice();
	display.resetSections();
	game.initializeGame();

}






function Display(){};

Display.prototype.drawBoard = function(){
	var canvas = document.getElementById('canvas');
	canvas.style.display='none';

		
		var ctx = canvas.getContext('2d');
		ctx.lineWidth = 3;
		ctx.strokeStyle='white';
		ctx.beginPath();
		ctx.moveTo(100,0);
		ctx.lineTo(100,150);
		ctx.closePath();
		ctx.stroke();
		 ctx.beginPath();
    ctx.moveTo(200, 0);
    ctx.lineTo(200, 150);
    ctx.closePath();
    ctx.stroke();

    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(0, 40);
    ctx.lineTo(340, 40);
    ctx.closePath();
    ctx.stroke();
      
    ctx.beginPath();
    ctx.moveTo(0, 80);
    ctx.lineTo(340, 80);
    ctx.closePath();
    ctx.stroke(); 

    canvas.style.display='block';
}

Display.prototype.showGameChoice = function(){
	$('.game-choice').fadeIn(400);
}

Display.prototype.hideGameChoice = function(){
	$('.game-choice').fadeOut(400);
}

Display.prototype.showGameStarter = function(multi){
		var msg;
	switch(multi){
		case true:
			msg = 'Player 1: X or O?';
			break;
		default:
			msg = 'X or O?';
	}
	setTimeout(function(){
		$('.game-starter').fadeIn(400).children('p').text(msg);
	},800);
}

Display.prototype.hideGameStarter = function(){
	$('.game-starter').fadeOut(400);
}

Display.prototype.showScore=function(){
	if(game.secondPlayer){
	$('.score-1').children('.name').text('player 1');
	$('.score-2').children('.name').text('player 2');
}else{
	$('.score-1').children('.name').text('player 1');
	$('.score-2').children('.name').text('computer');
}
$('.score-1, .score-2').children('.points').text('0');
$('.info').animate({opacity:1},300);
$('.score-2, .score-1, .points-divider').fadeIn(200);

}

Display.prototype.resetSections = function(){
	$('.boxes').html('');
for(var i = 1;i<=9;i++){
	var section = '<li class="'+i+'"><i class="letter"><span></span></i></li>';
	$(section).appendTo($('.boxes'));
}
};

Display.prototype.hintPlayerOne=function(){
	if(game.secondPlayer){
		$('.player-one-turn p').text('Go ahead first player!')
	}else{
		$('.player-one-turn p').text('Now you!');
	}
	$('.player-one-turn').animate({'left':'75px'},600);
};

Display.prototype.hidePlayerOneHint=function(){
	$('.player-one-turn').animate({'left':'-170px'},600);
};

Display.prototype.hintPlayerTwo=function(){
	if(game.secondPlayer){
		$('.player-two-turn p').text('Go ahead second player!')
	}else{
		$('.player-two-turn p').text('computer goes');
	}
	$('.player-two-turn').animate({'right':'75px'},600);
};
Display.prototype.hidePlayerTwoHint=function(){
	$('.player-two-turn').animate({'right':'-170px'},600);
};

 Display.prototype.showDrawMsg = function() {
    setTimeout(function() {
    $('.draw-msg').fadeIn(500);
  }, 1500);
};

  Display.prototype.hideDrawMsg = function() {
  $('.draw-msg').fadeOut(1000);
};

  Display.prototype.showLoseMsg = function() {
      setTimeout(function() {
    $('.lose-msg').fadeIn(500);
}, 1500);
},

  Display.prototype.hideLoseMsg = function() {
  $('.lose-msg').fadeOut(1000);
};

  Display.prototype.showWinMsg = function() {
    
      setTimeout(function() {
    $('.win-msg').fadeIn(500).children('p').text("Player " + game.turn + " wins!! :D ")
}, 1500);
};

  Display.prototype.hideWinMsg = function() {
  $('.win-msg').fadeOut(1000);
};


function Play(){};

Play.prototype.whoIsFirst = function(){
		var rand = Math.floor(Math.random()*2+1);
		return rand;
}

Play.prototype.isSinglePlayer = function(e){
	if(e && $(e).text() === 'One Player'){
		return false;
	}else{
		return true;
	}
};

Play.prototype.startFirstGame = function(){
	game.firstPlayerSymbol = $(this).text();
	game.secondPlayerSymbol = game.firstPlayerSymbol == 'X' ? 'O' : 'X';
	game.turn = play.whoIsFirst();
	display.hideGameStarter();
	$('#canvas').animate({'opacity':'1'},1000);
    $('.reset').fadeIn(600);
    display.showScore();
    display.resetSections();
	play.playGame();
};

Play.prototype.playGame=function(){
game.inProcess = true;
		$('.boxes li').on('click',function(){
			play.playerTurn(this);
		});

			setTimeout(function(){
				console.log(game.turn);
				if(game.turn === 1){
					console.log('1hint');
					display.hintPlayerOne();
				}else{
					console.log('2hint');
					display.hintPlayerTwo();
				}
			},500);
			setTimeout(function(){
				if(game.turn == 2 && !game.secondPlayer){
					play.computerGoes();
				}
			},1000);
};

 Play.prototype.playerTurn = function(square) {
 	console.log(game);
    var symbol = game.turn === 1 ? game.firstPlayerSymbol : game.secondPlayerSymbol;
    var box = $(square).children('i').children('span');
    if (box.text() === '' && game.inProcess && (game.turn === 1 || (game.turn === 2 && game.secondPlayer))) {
      box.text(symbol);
      var number = $(square).attr('class');
      play.updateSector(number, symbol);
      play.endTurn(symbol);
    }
  };

	Play.prototype.updateSector = function(num,symbol){
		game.currentBoard[num] = symbol;
		console.log(game.currentBoard)	
	};


	Play.prototype.endTurn = function(symbol){
		game.filled = game.filled + 1;
		if(game.inProcess){
			if(play.checkWin(symbol)[0]){
				
				play.updateScore(game.turn);
				if(game.secondPlayer){
					display.showWinMsg();		
			}else{
				game.turn === 1 ? display.showWinMsg() :
				display.showLoseMsg();
			}
			game.inProcess = false;
			play.showWinningCombo();
			display.hidePlayerOneHint();
			display.hidePlayerTwoHint();
			play.reset();
		}else if(game.filled >= 9){
			game.inProcess = false;
			display.hidePlayerTwoHint();
			display.hidePlayerOneHint();
			display.showDrawMsg();
			game.turn = play.whoIsFirst();
			play.reset();
		}else{
			if(game.turn === 1){
				display.hidePlayerOneHint();
				display.hintPlayerTwo();
				game.turn =2;
				if(!game.secondPlayer){
					play.computerGoes();
				}
			}else if(game.turn === 2){
				display.hintPlayerOne();
				display.hidePlayerTwoHint();
				game.turn= 1;
			}
		}
	}
 	};

	Play.prototype.checkWin = function(symbol){
		var currBoard = game.currentBoard;
		var wins = game.winArray;
		var winningCombination=[];
		var winner = wins.some(function(combo){
			var winning = true;
			for(var i=0;i<combo.length;i++){
				if(currBoard[combo[i]] !== symbol){
					winning = false;
				}
			}
			if(winning){
				winningCombination = combo;
			}
			return winning;
		})
		return [winner,winningCombination];
	};

	Play.prototype.showWinningCombo = function(){
		var symbol = game.turn === 1 ? game.firstPlayerSymbol :
		 game.secondPlayerSymbol;
		 var combo = play.checkWin(symbol)[1];
		 for(var i=0;i<combo.length;i++){
		 	var currSector = '.' + combo[i];
		 	$(currSector).children('i').addClass('win')
		 	.addClass('rotate');
		 }
	}

	Play.prototype.updateScore = function(turn){
		switch(turn){
			case 1:
				game.playerOneScore++;
				break;
			case 2:
				game.playerTwoScore++;
				break;
		}
		$('.score-1').children('.points').text(game.playerOneScore);
		$('.score-2').children('.points').text(game.playerTwoScore);
	}

	Play.prototype.reset = function(){
		game.init();
	setTimeout(function(){
			display.hideDrawMsg();
			display.hideLoseMsg();
			display.hideWinMsg();
			$('.boxes li').fadeOut();
		},5000);
		setTimeout(function(){
			display.resetSections();
			$('.boxes li').fadeIn();
			game.filled = 0;
		},6000);
		setTimeout(function(){
			game.inProcess = true;
			play.playGame();
		},6000)
	
};

Play.prototype.computerGoes = function(){
var computer = AI;
		var sectorNum;
		if(computer.computerTakeMove && game.turn == 2){
			sectorNum = computer.computerTakeMove();
			var symbol = game.secondPlayerSymbol;
			console.log(symbol);
			var currentSector = $('.'+sectorNum).children('i');
			
				setTimeout(function(){
					currentSector.children('span').text(symbol);
					play.updateSector(sectorNum,game.secondPlayerSymbol);
					play.endTurn(symbol);
				},800);
		}
}


function AI(){}

AI.prototype.computerTakeMove = function(){
		var move = this.winBlockChoice('win')[0];
		if (!move) {
      move = this.winBlockChoice('block')[0]; //didnt receive any move...move on!
    }
		if(!move){
			move = this.doubleThreatChoice('win');
			
		}
		if(!move){
			move=this.doubleThreatChoice('block');
			
		}
		if(!move){
			move = this.firstPlay();
			
		}
		if(!move){
			move = this.playCenter();
		}
		 if (!move) {
      move = this.emptyCorner();
    }
    if (!move) {
      move = this.emptySide();
    }
		
		 if(move){
		 	if(game.currentBoard[move]=== ''){
		 		return move;
		 	}
		 	
		 } else{
		 	return false;
		 }
	 	};

	AI.prototype.playCenter = function() {
    if (game.currentBoard[6] === '') {
      return 6;
    }
  };

  AI.prototype.emptyCorner = function() {
  var board = game.currentBoard;
  var corners = [1, 3, 7, 9];
  var move;
  for (var i = 0; i < corners.length; i++) {
    if (board[corners[i]] === '') {
      move = corners[i];
    }
  }
  return move || false;
};

  AI.prototype.emptySide = function() {
  var sides = [2, 4, 6, 8];
  for (var i = 0; i < sides.length; i++) {
    if (game.currentBoard[sides[i]] === '') {
      return sides[i];
    }
  }
  return false;
};

AI.prototype.winBlockChoice = function(type,board){
		var board = board || game.currentBoard;
		switch(type){
			case 'win': //here we need to stick to winning combos if available
			var currentSymbol = game.secondPlayerSymbol;
			var opponentSymbol = game.firstPlayerSymbol;
		    case 'block': //here we have to block player in case he is winning
			var currentSymbol = game.firstPlayerSymbol;
			var opponentSymbol = game.secondPlayerSymbol;
		}
		var moves = [];
		game.winArray.forEach(function(combination){
			var notFound = [];
			var noPlay = true;
			for(var i=0;i<combination.length;i++){
				if(board[combination[i]] !== currentSymbol){
					if(board[combination[i]] === opponentSymbol){
						noPlay = false;//if its occupied not by AI we dont use this combo anymore
					}else{
					notFound.push(combination[i]); //neither of them,this box is empty,push it to array
				}
			}

		}	
		if(notFound.length === 1 && noPlay){ //in case when box is not occupied by opponent and number of free moves is 1  
			var move = notFound[0]; //we use this move;otherwise we just move on
			moves.push(move);
		}
	});
		return moves;
	};


	AI.prototype.doubleThreatChoice = function(type){
		var board = game.currentBoard;
		var move;
		switch(type){
			case 'win':
			var currentSymbol = game.secondPlayerSymbol;
			var opponentSymbol = game.firstPlayerSymbol;
		    case'block':
			var currentSymbol = game.firstPlayerSymbol;
			var opponentSymbol = game.secondPlayerSymbol;
		}
		if(board[5] === currentSymbol && game.filled === 3){
			if((board[1] === opponentSymbol && board[9] === opponentSymbol) 
				|| (board[3] === opponentSymbol && board[7] === opponentSymbol)){
				move = this.emptySide();
			}
		}
		if(!move && board[5] == opponentSymbol && game.filled == 3){
			move = this.diagonalSecondAttack();
		}

		if(!move){
			var newBoard = $.extend({},board);
			for(var i=1;i<=9;i++){
				newBoard = $.extend({},board);
				if(newBoard[i] === ''){
					newBoard[i] = currentSymbol;
					if(this.winBlockChoice(type,newBoard).length>=2){
						move = i;
					}
				}
			}
		}
		return move || false;
	};

	AI.prototype.diagonalSecondAttack = function(){
		var board = game.currentBoard;
		var comp = game.secondPlayerSymbol;
		var corners = [1,3,7,9];
		for(var i=0;i<corners.length;i++){
			if(board[corners[i]] === comp){
				return 10 - corners[i];
			}
		}
	};

	AI.prototype.firstPlay = function(){
		var board = game.currentBoard;
		var corners = [1,3,7,9];
		var move;
		if(game.filled == 1){
			if(board[5] == game.firstPlayerSymbol){
				var cornerNumber = Math.floor(Math.random()*4 + 1);
				move = corners[cornerNumber];
			
		}else{
			for(var i = 0;i<corners.length;i++){
				if(game.currentBoard[corners[i]]===game.firstPlayerSymbol){
					move = 5;
				}
			}
		}
	}else if(game.filled === 0){
		var cornerNumber = Math.floor(Math.random()*corners.length+1);
		move = corners[cornerNumber];
	}
	return move ? move : false;
	}


$(document).on('ready',function(){
game = new Game();
display = new Display();
play = new Play();
AI = new AI();
game.initializeGame();
})

