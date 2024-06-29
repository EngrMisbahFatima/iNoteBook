const mongoose = require("mongoose");
const URI = "mongodb://localhost:27017/inotebook"

const connectToMongoDB = async () => {
    await mongoose.connect(URI);
} 

module.exports = connectToMongoDB;