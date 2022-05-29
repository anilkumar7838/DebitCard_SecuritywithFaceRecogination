const App = require('./app');
const dotenv = require('dotenv');
const connectionDatabase = require("./config/database");

// ---Handling Uncaught Exception---
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to uncaught Exception");
    process.exit(1);
});

try {
    dotenv.config({
        path: "config/config.env"
    });
} catch {
    console.log("Error: Unable to load .env file");
}
//config

// Connecting to database
connectionDatabase();

const server = App.listen(process.env.PORT, () => {
    console.log(`server is working on http://localhost:${process.env.PORT}`);
})

// Unhandled Promise Rejection
process.on("unhandledRejection", err => {
    console.log(`"Error": ${err.message}`)
    console.log("Shutting down the server due to unhandled Promise Rejection");
    server.close(() => {
        process.exit(1);
    });
});