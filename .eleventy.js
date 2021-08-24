var { DateTime } = require("luxon");
var syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy('css');
  eleventyConfig.addPassthroughCopy('images');

  eleventyConfig.addPlugin(syntaxHighlight, {
  });

  eleventyConfig.addFilter("DATE_MED", function(value) {
    return DateTime.fromJSDate(value).toLocaleString(DateTime.DATE_MED);
  });
  eleventyConfig.addFilter("DATE_HUGE", function(value) {
    return DateTime.fromJSDate(value).toLocaleString(DateTime.DATE_HUGE);
  });

  return {
    passthroughFileCopy: true
  }
}


