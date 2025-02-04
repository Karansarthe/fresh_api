const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const app = express();

//using morgan for parsing the files
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//importing the routes
const authRoutes = require('./routers/auth.routes');

//calling the routes
app.use('/auth', authRoutes); 

//handling the simple request
app.get('/', async (req,res,next)=>{
    res.status(200).json({
        message: 'Homepage called'
    });
});

//handling the errors
app.use((req,res,next)=>{
    const error = new Error('NOT FOUND');
    error.status = 404;
    console.log(error);
    next(error);
});
app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message,
            status: error.status || "Internal server error"
        }
    });
});

console.log("Namaste Dunia");

module.exports = app;