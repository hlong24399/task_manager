//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

//labor model and schema
var LaborSchema = new Schema({
    l_id: Number,
    l_order: Number,
    l_title: String,
    l_hour: Number,
    l_status: Boolean
});
var LaborModel = mongoose.model('labordb', LaborSchema);

module.exports = LaborModel;
