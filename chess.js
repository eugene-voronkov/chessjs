var PIECE = {
	PAWN : "pawn",
	ROOK : "rook",
	KNIGHT : "knight",
	BISHOP : "bishop",
	QUEEN : "queen",
	KING : "king"
}


var COLOR = {
	WHITE : "white",
	BLACK : "black"
}


var CHESSFONT = {
	blackpawn	: "&#9823;",
	blackrook	: "&#9820;",
	blackbishop : "&#9821;",
	blackknight : "&#9822;",
	blackqueen	: "&#9819;",
	blackking	: "&#9818;",

	whitepawn	: "&#9817;",
	whiterook	: "&#9814;",
	whitebishop : "&#9815;",
	whiteknight : "&#9816;",
	whitequeen	: "&#9813;",
	whiteking	: "&#9812;"
}		


var ChessPiece = function(name, color, cell) {
	this.name = name;
	this.color = color;
	this.xPos = cell[0];
	this.yPos = cell[1];
	this.genMoves = "";
};	


function nextChar(x) {
	return String.fromCharCode(x.charCodeAt(0) + 1);
}


function prevChar(x) {
	return String.fromCharCode(x.charCodeAt(0) - 1);
}


function Board(color) {
	this.color = color;
	this.board = new Object();
	this.livePieces = [ new Array(), new Array() ];

	var i = 0;
	for(i=1; i <= 8; ++i) {
		this.board[i] = new Object();
	}	
}





Board.prototype.newGame = function(position) {
	var alphanum = "A";
	for(i=0; i<8; ++i) {
		this.board[2][alphanum] = new ChessPiece(PIECE.PAWN, COLOR.WHITE, alphanum+"2")
		this.board[7][alphanum] = new ChessPiece(PIECE.PAWN, COLOR.BLACK, alphanum+"7")

		alphanum = nextChar(alphanum);
	}

	this.board[1]["A"] = new ChessPiece(PIECE.ROOK, COLOR.WHITE, "A1");
	this.board[1]["H"] = new ChessPiece(PIECE.ROOK, COLOR.WHITE, "H1");
	this.board[8]["A"] = new ChessPiece(PIECE.ROOK, COLOR.BLACK, "A8");
	this.board[8]["H"] = new ChessPiece(PIECE.ROOK, COLOR.BLACK, "H8");

	this.board[1]["B"] = new ChessPiece(PIECE.KNIGHT, COLOR.WHITE, "B1");
	this.board[1]["G"] = new ChessPiece(PIECE.KNIGHT, COLOR.WHITE, "G1");
	this.board[8]["B"] = new ChessPiece(PIECE.KNIGHT, COLOR.BLACK, "B8");
	this.board[8]["G"] = new ChessPiece(PIECE.KNIGHT, COLOR.BLACK, "G8");

	this.board[1]["C"] = new ChessPiece(PIECE.BISHOP, COLOR.WHITE, "C1");
	this.board[1]["F"] = new ChessPiece(PIECE.BISHOP, COLOR.WHITE, "F1");
	this.board[8]["C"] = new ChessPiece(PIECE.BISHOP, COLOR.BLACK, "C8");
	this.board[8]["F"] = new ChessPiece(PIECE.BISHOP, COLOR.BLACK, "F8");

	this.board[1]["D"] = new ChessPiece(PIECE.QUEEN, COLOR.WHITE, "D1");
	this.board[8]["D"] = new ChessPiece(PIECE.QUEEN, COLOR.BLACK, "D8");

	this.board[1]["E"] = new ChessPiece(PIECE.KING, COLOR.WHITE, "E1");
	this.board[8]["E"] = new ChessPiece(PIECE.KING, COLOR.BLACK, "E8");

	return this.board;
}	


Board.prototype.getPiece = function(position) {
	return this.board[position[1]][position[0]];
}	


Board.prototype.isFoe = function(piece) {
	if( typeof piece == "undefined" ) {
		return false;	
	}
	return this.color != piece.color;
}


Board.prototype.isFriend = function(piece) {
	if( typeof piece == "undefined" ) {
		return false;	
	}
	return this.color == piece.color;
}


var withinBounds = function(position) {
	var x = position.charCodeAt(0);
	var y = position.slice(1, position.length);

	if( x >= 65 && x <= 72 ) {
		if( y >= 1 && y <= 8 )  {
			return true;
		}
	}
	return false;
}


Board.prototype.genMove = function(from, x, y) {
	var newX = String.fromCharCode(from.charCodeAt(0)+x);
	var newY = parseInt(from.slice(1, from.length)) + y;

	return newX + newY;
}


Board.prototype.moveKnightA = function(from, color) {
	var newMoves = new Array();

	newMoves.push( Board.prototype.genMove(from, 1, 2) );
	newMoves.push( Board.prototype.genMove(from, 1, -2) );
	newMoves.push( Board.prototype.genMove(from, -1, 2) );
	newMoves.push( Board.prototype.genMove(from, -1, -2) );
	newMoves.push( Board.prototype.genMove(from, 2, 1) );
	newMoves.push( Board.prototype.genMove(from, 2, -1) );
	newMoves.push( Board.prototype.genMove(from, -2, 1) );
	newMoves.push( Board.prototype.genMove(from, -2, -1) );

	var moves = new Array();
	var i;
	for(i=0; i< newMoves.length; ++i) {
		if( withinBounds(newMoves[i]) && !this.isFriend(this.getPiece(newMoves[i]))) {
			moves.push( newMoves[i] );
		}
	}

	return moves;
}	


Board.prototype.moveKingA = function(from, color) {
	var newMoves = new Array();

	newMoves.push( Board.prototype.genMove(from, 1, 1) );
	newMoves.push( Board.prototype.genMove(from, 1, -1) );
	newMoves.push( Board.prototype.genMove(from, -1, 1) );
	newMoves.push( Board.prototype.genMove(from, -1, -1) );
	newMoves.push( Board.prototype.genMove(from, 1, 0) );
	newMoves.push( Board.prototype.genMove(from, -1, 0) );
	newMoves.push( Board.prototype.genMove(from, 0, 1) );
	newMoves.push( Board.prototype.genMove(from, 0, -1) );

	var moves = new Array();
	var i;
	for(i=0; i< newMoves.length; ++i) {
		if( withinBounds(newMoves[i]) && !this.isFriend(this.getPiece(newMoves[i]))) {
			moves.push( newMoves[i] );
		}
	}

	return moves;
}	


Board.prototype.movePawnA = function(from, color) {
	var newMoves = new Array();
	var direction;
	var piece = this.getPiece(from);
	var diagPos;
	var moveTemp;
	var yPos = from.slice(1, from.length);
	var xPos = from[0];

	if(this.color == "white") {
		direction = 1;
	} else if(color == "black") {
		direction = -1;
	}

	moveTemp = this.genMove(from, 0, direction*1);


if( withinBounds(moveTemp) ) {
	if( !this.isFoe(this.getPiece(moveTemp)) && !this.isFriend(this.getPiece(moveTemp)) ) {

		//if( withinBounds(moveTemp) ) {
			newMoves.push( moveTemp );
		//}	

		moveTemp = Board.prototype.genMove(from, 0, direction*2);
		if( withinBounds(moveTemp) ){
			if( !this.isFoe(this.getPiece(moveTemp)) && !this.isFriend(this.getPiece(moveTemp)) ) {
				if( yPos == 2 && this.color == "white" ||
					yPos == 7 && this.color=="black" ) {
					newMoves.push( moveTemp );
			}
		}
	}

}
}



diagPos = nextChar(xPos) + (parseInt(yPos)+direction*1);
if( withinBounds(moveTemp) ) {
	if( this.isFoe(this.getPiece(diagPos)) ) {
		newMoves.push( Board.prototype.genMove(from, 1, direction*1) );
	}
}


diagPos = prevChar(xPos) + (parseInt(yPos)+direction*1);
if( withinBounds(moveTemp) ) {
	if( this.isFoe(this.getPiece(diagPos)) ) {
		newMoves.push( Board.prototype.genMove(from, -1, direction*1) );
	}
}

return newMoves;
}


Board.prototype.genMove2 = function(from, xIncr, yIncr) {
	var newMoves = new Array();

	var x = parseInt(xIncr);
	var y = parseInt(yIncr);
	var moveTemp = this.genMove(from, x, y);
	while( withinBounds(moveTemp) ) {
		if( this.isFriend(this.getPiece(moveTemp)) ) {
			return newMoves;
		}
		newMoves.push( moveTemp );

		x += xIncr;
		y += yIncr;
		if( this.isFoe(this.getPiece(moveTemp)) ) {
			return newMoves;
		}
		moveTemp = this.genMove(from, x, y);
	}   

	return newMoves;
}


Board.prototype.moveBishopA = function(from, color) {
	var moves = this.genMove2(from, 1, 1);
	moves = moves.concat( this.genMove2(from, 1, -1) );
	moves = moves.concat( this.genMove2(from, -1, 1) );
	moves = moves.concat( this.genMove2(from, -1, -1) );

	return moves;
}


Board.prototype.moveRookA = function(from, color) {
	var moves = this.genMove2(from, 1, 0);
	moves = moves.concat( this.genMove2(from, -1, 0) );
	moves = moves.concat( this.genMove2(from, 0, 1) );
	moves = moves.concat( this.genMove2(from, 0, -1) );

	return moves;
}


Board.prototype.moveQueenA = function(from, color) {
	var moves = this.genMove2(from, 1, 0);
	moves = moves.concat( this.genMove2(from, -1, 0) );
	moves = moves.concat( this.genMove2(from, 0, 1) );
	moves = moves.concat( this.genMove2(from, 0, -1) );

	moves = moves.concat( this.genMove2(from, 1, 1) );
	moves = moves.concat( this.genMove2(from, 1, -1) );
	moves = moves.concat( this.genMove2(from, -1, 1) );
	moves = moves.concat( this.genMove2(from, -1, -1) );

	return moves;
}



Board.prototype.getPieces = function(color) {
	var alphanum;
	var i, j;
	var kingList = new Array();
	var pieceList = new Array();
	for(k=1; k<=8; ++k) {
		alphanum = "A";
		for(i=0; i<8; ++i) {
			if( typeof this.board[k][alphanum] != "undefined" ) {
				if( this.board[k][alphanum].color == color )
					if( this.board[k][alphanum].name == "king" ) {
						kingList.push( this.board[k][alphanum] );
					}
					else {
						pieceList.push( this.board[k][alphanum] );
					}
				}
				alphanum = nextChar(alphanum);
			}
		}
		return kingList.concat( pieceList );		
	}


	Board.prototype.getKing = function(color) {
		var pieceList = this.getPieces(color);
		while( pieceList.length != 0 ) {
			var piece = pieceList.pop();
			if( piece.name == "king" )
				return piece;
		}
	}


	Board.prototype.genMoves= function(from) {
		var piece = this.getPiece(from);

		switch (piece.name) {
			case "king":
			return this.moveKingA(from, piece.color);
			break;
			case "queen":
			return this.moveQueenA(from, piece.color);
			break;
			case "rook":
			return this.moveRookA(from, piece.color);
			break;
			case "knight":
			return this.moveKnightA(from, piece.color);
			break;
			case "bishop":
			return this.moveBishopA(from, piece.color);
			break;
			case "pawn":
			return this.movePawnA(from, piece.color);
			break;
		}				
	}



	Board.prototype.genMoveList = function(color) {
		var pieceList = this.getPieces(color);
		var moveList = [];
		while( pieceList.length != 0 ) {
			var piece = pieceList.pop()
			var from = piece.xPos + piece.yPos;
			moveList = moveList.concat( this.genMoves(from) );
		}
		return moveList;

	}


	Board.prototype.isInCheck = function(color) {
	//alert( "run isInCheck" );
	var opponent;
	var king;
	var pieces;

	if(color == "white") {
		opponent = "black";
	} else {
		opponent = "white";
	}

	king = this.getPieces(color)[0];
	var kingPos = king.xPos + king.yPos;

	var tempColor = this.color;
	this.color = opponent;
	var moveList = this.genMoveList(opponent);
	this.color = tempColor;

	while( moveList.length != 0 ) {
		var move = moveList.pop();
		if( move == kingPos ) {
			return true;
		}
	}

	return false;
}

Board.prototype.isMate = function(color) {
	var opponent;
	var king;
	var pieces;
	var inCheck = true;

	var pieces = this.getPieces(color);
	while(pieces.length !=0) {
		var piece = pieces.pop();
		var position = piece.xPos + piece.yPos;
		var tempColor = this.color;
		this.color = color;
		var moveList = this.genMoves(position);
		this.color = tempColor;
		//console.log("position: " +position);
		while( moveList.length != 0 ) {
			var move = moveList.pop();
			var pieceTemp = this.getPiece( move );
			//console.log("move: " +move);
			var oldY = position[1];
			var oldX = position[0];
			var newY = move[1];
			var newX = move[0];
			piece.xPos = newX;
			piece.yPos = newY;
			this.board[move[1]][move[0]] = piece;
			this.board[position[1]][position[0]] = undefined
			if( this.isInCheck(color) == false ) {
				inCheck = false;
				//console.log("not mate");
			}

			this.board[move[1]][move[0]] = pieceTemp;
			piece.xPos = oldX;
			piece.yPos = oldY;
			this.board[position[1]][position[0]] = piece;
			if( inCheck == false )
				return false;
		}
	}

	return true;

}

Board.prototype.move = function(from, to) {
	var piece = this.getPiece(from);
	if( piece.color != this.color )
		return false;

	var moveList = this.genMoves(from)
	var validMove = false;
	while( moveList.length != 0 ) {
		var move = moveList.pop();
		if( move == to ) {
			validMove = true;
		}
	}
	if(validMove == false) {
		return false;
	}

	var toBackup = this.getPiece(to);
	var oldX = String.fromCharCode(from.charCodeAt(0));
	var oldY = parseInt(from.slice(1, from.length));
	var newX = String.fromCharCode(to.charCodeAt(0));
	var newY = parseInt(to.slice(1, to.length));

	//print( newX + newY );
	this.board[newY][newX] = this.getPiece(from);
	this.board[oldY][oldX] = undefined;
	piece.xPos = newX;
	piece.yPos = newY;

	if( this.isInCheck(this.color) ) {
		this.board[oldY][oldX] = this.board[newY][newX];
		this.board[newY][newX] = toBackup;
		piece.xPos = oldX;
		piece.yPos = oldY;

		return false;
	}

	if( piece.name == "pawn" ) {
		if( piece.color == "white" && newY == 8 || 
			piece.color == "black" && newY == 1 ) {
			piece.name = "queen";
	}
}

return true;
}


Board.prototype.validMove = function(from, to) {

	var piece = this.getPiece(from);
	if( piece.color != this.color )
		return false;


	var moveList = this.genMoves(from)
	var validMove = false;
	while( moveList.length != 0 ) {
		var move = moveList.pop();
		if( move == to ) {
			validMove = true;
		}
	}
	if(validMove == false) {
		return false;
	}

/*
	if( piece.name == "king" ) {
		alert( "is king" );
		
		if( this.isInCheck(piece.color) ) {
			alert( "is check" );
			var pieceTemp = this.getPiece(to);
			board[from[1]][from[0]] = piece;
			board[to[1]][to[0]] = pieceTemp;
			return false;
		}
		
	}
	*/	
	return true;
}


Board.prototype.populateBoard = function(pieceList) {
	var i=0;
	//alert(i);

	for(i=0; i<pieceList.length; ++i) {
		var piece = pieceList[i];
		this.board[piece.yPos][piece.xPos] = piece;
	}

}


var printMoves = function(list) {
	var i=0;
	for(i=0; i<list.length; ++i) {
		print(list[i] + " ");
	}
}


