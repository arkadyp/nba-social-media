var _ = require('underscore');
var oauth = require('OAuth');
var ig = require('instagram-node').instagram();
ig.use({ access_token: '143577447.1fb234f.f9d06f9c8fa54e67bbc642d9ad867d05'});  

var users = {
  // '22138451' : ['JR Smith', 'teamswish', 'Knicks'],
  '19733607' : ['Nick Young', 'swaggyp1', 'Lakers']
}

var database;
var callback;

exports.fetchInstagrams = function(InstagramDB, cb){
  database = InstagramDB;
  callback = cb;
  for(var id in users) {
    instragramRequest(id, users[id][0], users[id][1], users[id][2]);
  }
}

var instragramRequest = function(id, name, username, team) {
  ig.user_media_recent(id, {count: 20},function(err, medias, pagination, limit) {
    console.log(pagination);
    var data = [];
    _.each(medias, function(media){
      data.push(media);
      addInstragramToDB(name, username, team, media)
    });
    callback(data);
  });
}

var counter = 0;

var addInstragramToDB = function(name, username, teamname, instagram){
  console.log(counter +' save instragram');
  counter++;
  var currentInstagram = new database({
    name : name,
    username : username,
    team: teamname,
    instagram : JSON.stringify(instagram),
    created_at : new Date(instagram.created_time * 1000)
  });
  currentInstagram.save();
}


// ig.user_media_recent('22138451', {count: 20},function(err, medias, pagination, limit) {
//     console.log(pagination);
//     var image_urls = [];
//     _.each(medias, function(media){
//       image_urls.push(media.images.standard_resolution.url);
//       console.log(media.images.standard_resolution.url);
//     });
//     console.log('call back called from instragram fetcher');
//     cb(image_urls);
//   });