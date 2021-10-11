module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("images");

  var syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
  eleventyConfig.addPlugin(syntaxHighlight, {});

  var { DateTime } = require("luxon");
  eleventyConfig.addFilter("DATE_MED", function (value) {
    return DateTime.fromJSDate(value).toLocaleString(DateTime.DATE_MED);
  });
  eleventyConfig.addFilter("DATE_HUGE", function (value) {
    return DateTime.fromJSDate(value).toLocaleString(DateTime.DATE_HUGE);
  });

  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addLiquidShortcode("image", imageShortcode);
  eleventyConfig.addJavaScriptFunction("image", imageShortcode);

  return {
    passthroughFileCopy: true,
  };
};

//*************** image functions */
var Image = require("@11ty/eleventy-img");

async function imageShortcode(src, alt, sizes) {
  var metadata = await Image(src, {
    widths: [300, 600],
  });

  var imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };

  // throw an error on missing alt in imageAttributes (alt="" works okay)
  return Image.generateHTML(metadata, imageAttributes, {
    whitespaceMode: "inline",
  });
}

// need a function that's going to modify my css file to give me the different widths of the background images? anywhere on the site that I would use a background image i could just as easily use a normal image, and not have to fight, probably.
