require("dotenv").config();
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");
const app = require("../app");

const { MONGODB_URI } = process.env;

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: `https://backend-licenta.onrender.com`,
    },
});
const connectToDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("DB Connected");
    } catch (error) {
        console.log(error);
    }
};

module.exports = { connectToDB, server, io };
