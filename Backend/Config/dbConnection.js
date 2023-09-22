const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        mongoose.connect(
            "mongodb+srv://ronit:ronit123@cluster0.6y4xb6g.mongodb.net/?retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
        );
    } catch (err) {
        console.log(err)
    }
};

module.exports = dbConnection;