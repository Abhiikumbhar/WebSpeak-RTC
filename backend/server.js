require('dotenv').config();

const express = require('express');

const app = express();
const DbConnect = require("./database");
const router = require('./routes');
const cors = require("cors");
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const corsOption ={
    credentials : true,
    origin :['http://localhost:3000'],
}
app.use(cors(corsOption));
app.use('/storage', express.static('storage'));
const PORT = process.env.PORT || 5500; 

DbConnect();
app.use(express.json({ limit: '10mb' }));
app.use(router);

app.get('/', (req,res) =>{
    res.send('hello from server');
});

app.listen(PORT , () => console.log('LISTENING TO PORT '+ PORT));
