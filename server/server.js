const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

//socket represents an individual client
io.on("connection", socket => {
	console.log("New user connected");

	//recieves a message from 'a' client
	socket.on("createMessage", message => {
		console.log("createMessage", message);

		//io emits a message to 'all' clients
		io.emit("newMessage", {
			from: message.from,
			text: message.text,
			//we'll assign createAt at server level
			//this prevents user 'spoofing' of time sent
			createdAt: new Date().getTime()
		});
	});

	socket.on("disconnect", () => {
		console.log("User was disconnected");
	});
});

server.listen(port, () => {
	console.log(`Server is up on ${port}`);
});
