
// JavaScript Document

var stonePerLine = 16;
var flagEmpty = 0;
var flagBlack = 1;
var flagWhite = 2;
var data = new Array();

function initData(){
	//console.log("initData()");
	for(var i=0;i<stonePerLine;i++){
		var line = new Array();
		for(var j=0;j<stonePerLine;j++){
			line.push(flagEmpty);
		}
		data.push(line);		
	}
}

function showData(){
	//console.log("showData()");	
	for(var i=0;i<stonePerLine;i++){
		console.log(data[i]);	
	}
}


function checkLine(line){
	//console.log("checkLine() "+line);	
	var before = flagEmpty;
	var count = 0;
	for(var index=0;index<line.length;index++){
		var current = line[index];
		if(current==flagEmpty){
			count = 0;				
		}else{
			if(current==before){
				count++;
				if(count==4){
					console.log("checkLine() found Gomoku at index "+(index-4)+"-"+index);
					return before;
				}
			}else{
				count = 0;
			}				
		}
		before=current;		
	}
	return flagEmpty;
}

function checkRow(){
	//横
	//console.log("checkRow()");
	var winner = flagEmpty;	
	for(var row=0;row<stonePerLine;row++){
		winner = checkLine(data[row]);
		if(winner!=flagEmpty){
			console.log("checkRow() found Gomoku at row "+row);	
			return winner;			
		}
	}
	return flagEmpty;
}

function checkCol(){
	//竖
	//console.log("checkCol()");
	var winner = flagEmpty;	
	for(var col=0;col<stonePerLine;col++){
		var line = new Array();
		for(var row=0;row<stonePerLine;row++){
			line.push(data[row][col]);
		}
		winner = checkLine(line);
		if(winner!=flagEmpty){
			console.log("checkCol() found Gomoku at col "+col);	
			return winner;			
		}		
	}
	return flagEmpty;
}

function checkRightSlashLower(index){
	//0,0->...->15,15
	//1,0->...->15,14
	//...
	//11,0->12,1->13,2->14,4->15,1	
	var row = index;
	var col = 0;
	var line = new Array();
	for(;row<stonePerLine&&col<stonePerLine;){
		line.push(data[row][col]);
		row++;
		col++;
	}
	return checkLine(line);			
}
function checkRightSlashUpper(index){
	//0,0->...->15,15
	//0,1->...->14,15
	//...
	//0,11->1,12->2,13->3,14->4,15
	var row = 0;
	var col = index;
	var line = new Array();
	for(;row<stonePerLine&&col<stonePerLine;){
		line.push(data[row][col]);
		row++;
		col++;
	}
	return checkLine(line);			
}
function checkRightSlash(){
	//右下
	//console.log("checkRightSlash()");
	var row,col;
	var winner = flagEmpty;	
	for(var index =0;index<stonePerLine;index++){
		winner = checkRightSlashUpper(index);
		if(winner==flagEmpty){
			winner = checkRightSlashLower(index);		
			if(winner==flagEmpty){
				//continue	
			}else{
				console.log("checkRightSlash() find Gomoku at right slash -"+index);				
				return winner;
			}
		}else{
			console.log("checkRightSlash() find Gomoku at right slash +"+index);
			return winner;
		}		
	}
}

function checkLeftSlashLower(index){
	//0,15->...->15,0
	//1,15->...->15,1
	//...
	//11,15->12,14->13,13->14,12->15,11	
	var row = index;
	var col = stonePerLine -1;
	var line = new Array();
	for(;row<base&&col>=index;){
		line.push(data[row][col]);
		row++;
		col--;
	}
	return checkLine(line);			
}
function checkLeftSlashUpper(index){
	//0,15->...->15,0
	//0,14->...->14,0
	//...
	//0,5->1,4->2,3->3,2->4,1->5,0
	var row = 0;
	var col = stonePerLine-1-index;
	var line = new Array();
	for(;row<stonePerLine&&col>=0;){
		line.push(data[row][col]);
		row++;
		col--;
	}
	return checkLine(line);			
}
function checkLeftSlash(){
	//左下
	//console.log("checkLeftSlash()");
	var row,col;
	var winner = flagEmpty;	
	for(var index =0;index<base;index++){
		winner = checkLeftSlashUpper(index);		
		if(winner==flagEmpty){
			winner = checkLeftSlashLower(index);		
			if(winner==flagEmpty){
				//continue	
			}else{
				console.log("checkLeftSlash() find Gomoku at left slash -"+index);				
				return winner;
			}
		}else{
			console.log("checkLeftSlash() find Gomoku at left slash +"+index);
			return winner;
		}		
	}
}

function checkWinner(){
	//console.log("checkWinner()");	
	/*	
	checkRow();
	checkCol();
	checkRightSlash();
	checkLeftSlash();
	*/	
	var winner = checkRow();	
	if(winner==flagEmpty){
		winner = checkCol();
		if(winner==flagEmpty){
			winner = checkRightSlash();
			if(winner==flagEmpty){
				winner = checkLeftSlash();
				if(winner==flagEmpty){
					console.log("checkWinner() not found any winnner");	
					return flagEmpty;
				}else{
					return winner;
				}				
			}else{
				return winner;
			}
		}else{
			return winner;
		}
	}else{
		return winner;
	}
}

function Box(l,r,t,b){
	this.left = l;
	this.right = r;
	this.top = t;
	this.bottom = b;
}

function Size(w,h){
	this.width = w;	
	this.height = h;
}

function Point(px,py){
	this.x = px;
	this.y = py;
}

function IMG(){
	this.filePath = "";
	this.origin = new Size(0,0);
	this.scale = new Size(0,0);
	this.margin = new Box(0,0,0,0);
	this.padding = new Box(0,0,0,0);
}

//chess board
function ChessBoard(){
	this.backImage = new IMG();
	this.whiteStoneImage = new IMG();
	this.blackStoneImage = new IMG();
	this.canvasID = "";
	this.stoneGap = 64;
	this.init = function(){
		//console.log("ChessBoard/init()");	
		this.canvasID = "MyCanvas";	
		this.backImage.filePath = "../source/back.png";		
		this.backImage.scale = new Size(1024,1024);
		this.backImage.margin = new Box(10,10,10,10);
		this.whiteStoneImage.filePath = "../source/whiteStone.png";
		this.whiteStoneImage.scale = new Size(64,64);
		this.blackStoneImage.filePath = "../source/blackStone.png";
		this.blackStoneImage.scale = new Size(64,64);		
	};
	this.loadChessBoard = function(){
		//console.log("ChessBoard/loadChessBoard()");
		canvasDrawImage(this);
	};
	this.positionTransfer2Board = function(clickPos){
		//console.log("positionTransfer2Board()");
		//console.log(clickPos);
		var x = parseInt((clickPos.x-this.backImage.margin.left)/this.stoneGap);
		var y = parseInt((clickPos.y-this.backImage.margin.top)/this.stoneGap);
		var value = new Point(x,y);
		//console.log(value);
		return value;
	};
	this.positionTransfer2Click = function(boardPos){
		//console.log("positionTransfer2Click()");
		//console.log(boardPos);
		var x = boardPos.x*this.stoneGap+this.whiteStoneImage.scale.width/2;
		var y = boardPos.y*this.stoneGap+this.whiteStoneImage.scale.width/2;		
		var value = new Point(x,y);
		//console.log(value);
		return value;
	};
}

function canvasDrawImage(chessBoard){
	//console.log("canvasDrawImage()");
	//console.log("canvasID:"+chessBoard.canvasID);
	//console.log(IMGObj);	
	var canvas = document.getElementById(chessBoard.canvasID);
	if(canvas===null){
		alert("canvasDrawImage() canvas is null");
		console.log("canvasDrawImage() canvas is null");
		return -1;
	}else{
		canvas.width = chessBoard.backImage.scale.width+chessBoard.backImage.margin.left+chessBoard.backImage.margin.right;
		canvas.height = chessBoard.backImage.scale.height+chessBoard.backImage.margin.top+chessBoard.backImage.margin.bottom;		
		var context = canvas.getContext("2d");
		if(context===null){
			alert("canvasDrawImage() context is null");
			console.log("canvasDrawImage() context is null");	
			return -1;
		}else{
			var board = new Image();
			var stoneWhite = new Image();
			var stoneBlack = new Image();
    		//先指定一个回调函数，图片加载好之后自然会回来执行
    		board.onload = function () {
				//console.log("canvasDrawImage() image onload callback");
				//console.log(image);
        		context.drawImage(
					board,
					chessBoard.backImage.margin.left,chessBoard.backImage.margin.top,
					chessBoard.backImage.scale.width,chessBoard.backImage.scale.height);
				for(var row=0;row<stonePerLine;row++){
					for(var col=0;col<stonePerLine;col++){
						if(data[row][col]==flagEmpty){
							//pass
						}else{
							var stonePos = chessBoard.positionTransfer2Click(new Point(row,col));
							if(data[row][col]==flagWhite){
								context.drawImage(
									stoneWhite,
									chessBoard.backImage.margin.top+stonePos.y-chessBoard.whiteStoneImage.scale.width/2,									
									chessBoard.backImage.margin.left+stonePos.x-chessBoard.whiteStoneImage.scale.width/2,
									chessBoard.whiteStoneImage.scale.width,chessBoard.whiteStoneImage.scale.height);								
							}else if(data[row][col]==flagBlack){
								context.drawImage(
									stoneBlack,
									chessBoard.backImage.margin.top+stonePos.y-chessBoard.blackStoneImage.scale.width/2,									
									chessBoard.backImage.margin.left+stonePos.x-chessBoard.blackStoneImage.scale.width/2,
									chessBoard.blackStoneImage.scale.width,chessBoard.blackStoneImage.scale.height);								
							}else{
								//pass
							}
						}
					}
				}
    		};
    		//加载图片，完成后执行刚才的函数
    		board.src = chessBoard.backImage.filePath;	
			stoneWhite.src = chessBoard.whiteStoneImage.filePath;
			stoneBlack.src = chessBoard.blackStoneImage.filePath;
			return 0;
		}
	}	
}

var last = flagWhite;

function play(chessBoard,event){
	//console.log("event.offsetX:"+event.offsetX);
	//console.log("backImage.offset.x:"+backImage.offset.x);
	//console.log("backImage.margin.left:"+backImage.margin.left);	
	var positionClick = new Point(event.offsetX,event.offsetY);
	//console.log(positionClick);
	var positionChessBoard = chessBoard.positionTransfer2Board(positionClick);
	//console.log(positionChessBoard);
	
	if(last==flagWhite){
		console.log("Play() player:black position:"+positionChessBoard.x+","+positionChessBoard.y);
		data[positionChessBoard.y][positionChessBoard.x]=flagBlack;
		last = flagBlack;
	}else{
		console.log("Play() player:white position:"+positionChessBoard.x+","+positionChessBoard.y);
		data[positionChessBoard.y][positionChessBoard.x]=flagWhite;		
		last = flagWhite;	
	}
	canvasDrawImage(chessBoard);
	//showData();
	var winner = checkWinner();
	if(winner==flagWhite){
		alert("Winner is Player White");
		initData();
	}else if(winner==flagBlack){
		alert("Winner is Player Black");		
		initData();
	}else{
		//pass
	}
}

window.onload = function(){
	//console.log("window/onload");
	
	var chessBoard = new ChessBoard();
	chessBoard.init();
	chessBoard.loadChessBoard();
	initData();
	//showData();
	document.getElementById("MyCanvas").onclick = function(e){play(chessBoard,e)};
};