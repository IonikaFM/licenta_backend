const app = require('./app');
const {PORT} = process.env;

const startApp = () => {
    const port = PORT || 8080;
    app.listen(port, () => {
        console.log('Auth backend running on port ' + port);
    })
}

startApp();