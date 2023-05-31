const { server, connectToDB, io } = require("./config/db");
const { PORT } = process.env;
const mongoose = require("mongoose");

const startApp = () => {
	const port = PORT || 8080;
	server.listen(port, () => {
		console.log("Auth backend running on port " + port);
	});
	connectToDB().catch((error) => console.log(error));

	io.on("connection", (socket) => {
		console.log("Socket connected:", socket.id);

		socket.on("disconnect", () => {
			console.log("Socket disconnected:", socket.id);
		});
	});

	try {
		const Report = mongoose.model("Report");
		const changeStream = Report.watch();

		changeStream.on("change", (change) => {
			console.log("Change event:", change);

			if (change.operationType === "insert") {
				io.emit("insertReport", change);
			}
		});
	} catch (error) {
		console.error("Error setting up change stream:", error);
	}

	try {
		const Comment = mongoose.model("Comment");
		const changeStream = Comment.watch();

		changeStream.on("change", (change) => {
			console.log("Change event:", change);

			if (change.operationType === "insert") {
				io.emit("insertComment", change);
			}
		});
	} catch (error) {
		console.error("Error setting up change stream:", error);
	}
};

startApp();
