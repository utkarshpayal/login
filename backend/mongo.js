const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/login', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });

const Schema = mongoose.Schema;

const newSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    
});

const CollectionModel = mongoose.model('Collection', newSchema);

module.exports = CollectionModel;
