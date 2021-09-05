require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
var LaborModel = require('../model/labor_db');
var RoomModel = require('../model/room_db');
var router = express.Router();
var util = require('util');

var mongoDB = `mongodb+srv://admin:${process.env.ADMIN_PW}@task-manager-cluster.cggbp.mongodb.net/taskdb?retryWrites=true&w=majority`;

router.use(express.json()) // for parsing application/json
router.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//Get the default connection
const db = (mongoDB);
mongoose.Promise = global.Promise;
 
mongoose.connect(db, { useNewUrlParser : true,
useUnifiedTopology: true }, function(error) {
    if (error) {
        console.log("Error!" + error);
    }
});
 
router.post('/saveroom', function(req, res) {
        console.log(req.body);
        var new_room = {r_id: 1, r_name: req.body['room_name_input'], r_labor_count: 0};
        var newRoom = new RoomModel(new_room);
        // var newLabor = new LaborModel({l_id: 1, l_order: 2, l_title: "test_labor", l_hour: 4, l_status: true});
        // newLabor.save();
        newRoom.save(function(err, data) {
            if (err) {
                console.log("error in newRoom");
            }
            else {
                console.log("data is in");
            }
        });
        res.redirect("../public");
    });

router.post('/save-state', function(req, res) { 
    body_html = req.body['the_html'];
    var the_room_object = req.body['the_room_object'];
    var the_hour = parseFloat(req.body['the_hour']);
    var the_iRoom = parseInt(req.body['the_iRoom']);
    var the_cb_state = req.body['cb_states'];
   
    
    fs.writeFile('./public/index.html', body_html, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });

    var data = fs.readFileSync('./public/assets/js/script.js').toString().split("\n");
    data.splice(1, 1, `room_object=${the_room_object}`);
    data.splice(3, 1, `total_h = ${the_hour};`);
    data.splice(5, 1, `iRoom = ${the_iRoom};`);
    data.splice(7, 1, `cb_state = [${the_cb_state}];`);
    var text = data.join("\n");


    
    fs.writeFile('./public/assets/js/script.js', text, function (err) {
        if (err) return console.log(err);
    });


    res.redirect("../public");
});

router.get('/logout', function(req, res) {
    var og_script = fs.readFileSync('./public/assets/js/original_script.js');
    fs.writeFile('./public/assets/js/script.js', og_script, function (err) {
        if (err) return console.log(err);
    });

    var og_index = fs.readFileSync('./public/origin_index.html');
    fs.writeFile('./public/index.html', og_index, function (err) {
        if (err) return console.log(err);
    });


    res.redirect("../public");
});


module.exports = router;