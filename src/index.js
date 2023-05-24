const app = require("./app");
const { startServerListener, connectToDB } = require("./config/db");
const { PORT } = process.env;

const startApp = () => {
    const port = PORT || 8080;
    app.listen(port, () => {
        console.log("Auth backend running on port " + port);
    });
    connectToDB()
        .then(startServerListener())
        .catch((error) => console.log(error));
};

startApp();
