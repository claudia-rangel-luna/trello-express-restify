var restify = require('restify');

var server = restify.createServer();

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

let swimlanes = [{
		"id": 1,
		"name": "swimlane 1",
		
	},
	{
		"id": 2,
		"name": "swimlane 2",
	},
	{
		"id": 3,
		"name": "swimlane 3",
	}
];

let cards = [{
		"id": 1,
		"name": "card 1",
		
	},
	{
		"id": 2,
		"name": "card 2",
	},
	{
		"id": 3,
		"name": "card 3",
	}
];

var Swimlane = function(id, name){
	this.id = id;
	this.name = name;
}

var Card = function(id, name){
	this.id = id;
	this.name = name;
}

function getSwimlanes(req, res, next) {
	// Restify currently has a bug which doesn't allow you to set default headers
	// These headers comply with CORS and allow us to serve our response to any origin
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");

	//find the appropriate data
	res.send(swimlanes);
}

function getCards(req, res, next) {
	// Restify currently has a bug which doesn't allow you to set default headers
	// These headers comply with CORS and allow us to serve our response to any origin
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");

	//find the appropriate data
	res.send(cards);
}

function postSwimlane(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	
	console.log(req.body);

	var swimlane = new Swimlane(req.body.id, req.body.name);

	swimlanes.push(swimlane);

	// save the new message to the collection

	res.send(swimlane);
}

function postCard(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	
	console.log(req.body);

	var card = new Card(req.body.id, req.body.name);

	cards.push(card);

	// save the new message to the collection

	res.send(card);
}
// Set up our routes and start the server
server.get('/swimlanes', getSwimlanes);
server.post('/swimlanes', postSwimlane);

server.get('/cards', getCards);
server.post('/cards', postCard);

server.listen(8080, function() {
	console.log('%s listening at %s', server.name, server.url);
});