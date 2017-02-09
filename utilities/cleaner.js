/**
 * [Strip out breaks, leading whitespace, meaningless numbers, and commas from tags]
 * @param  {string} name [the tag name]
 * @return {string} name [the cleaned up tag name]
 */
function cleaner(name) {
  var lineBreaks = /\r?\n|\r/g;
  var numbers = /^01/g
  var space = /^\s+/g

  name = name.replace(lineBreaks, "");
  name = name.replace(',', "");
  name = name.replace(numbers, "");
  name = name.replace(space, "");

  console.log('Cleaned ' + name);

 return name;
}

module.exports = cleaner;
