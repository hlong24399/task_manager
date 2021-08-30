const express = require('express');
const router = express.Router();
const session = require('express-session');



//init
router.get('/', (req,res) => { 
    console.log("just a start");
    console.log();
    // res.sendFile('views/login.html', {root: "./"});
    res.redirect("/public");
})


//hold session
var sess;

// verify log-in info
test_user = "user";
test_password = "password";

router.post('/verify', (req,res) =>{
    console.log("verifying");
    if (req.body['username'] === test_user && req.body['password'] === test_password) {
        sess = req.session;
        console.log(sess.id);
        res.redirect('/public');
    }
    else {
        console.log("try again please");
        res.sendFile('views/login.html', {root: "./"});
    }
})





module.exports = router;