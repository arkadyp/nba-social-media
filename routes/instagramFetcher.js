var _ = require('underscore');
var oauth = require('OAuth');
var ig = require('instagram-node').instagram();
ig.use({ access_token: '143577447.1fb234f.f9d06f9c8fa54e67bbc642d9ad867d05'});  

var users = {
  // '22138451' : ['JR Smith', 'teamswish', 'Knicks'],
  // '41197961' : ['Metta World Peace', 'theronandmettashow', 'Knicks'],
  // '260001551' : ['Tyson Chandler', 'tysonchandler', 'Knicks'],
  '15932476' : ['Iman Shumpert', 'imanshumpertthe1st', 'Knicks']
  // '24657562' : ["Amar'e Stoudemire", 'amareisreal', 'Knicks'],
  // '7732613' : ['Carmelo Anthony', 'carmeloanthony', 'Knicks']
}

var database;
var callback;
var counter;

exports.fetchInstagrams = function(InstagramDB, cb){
  database = InstagramDB;
  callback = cb;
  for(var id in users) {
    counter = 4;
    instragramRequest(id, users[id][0], users[id][1], users[id][2]);
  }
}

// 636466024513299368_19733607

var instragramRequest = function(id, name, username, team, max_id) {
  max_id = max_id || "";
  ig.user_media_recent(id, {count: 20, max_id: max_id}, function(err, medias, pagination, limit) {
    var next_max_id = pagination.next_max_id;
    
    if(next_max_id) {
      next_max_id = next_max_id.slice(0, next_max_id.indexOf('_'));  
    }

    var data = [];
    var urls = [];
    _.each(medias, function(media){
      data.push(media);
      urls.push(media.images.standard_resolution.url);
      addInstragramToDB(name, username, team, media)
    });

    //grab last 4 pages for each username
    if(counter >= 0) {
      counter--;
      console.log('Call #',counter, ' MAXID: ',next_max_id);
      instragramRequest(id, name, username, team, next_max_id);
    } else {
      callback(urls);
    }
  });
}

var addInstragramToDB = function(name, username, teamname, instagram){
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