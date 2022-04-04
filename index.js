const express = require('express');
const mongoose = require('mongoose');
const swaggerUi =  require('swagger-ui-express');
const morgan =  require('morgan');
const swaggerDocument = require('./swagger.json');

const taskRoute = require('./routes/TaskRoutes')

// use the dotenv file
require('dotenv').config()

const app = express()

// using the json body parser
app.use(express.json())

// morgan HTTP logger
app.use(morgan('tiny'))

app.get('/', (req, res) => {
    res.send('Welcome to your TODO tasks of today')
})

app.use('/tasks', taskRoute)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// connect to a db
mongoose.connect(process.env.db_connection, () => console.log('Connected to a database'))

// start listening to a port
const PORT =  process.env.PORT || 3000;
app.listen(PORT, () => console.log(`started listening at ${PORT}`));