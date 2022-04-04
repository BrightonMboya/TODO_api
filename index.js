const express = require('express');
const mongoose = require('mongoose');




const taskRoute = require('./routes/TaskRoutes')

// use the dotenv file
require('dotenv').config()

const app = express()

// using the json body parser
app.use(express.json())



app.get('/', (req, res) => {
    res.send('Welcome to your TODO tasks of today')
})

app.use('/tasks', taskRoute)



// connect to a db
mongoose.connect(process.env.db_connection, () => console.log('Connected to a database'))

// start listening to a port
const PORT =  process.env.PORT || 3000;
app.listen(PORT, () => console.log(`started listening at ${PORT}`));