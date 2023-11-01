const mongoose = require('mongoose');
function DbConnect() {
    const DB_URL = process.env.DB_URL;
    mongoose
    .connect(DB_URL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then((x) => {
        console.log("Connected to the DATABASE!!!");
    })
    .catch((err) => {
        console.log("Failed to connect with DB!!");
    });
}

module.exports = DbConnect;