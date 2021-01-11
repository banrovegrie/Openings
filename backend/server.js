// Requirements
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

// To get data fro dotfiles
require('dotenv').config();


// Initializing the app
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


// Connecting to Database and check if connected
const uri = process.env.ATLAS_URI;
const options = { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true 
};
mongoose
    .connect(uri, options)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully")
});


// Check if connection works from port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`)
});