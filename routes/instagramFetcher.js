var _ = require('underscore');
var oauth = require('OAuth');
var ig = require('instagram-node').instagram();
ig.use({ access_token: '143577447.1fb234f.f9d06f9c8fa54e67bbc642d9ad867d05'});  

var users = {
  // '22138451' : ['JR Smith', 'teamswish', 'Knicks'],
  // '41197961' : ['Metta World Peace', 'theronandmettashow', 'Knicks'],
  // '260001551' : ['Tyson Chandler', 'tysonchandler', 'Knicks'],
  // '15932476' : ['Iman Shumpert', 'imanshumpertthe1st', 'Knicks'],
  // '24657562' : ["Amar'e Stoudemire", 'amareisreal', 'Knicks'],
  // '7732613' : ['Carmelo Anthony', 'carmeloanthony', 'Knicks'],
  // '382483692' : ['Andrea Bargnani', 'andreabargnani777', 'Knicks'],
  // '351564405' : ['Kobe Bryant', 'kobebryant', 'Lakers'],
  // '189737007' : ['Pau Gasol', 'paugasol', 'Lakers'],
  // '19733607' : ['Nick Young', 'swaggyp1', 'Lakers'],
  // '15441174' : ['Jordan Hill', 'jchill27', 'Lakers'],
  // '18646419' : ['Jordan Farmar', 'jrfarmar', 'Lakers'],
  // '394117442' : ['Robert Sacre', 'therealsacre', 'Lakers'],
  // '19410587' : ['Lebron James', 'kingjames', 'Heat'],
  // '222698246' : ['Dwyane Wade', 'dwyanewade', 'Heat'],
  // '201583216' : ['Chris Bosh', 'chrisbosh', 'Heat'],
  // '22194064' : ['Mario Chalmers', 'mchalmers15', 'Heat'],
  // '211890100' : ['Ray Allen', 'rayn34', 'Heat'],
  // '350928867' : ['Norris Cole', 'n_coleworld', 'Heat']
};

var database;
var callback;
var counter;

exports.fetchInstagrams = function(InstagramDB, cb){
  database = InstagramDB;
  callback = cb;
  for(var id in users) {
    counter = 6;
    instragramRequest(id, users[id][0], users[id][1], users[id][2]);
  }
}

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

var timestamps = {};

var addInstragramToDB = function(name, username, teamname, instagram){
  var created_at = new Date(instagram.created_time * 1000)
  if(!(JSON.stringify(created_at) in timestamps)) {
    timestamps[JSON.stringify(created_at)] = true;
    var currentInstagram = new database({
      name : name,
      username : username,
      team: teamname,
      instagram : JSON.stringify(instagram),
      created_at : created_at
    });
    currentInstagram.save();  
  }
  
}



