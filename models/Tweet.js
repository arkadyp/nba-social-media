var Mongoose = require('mongoose');

exports.TweetSchema = new Mongoose.Schema({
  done : { type : Boolean, required : true },
  due : { type : Date, required : true },
  description : { type : String, required : true }
});