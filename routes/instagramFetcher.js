var _ = require('underscore');
var oauth = require('OAuth');
var ig = require('instagram-node').instagram();
ig.use({ access_token: '143577447.1fb234f.f9d06f9c8fa54e67bbc642d9ad867d05'});  

exports.fetchInstagrams = function(cb){
  ig.user_media_recent('22138451', {count: 20},function(err, medias, pagination, limit) {
    console.log(pagination);
    var image_urls = [];
    _.each(medias, function(media){
      image_urls.push(media.images.standard_resolution.url);
      console.log(media.images.standard_resolution.url);
    });
    console.log('done');
    cb(image_urls);
    console.log('i dont understand');
  });
}