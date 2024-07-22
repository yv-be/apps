const express = require('express');     //module for web framework
const path = require('path');           //module for file & directory paths

const app = express();                  //instance of express app with methods for routing HTTP requests etc.
const PORT = process.env.PORT || 3000;  //set port num 


app.use(express.static(path.join(__dirname, 'public'))); //to use files like css in the public directory 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html_main.html')); //server sends html_main file as response to GET request 
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); //starts the server and makes it listen to the port 
});

