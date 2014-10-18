var server = require('node-static');
var url = require('url');
var jsdom = require("jsdom");
var cheerio = require('cheerio');
var request = require('request');
var request =  request.defaults({ jar: request.jar() }); //some weird request bug
var embedly = require('embedly');
var util = require('util');


var fileServer = new server.Server(__dirname);


//var testUrl = "http://www.bbc.com/sport/0/rugby-union/29617070";


var parseURL = function(testUrl, res){
  request(testUrl, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      $ = cheerio.load(body);
      var meta = $('meta');
      var keys = Object.keys(meta);

      var title, headline, description, fbHeadline, fbDescription, fbImage, twitterHeadline, twitterDescription, twitterImage, bodyText, eTitle, eDescription, eImage;

      keys.forEach(function(key){

        //description
        if(meta[key].attribs){
          if(meta[key].attribs.name =='description'){
            description = meta[key].attribs.content;
          }

          if(meta[key].attribs.property =='og:title'){
            fbHeadline = meta[key].attribs.content;
          }

          if(meta[key].attribs.property =='og:title'){
            fbHeadline = meta[key].attribs.content;
          }

          if(meta[key].attribs.property =='og:description'){
            fbDescription = meta[key].attribs.content;
          }

          if(meta[key].attribs.property =='og:image'){
            fbImage = meta[key].attribs.content;
          }

          if(meta[key].attribs.property =='twitter:title'){
            twitterHeadline = meta[key].attribs.content;
          }

          if(meta[key].attribs.property =='twitter:description'){
            twitterDescription = meta[key].attribs.content;
          }

          if(meta[key].attribs.property =='twitter:image'){
            twitterImage = meta[key].attribs.content;
          }

        }

      });

      //title
      try{
        title = $('title')['0']['children'][0]['data'];
      }catch(e){ console.log('err title') }

      //headline
      try{
        headline = $('h1')[0]['children'][0]['data'];
      } catch(e) {console.log('err headline')}


      //embedly

      new embedly({key: 'e2dcb7bae5a443bfbb5f726daf05549f'}, function(err, api) {
        if (!!err) {
          console.error('Error creating Embedly api');
          console.error(err.stack, api);
          return;
        }
        api.extract({url: testUrl}, function(err, objs) {
          if (!!err) {
            console.error('request #1 failed');
            console.error(err.stack, objs);
            return;
          }

          eTitle = objs[0]['title'];
          eImage = util.inspect(objs[0]['images'][0]['url']);
          eDescription = objs[0]['description'];



          /*
             console.log("TITLE: " + title);
             console.log("HEADLINE: " + headline);
             console.log("DESCRIPTION: " + description);
             console.log("fbTitle: " + fbHeadline);
             console.log("fbDescription: " + fbDescription);
             console.log("fbImage: " + fbImage);
             console.log("twitterHeadline: " + twitterHeadline);
             console.log("twitterDescription: " + twitterDescription);
             console.log("twitterImage: " + twitterImage);
             console.log("eTitle: " + eTitle);
             console.log("eDescription: " + eDescription);
             console.log("eImage: " + eImage);
             */

          var data = {
            'title' : title,
            'headline' : headline,
            'description' : description,
            'fbHeadline' : fbHeadline,
            'fbDescription' : fbDescription,
            'fbImage': fbImage,
            'twitterHeadline' : twitterHeadline,
            'twitterDescription' : twitterDescription,
            'twitterImage' : twitterImage,
            'eTitle' : eTitle,
            'eDescription' : eDescription,
            'eImage' : eImage
          }
          res.end(JSON.stringify(data));
        });
      });

    }
  })
}


var app = require('http').createServer(function (req, res) {

  query = url.parse(req.url, true).query;
  console.log(query.url);


  //parse url
  if(query.url){
    parseURL(query.url, res);
  }

  //serve stuff
  else{
    req.addListener('end', function () {
      fileServer.serve(req, res);
    }).resume();
  }
}).listen(8000);


