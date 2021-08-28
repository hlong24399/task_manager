const express = require('express');
const router = express.Router();
const session = require('express-session');
const cookieParser = require('cookie-parser');

router.use(cookieParser());

root_path = `C:/Users/hlong/Documents/test_eb/`;


//init
router.get('/', (red,res) => { 
    console.log("just a start");
    res.sendFile('views/login.html', {root: root_path});
})

test_user = "user";
test_password = "password";

router.post('/verify', (req,res) =>{
    console.log("verifying");
    if (req.body['username'] === test_user   && req.body['password'] === test_password) {
        console.log("hi, you're in");
        res.redirect('/public');
    }

    else {
        console.log("try again please");
        res.sendFile('views/login.html', {root: root_path});
    }
})

module.exports = router;