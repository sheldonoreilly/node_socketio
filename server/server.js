const path = require("path");
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, "../public");

const app = express();

const server = http.createServer(app);
const io = socketIO(server);

io.on("connection", socket => {
	console.log("New User connected");
	socket.on("disconnect", () => {
		console.log("Client is disconnected");
	});
});

app.use(express.static(publicPath));
server.listen(port, () => {
	console.log(`The server is up at ${port}.`);
});
