const mongoose = require('mongoose')

// 連線到mongodb

const connectToMongoDB = async () => {
    const db_user = process.env.DB_USER
    const db_password = process.env.DB_PASSWORD
    try {
        mongoose.connect('mongodb+srv://' + db_user + ":" + db_password + '@cluster0.q6vft.mongodb.net/productDB?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        })

        console.log("Connected to MongoDB...");
    } catch (err) {
        console.error(err.message);
        // Terminate the application
        process.exit(1);
    }
}

module.exports = connectToMongoDB;