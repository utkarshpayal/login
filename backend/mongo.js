const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/login')
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });

const Schema = mongoose.Schema; // Correct method to create a new schema

const newSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const collection = mongoose.model('collection', newSchema);

module.exports = collection; // Exporting the model, not the collection variable
