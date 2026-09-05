const sectionizePlugin = require("./_plugins/eleventy-plugin-sectionize");

module.exports = function (eleventyConfig) {
	// Copy the contents of the `public` folder to wp-content to emulate WordPress behavior. 
	eleventyConfig.addPassthroughCopy({
		"./public/": "/wp-content/"
	});
	eleventyConfig.addPassthroughCopy("**/*.{png,jpg,jpeg,gif,svg,webp}");
	eleventyConfig.addPlugin(sectionizePlugin);
	eleventyConfig.addTemplateFormats("md");
	// Video passthrough
	eleventyConfig.addPassthroughCopy("**/*.{mp4,webm}");
	// Netlify redirects
	eleventyConfig.addPassthroughCopy("_redirects");
	// yml passthrough
	eleventyConfig.addPassthroughCopy("**/*.yml");
	// Admin index.html passthrough
	// Add Admin folder to the output
	eleventyConfig.addPassthroughCopy("admin/index.html");
	// Exclude the admin folder from processing
	eleventyConfig.ignores.add("admin/index.html");
};
