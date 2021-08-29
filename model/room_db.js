//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

//room model and schema
var RoomSchema = new Schema({
  r_id: Number,
  r_name: String,
  r_labor_count: Number
});

var RoomModel = mongoose.model('roomdb', RoomSchema);

module.exports = RoomModel;