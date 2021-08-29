const express = require('express');
const router = express.Router();
const session = require('express-session');



//init
router.get('/', (req,res) => { 
    console.log("just a start");
    console.log();
    res.sendFile('views/login.html', {root: "./"});
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

// router.post('/save', function(req, res) {
//     console.log(req.body);
//     var new_room = {r_id: 1, r_name: req.body, r_labor_count: 0};
//     var newRoom = new RoomModel(new_room);
//     // var newLabor = new LaborModel({l_id: 1, l_order: 2, l_title: "test_labor", l_hour: 4, l_status: true});
//     // newLabor.save();
//     newRoom.save(function(err, data) {
//         if (err) {
//             console.log("error in newRoom");
//         }
//         else {
//             console.log("data is in");
//         }
//     });
//     res.redirect("../public");
// });





module.exports = router;