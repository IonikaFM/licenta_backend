const { Server } = require("socket.io");

let io;

const initializeWebSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: `https://backend-licenta.onrender.com:${process.env.WS_PORT}`,
        },
    });

    io.on("connection", (socket) => {
        console.log("Socket connected:", socket.id);

        socket.on("disconnect", () => {
            console.log("Socket disconnected:", socket.id);
        });
    });
};

const emitEvent = (eventData) => {
    if (io) {
        io.emit("event", eventData);
    }
};

module.exports = {
    initializeWebSocket,
    emitEvent,
};
