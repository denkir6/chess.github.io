class cell
{
	constructor(white, num)
	{
		this.colorWhite = true;
		this.number = num;
		this.htmlElement;
		this.piece;
		this.id;
		this.column;
	}
	
	addHtmlElement(el)
	{
		this.htmlElement.appendChild(el);
	}
	
	removeHtmlElement(el)
	{
		el.remove();
	}
}

class column
{
	constructor(letter)
	{
		this.cells = [];
		this.letter = letter;
		this.htmlElement;
	}
}

class board
{
	constructor()
	{
		this.columns = [];
		this.htmlElement;
		this.piecesSet;
	}
	
	getColumn(letter)
	{
		for (var i =0; i < this.columns.length; i++)
		{
			var clmn = this.columns[i];
			if (clmn.letter == letter)
				return clmn;
		}
	}
	
	setPiecePosition(p)
	{
		var letter = p.position[0];
		var number = p.position[1];
		var clmn = this.getColumn(letter);
		var cl = clmn.cells[number];
		if (p instanceof pawn)
		{
			var nCl = clmn.cells[number+1];
			var nnCl = clmn.cells[number+2];
			p.availableMoves.push(nCl, nnCl);
		}
		
		
		cl.addHtmlElement(p.htmlElement);
		cl.piece = p;
		p.cell = cl;
	}
	
	updatePiecePosition(p, cl)
	{
		cl.piece = p;
		p.cell = cl;
		var clmn = p.cell.column;
		var id = cl.id;
		var colNum = Math.trunc(id/8);
		var cellNum = id - colNum*8;
		var nCl;
		if (p instanceof pawn)
		{
			nCl = clmn.cells[cellNum+1];
		}
		p.availableMoves = [];
		if (!nCl.piece)
			p.availableMoves.push(nCl);
		cl.addHtmlElement(p.htmlElement);
	}
	
	buildSet()
	{
		var pSet = new piecesSet();
		
		pSet.buildPawns(this, 1);
		pSet.buildPawns(this, 6);
		pSet.buildRooks(this, 0);
		pSet.buildRooks(this, 7);
		pSet.buildKnights(this, 0)
		pSet.buildKnights(this, 7);
		pSet.buildBishops(this, 0);
		pSet.buildBishops(this, 7);
		pSet.buildQueen(this, 0);
		pSet.buildQueen(this, 7);
		pSet.buildKing(this, 0);
		pSet.buildKing(this, 7);
		
		this.piecesSet = pSet;
	}
}

class piece
{
	constructor()
	{
		this.position = [];
		this.colorWhite;
		this.htmlElement;
		this.cell = null;
		this.availableMoves = [];
	}
}

class pawn extends piece
{
	constructor()
	{
		super();
		this.firstMove = true;
	}
}

class rook extends piece
{
	constructor()
	{
		super();
	}
}

class knight extends piece
{
	constructor()
	{
		super();
	}
}

class bishop extends piece
{
	constructor()
	{
		super();
	}
}

class queen extends piece
{
	constructor()
	{
		super();
	}
}

class king extends piece
{
	constructor()
	{
		super();
	}
}

class piecesSet
{
	constructor()
	{
		this.collection = [];
		this.board;
	}
	
	buildPawns(brd, num)
	{
		for (var i = 0; i < 8; i++)
		{
			var letter = brd.columns[i].letter;
			var pwn = createNewPawn(letter, num);
			brd.setPiecePosition(pwn);
			this.collection.push(pwn);
		}
	}
	
	buildRooks(brd, num)
	{
		var letter = 'A';
		var rk = createNewRook(letter, num);
		brd.setPiecePosition(rk);
		this.collection.push(rk);
		
		letter = 'H';
		var rk = createNewRook(letter, num);
		brd.setPiecePosition(rk);
		this.collection.push(rk);
	}
	
	buildKnights(brd, num)
	{
		var letter = 'B';
		var kn = createNewKnight(letter, num);
		brd.setPiecePosition(kn);
		this.collection.push(kn);
		
		letter = 'G';
		var kn = createNewKnight(letter, num);
		brd.setPiecePosition(kn);
		this.collection.push(kn);
	}
	
	buildBishops(brd, num)
	{
		var letter = 'C';
		var bsh = createNewBishop(letter, num);
		brd.setPiecePosition(bsh);
		this.collection.push(bsh);
		
		letter = 'F';
		var bsh = createNewBishop(letter, num);
		brd.setPiecePosition(bsh);
		this.collection.push(bsh);
	}
	
	buildQueen(brd, num)
	{
		var letter = 'D';
		var qn = createNewQueen(letter, num);
		brd.setPiecePosition(qn);
		this.collection.push(qn);
	}
	
	buildKing(brd, num)
	{
		var letter = 'E';
		var kng = createNewKing(letter, num);
		brd.setPiecePosition(kng);
		this.collection.push(kng);
	}
}

function createNewKing(letter, num)
{
	var kng = new king();
	kng.position.push(letter);
	kng.position.push(num);
	var el = document.createElement("div");
	el.setAttribute("class", "king");
	kng.htmlElement = el;
	return kng;
}

function createNewQueen(letter, num)
{
	var qn = new queen();
	qn.position.push(letter);
	qn.position.push(num);
	var el = document.createElement("div");
	el.setAttribute("class", "queen");
	qn.htmlElement = el;
	return qn;
}

function createNewBishop(letter, num)
{
	var bsh = new bishop()
	bsh.position.push(letter);
	bsh.position.push(num);
	var el = document.createElement("div");
	el.setAttribute("class", "bishop");
	bsh.htmlElement = el;
	return bsh;
}

function createNewKnight(letter, num)
{
	var kn = new knight()
	kn.position.push(letter);
	kn.position.push(num);
	var el = document.createElement("div");
	el.setAttribute("class", "knight");
	kn.htmlElement = el;
	return kn;
}

function createNewRook(letter, num)
{
	var rk = new rook()
	rk.position.push(letter);
	rk.position.push(num);
	var el = document.createElement("div");
	el.setAttribute("class", "rook");
	rk.htmlElement = el;
	return rk;
}

function createNewPawn(letter, num)
{
	var pwn = new pawn();
	pwn.position.push(letter);
	pwn.position.push(num);
	var el = document.createElement("div");
	el.setAttribute("class", "pawn");
	pwn.htmlElement = el;
	return pwn;
}

function createNewCell(white, num)
{
	var cl = new cell(white, num);
	var el = document.createElement("div");
	if (white)
		el.setAttribute("class", "whiteCell");
	if (!white)
		el.setAttribute("class", "blackCell");
	cl.htmlElement = el;
	el.onclick = onClick;
	return cl;
}

function createNewColumn(letter, num)
{
	var clmn = new column(letter);
	let white = true;
	if (letter == 'A' || letter == 'C' || letter == 'E' || letter == 'G')
		white = false;
	if (letter == 'B' || letter == 'D' || letter == 'F' || letter == 'H')
		white = true;
	for (var i = 0; i < 8; i++)
	{
		var cell = createNewCell(white, i);
		cell.id = num * 8 + i;
		cell.htmlElement.setAttribute("id", cell.id);
		cell.column = clmn;
		clmn.cells.push(cell);
		white = !white;
	}
	var el = document.createElement("div");
	el.setAttribute("class", "column");
	clmn.htmlElement = el;
	for (var i = 0; i < clmn.cells.length; i++)
	{
		var cl = clmn.cells[i];
		el.appendChild(cl.htmlElement);
	}
	return clmn;
}


function createNewBoard()
{
	var brd = new board()
	var column1 = createNewColumn('A', 0);
	var column2 = createNewColumn('B', 1);
	var column3 = createNewColumn('C', 2);
	var column4 = createNewColumn('D', 3);
	var column5 = createNewColumn('E', 4);
	var column6 = createNewColumn('F', 5);
	var column7 = createNewColumn('G', 6);
	var column8 = createNewColumn('H', 7);
	brd.columns = [column1, column2, column3, column4, column5, column6, column7, column8];
	var div = document.createElement("div");
	for (var i = 0; i < brd.columns.length; i++)
	{
		var clmn = brd.columns[i];
		div.appendChild(clmn.htmlElement);
	}
	div.setAttribute("class", "board");
	brd.htmlElement = div;
	return brd;
}