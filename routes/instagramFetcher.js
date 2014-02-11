var oauth = require('OAuth');
var ig = require('instagram-node').instagram();
ig.use({ access_token: '143577447.1fb234f.f9d06f9c8fa54e67bbc642d9ad867d05'});  

app.get('/insta', function(req, res){
  ig.user_media_recent('22138451', {count: 20},function(err, medias, pagination, limit) {
    console.log(pagination);
    var image_url = [];
    _.each(medias, function(media){
      image_url.push(media.images.standard_resolution.url);
    });
    res.send(image_url);
  });  
});