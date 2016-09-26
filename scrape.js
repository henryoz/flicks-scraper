var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

/**
 * [Get all current cloud tags from the categories index page]
 * @type {[type]}
 */
request('http://www.20thcenturyflicks.co.uk/index.php?view=categories', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    var categories = []
    $('a.cloud1').each(function(i, element) {
      var name = $(this).text();
      name = cleanString(name);
      var url = $(this).attr('href');
      categories.push(
        {
        name: name,
        url: url,
        }
      )
    });
    fs.writeFile("results.txt", JSON.stringify(categories), 'utf8');
    // return categories;
  }
});

/**
 * [Strip out breaks, leading whitespace, meaningless numbers, and commas from tags]
 * @param  {string} name [the tag name]
 * @return {string} name [the cleaned up tag name]
 */
function cleanString(name) {
  var lineBreaks = /\r?\n|\r/g;
  var numbers = /^01/g
  var space = /^\s+/g

  name = name.replace(lineBreaks, "");
  name = name.replace(',', "");
  name = name.replace(numbers, "");
  name = name.replace(space, "");

 return name;
}
