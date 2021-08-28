// server.js
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use('/public', express.static("public"));


//set up session
const oneDay = 1000*60*60*24;
app.use(session({
    secret: "thisisthesecret",
    saveUninitialized: true,
    cookie: {maxAge: oneDay},
    resave: false,
}));

const flow = require('./routes/user_flow');
app.use('/', flow);

app.listen(PORT, () => {
  console.log('Server connected at:', PORT);
});