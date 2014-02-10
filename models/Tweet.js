var Mongoose = require('mongoose');

exports.TweetSchema = new Mongoose.Schema({
  name : { type : String, required : true },
  username : { type : String, required : true },
  tweet : { type : String, required : true }
});