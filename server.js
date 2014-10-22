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

      var title, headline, description, fbHeadline, fbDescription, fbImage, twitterHeadline, twitterDescription, twitterImage, eBodyPreview, eTitle, eDescription, eImage;

      keys.forEach(function(key){

        //description
        if(meta[key].attribs){
         // console.log(meta[key].attribs);
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

          if(meta[key].attribs.name=='twitter:title'){
            twitterHeadline = meta[key].attribs.content;
          }

          if(meta[key].attribs.name =='twitter:description'){
            twitterDescription = meta[key].attribs.content;
          }

          if(meta[key].attribs.name =='twitter:image:src'){
            twitterImage = meta[key].attribs.content;
          }

        }

      });

      //title
      if($('title')['length']>0){
        title = $('title')['0']['children'][0]['data'];
      }

      //headline
      if($('h1')['length']>0){
        if($('h1')[0]['children'].length>0){
         headline = $('h1')[0]['children'][0]['data'];
        }
      }


      //embedly

      new embedly({key: '540b263b64dd45e2bfa8e6741c3dfc6a'}, function(err, api) {
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
          if(objs[0]['images'].length >0){
            eImage = objs[0]['images'][0]['url'];
          }
          eDescription = objs[0]['description'];

         if(objs[0]['content']!=null){
            eBodyPreview = objs[0]['content'].slice(0,500).replace(/<(?:.|\n)*?>/gm, '');;
          }



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
            'eImage' : eImage,
            'eBodyPreview' : eBodyPreview
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


