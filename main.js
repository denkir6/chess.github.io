const buttn = document.createElement("BUTTON");
const textNode = document.createTextNode("Start");
const buttn2 = document.createElement("BUTTON");
const textNode2 = document.createTextNode("Save");
const sep = document.createElement("br");

var selectedEl = null;
var selectedPiece = null;
var brd = null;
var highlitedCells = [];

buttn.appendChild(textNode);
//buttn.addEventListener("click", addListeners(brd));
buttn2.appendChild(textNode2);
//buttn2.addEventListener("click", fillLabel2);


this.document.body.appendChild(buttn);
this.document.body.appendChild(buttn2);
/*this.document.body.appendChild(sep);
this.document.body.appendChild(canvas);*/


//createNeuralNetwork();
var network;
var firstStep = true;

brd = createNewBoard();
drawBoard(brd);



/*function fillLabel(){
	
	var val = textBox.value;
	var valArray = Array.from(val);
	console.log(val);
	console.log (valArray);
	
	network = nTranslatorNetworkRUEN();
	ruAlphabetValues(network, valArray);
	
	
	if (network == null)
	{
		network = nTranslatorNetworkRUEN();
		network.updateValues(val);
		network.buildRandomNetwork();
	}
	if (network != null)
	{
		network.updateInputValues(val);
	}
	
	network.process();

	var txt = network.getResult()[0];
	
	lbl.innerText = txt;
	var neur2 = network.hiddenLayers[0].neurons[0];
	var w = neur2.connections[0].weight;
	
}

function fillLabel2()
{
	var valArray = [];
	var val = Number(textBox2.value)/100;
	valArray.push(val);
	
	for (var i = 0; i < 100; i++)
	{
		backPropagation(valArray, network, 0.1)
		network.process();
	}
	
	var txt = network.getResult()[0];
	lbl2.innerText = txt;
	
	
	//console.log(network);
	//C:\Users\denki\Downloads\AL-Preview-0004.jpg
}*/