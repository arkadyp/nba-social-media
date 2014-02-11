var Mongoose = require('mongoose');

exports.InstagramSchema = new Mongoose.Schema({
  name : { type : String, required : true },
  username : { type : String, required : true },
  team : { type : String, required : true },
  instagram : { type : String, required : true },
  created_at : {type : Date, required : true}
});