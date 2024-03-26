function drawBoard(brd)
{
	var div = brd.htmlElement;
	brd.buildSet();
	document.body.appendChild(div);
}

function getCellByID(id)
{
	var cl;
	var id = id;
	var colNum = Math.trunc(id/8);
	var cellNum = id - colNum*8;
	cl = brd.columns[colNum].cells[cellNum];
	return cl;
}

function movePiece(piece, cl)
{
	var id = cl.id;
	if (piece.availableMoves.some(cel => cel.id === id))
	{
		var el = piece.htmlElement;
		var oldCl = piece.cell;
		oldCl.removeHtmlElement(el);
		brd.updatePiecePosition(piece, cl);
	}
}

function highliteAvailableMoves(piece)
{
	for (var i = 0; i < piece.availableMoves.length; i++)
	{
		var cl = piece.availableMoves[i];
		cl.htmlElement.style.backgroundColor = "blue";
		highlitedCells.push(cl);
	}
}

function resetStyle()
{
	for (var i = 0; i < highlitedCells.length; i++)
	{
		var cl = highlitedCells[i];
		var el = cl.htmlElement;
		var style = window.getComputedStyle(el, null)
		el.style = style;
	}
}


function onClick(e)
{
	if (selectedEl != null)
	{
		resetStyle();
	}
	var el = e.srcElement;
	if (el.className == "blackCell" || el.className == "whiteCell")
		selectedEl = el;
	else
		selectedEl = el.parentElement;
	
	var id = selectedEl.getAttribute("id");
	var cl = getCellByID(id);
	if (selectedEl.firstChild)
	{
		selectedEl.style.backgroundColor = "#FFFF00";
		selectedPiece = cl.piece;
		highlitedCells.push(selectedPiece.cell);
		highliteAvailableMoves(selectedPiece);
	}
	else
	{
		movePiece(selectedPiece, cl);
		//selectedPiece = null;
	}
}