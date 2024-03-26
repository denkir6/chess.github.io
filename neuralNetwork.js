class neuron
{
	constructor()
	{
		this.inputVal = 0;
		this.outputVal = 0;
		this.connections = [];
		this.connectionsNum = 0;
		this.bias = 0;
		this.delta = 0;
	}
	
	createNConnection(nRightNeuron)
	{
		var conn = new nConnection(this, nRightNeuron);
		this.connections.push(conn);
		this.connectionsNum++;
		return conn;
	}
	
	setBias(val)
	{
		this.bias = val;
	}
	
	setRandBiasZO()
	{
		this.bias = Math.random();
	}
	
	setRandBiasNPO()
	{
		this.bias = Math.random()*2 -1;
	}
}

class nLayer
{
	constructor()
	{
		this.neurons = [];
		this.neuronsNum = 0;
	}
	
	addNeuron(neur)
	{
		this.neurons.push(neur);
		this.neuronsNum++;
	}
}

class nConnection
{
	constructor(neuron, rightNeuron)
	{
		this.neuron = 
		this.rightNeuron = rightNeuron;
		this.weight;
	}
	
	setWeight(val)
	{
		this.weight = val;
	}
	
	setRandWeightZO()
	{
		this.weight = Math.random();
	}
	
	setRandWeightNPO()
	{
		this.weight = Math.random()*2 -1;
	}
}

class nNetwork
{
	constructor()
	{
		this.inputLayer = new nLayer();
		this.hiddenLayers = [];
		this.outputLayer = new nLayer();
		this.allLayers = [];
	}
	
	refresh()
	{
		var emptyArray = [];
		var allLayers = emptyArray.concat(this.hiddenLayers);
		allLayers.unshift(this.inputLayer);
		allLayers.push(this.outputLayer);
		this.allLayers = allLayers;
	}
		
	//build Connections and add them to array
	buildConnections()
	{
		for (var i = 0; i < this.allLayers.length - 1; i++)
		{
			var l = this.allLayers[i];
			var lN = this.allLayers[i+1];
			for (var j = 0; j < l.neuronsNum; j++)
			{
				var neur = l.neurons[j];
				for (var k = 0; k < lN.neuronsNum; k++)
					{
						var rightNeur = lN.neurons[k];
						var conn = neur.createNConnection(rightNeur);
					}
			}
		}
	}
	
	setRandomWeights()
	{
		for (var i = 0; i < this.allConnections.length; i++)
		{
			var conn = this.allConnections[i];
			conn.setRandWeightZO();
		}
	}
	
	setRandomBiass()
	{
		var neurs = this.getAllNeurons();
		for (var i = 0; i < neurs.length; i++)
		{
			neurs[i].setRandBiasZO();
		}
	}
	
	getAllNeurons()
	{
		var neurs = [];
		for (var i = 0; i < this.allLayers.length; i++)
		{
			for (var j = 0; j < this.allLayers[i].neuronsNum; j++)
			{
				var neur = this.allLayers[i].neurons[j];
				neurs.push(neur);
			}
		}
		
		return neurs;
	}
	
	sendValues(values)
	{
		for (var i = 0; i < values.length; i++)
		{
			var neur = this.inputLayer.neurons[i];
			neur.inputVal = Number(values[i]);
		}
	}
	
	updateInputValues(values)
	{
		for (var i = 0; i < values.length; i++)
		{
			var neur = this.inputLayer.neurons[i];
			neur.inputVal = Number(values[i]);
		}
	}
	
	//Build Network with random vals
	buildRandomNetwork()
	{
		this.buildConnections();
		this.setRandomWeights();
		this.setRandomBiass();		
	}
	
	
	process()
	{
		for (var i = 0; i < this.allLayers.length; i++)
		{
			var l = this.allLayers[i];
			if (l == this.inputLayer)
				processLayer(l, "‎Convert8BitToDec");
			if (l == this.outputLayer)
				processLayer(l, "ConvertDecTo8Bit");
		}
	}
	
	getResult()
	{
		var result = [];
		for (var i = 0; i < this.outputLayer.neuronsNum; i++)
		{
			result.push(this.outputLayer.neurons[i].outputVal);
		}
		return result;
	}
}



//functions
function buildNNetwork(layersNum)
{
	var network = new nNetwork();
	
	for (var i = 0; i < layersNum; i++)
	{
		var l = new nLayer();
		network.hiddenLayers.push(l);
	}
	
	network.refresh();
	
	
	return network;
}

function createLayer(neuronsN)
{
	var nL = new nLayer();
	for (var i = 0; i < neuronsN; i++)
	{
		var neur = new neuron();
		nL.addNeuron(neur);
	}
	return nL;
}

function processNeuron(neur, f)
{
	var result = 0;
	var inputVal = neur.inputVal;
	var outputVal = 0;
	switch (f){
		case "sigmoidFunction":
			outputVal = sigmoidFunction(inputVal);
			break;
		case "‎ConvertDecTo8Bit":
			outputVal = ConvertDecTo8Bit(inputVal);
			break;
		case "‎‎Convert8BitToDec":
			outputVal = Convert8BitToDec(inputVal);
			break;
	}
			
	neur.outputVal = outputVal;
	
	passOutputVal(neur);
	neur.inputVal = 0;
	//console.log(outputVal);
}

function processLayer(l, f)
{
	for (var i = 0; i < l.neuronsNum; i++)
	{
		var neur = l.neurons[i];
		processNeuron(neur, f);
	}
}

function passOutputVal(neur)
{
	if (neur.connectionsNum != 0)
	{
		for (var i = 0; i < neur.connectionsNum; i++)
		{
			var conn = neur.connections[i];
			var rightNeur = conn.rightNeuron;
			rightNeur.inputVal += neur.outputVal*conn.weight;
		}
		
	}
}
