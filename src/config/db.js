require("dotenv").config();
const mongoose = require("mongoose");
const { WS_PORT } = process.env;
const http = require("http");
const { initializeWebSocket, emitEvent } = require("./websocket");

const { MONGODB_URI } = process.env;

const connectToDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("DB Connected");

        setUpChangeStream(mongoose);
    } catch (error) {
        console.log(error);
    }
};

async function setUpChangeStream(mongoose) {
    try {
        // Get the 'reports' collection model
        const Report = mongoose.model("Report");

        // Set up the change stream
        const changeStream = Report.watch();

        // Start listening for changes
        changeStream.on("change", (change) => {
            // Handle the change event here
            console.log("Change event:", change);
            emitEvent(change);
        });
    } catch (error) {
        console.error("Error setting up change stream:", error);
    }
}

function startServerListener() {
    try {
        const server = http.createServer();

        initializeWebSocket(server);

        const port = WS_PORT;

        server.listen(port, () => {
            console.log("Server backend running on port " + port);
        });
    } catch (error) {
        console.log("An exception occurred:", error);
    }
}

module.exports = { startServerListener, connectToDB };
