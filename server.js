var express = require('express');
var fs = require('fs');
var request = require('request')
var cheerio = require('cheerio');
var app = express();

var cleaner = require('./utilities/cleaner');

// TODO: refactor so that this is pulling in a series of smaller scrapers that
// execute in the following order:
// - scrape category NAMEs and URLs
// - scrape category FILM TITLES, YEARS, RATINGS, and URLs (check for lack of
// #nav-next to know when to stop). Also include GENRE alongside each entry.

app.get('/scrape', function(req, res) {

  url = 'http://www.20thcenturyflicks.co.uk/index.php?view=categories';

  request(url, function(error, response, html) {

    if (!error) {
      var $ = cheerio.load(html);

      var categories = []
      $('a.cloud1').each(function(i, element) {
        var name = $(this).text();
        name = cleaner(name);
        var url = $(this).attr('href');
        categories.push(
          {
          name: name,
          url: url,
          }
        )
      });

      fs.writeFile('logs/categories.json', JSON.stringify(categories, null, 4), function(err){
        console.log('File successfully written! - Check your project directory for the output.json file');
      });

      for (i = 0; i < categories.length;) {
        console.log(categories[i].url);
        i++;
      }

      res.sendFile('gifs/anakin.gif', {root: __dirname});

    }
    else { console.log(error)}
  });
});

app.listen('8081')

console.log('Head over to port 8081 to get the party started!');

exports = module.exports = app;
