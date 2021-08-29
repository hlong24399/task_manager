require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
var LaborModel = require('../model/labor_db');
var RoomModel = require('../model/room_db');
var router = express.Router();


var mongoDB = `mongodb+srv://admin:${process.env.ADMIN_PW}@task-manager-cluster.cggbp.mongodb.net/taskdb?retryWrites=true&w=majority`;

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



module.exports = router;