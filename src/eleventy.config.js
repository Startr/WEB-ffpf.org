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
	// Netlify redirects and headers
	eleventyConfig.addPassthroughCopy("_redirects");
	eleventyConfig.addPassthroughCopy("_headers");
	// Site assets: the theme sheet and behaviour scripts (src/assets/).
	eleventyConfig.addPassthroughCopy("assets");
	// Design drafts for internal review, unlisted (noindex; see _headers).
	// Built by docs/design-drafts/build.mjs; copied as is, never templated.
	eleventyConfig.addPassthroughCopy("drafts");
	eleventyConfig.ignores.add("drafts/**");
	// yml passthrough
	eleventyConfig.addPassthroughCopy("**/*.yml");
	// Admin index.html passthrough
	// Add Admin folder to the output
	eleventyConfig.addPassthroughCopy("admin/index.html");
	// Exclude the admin folder from processing
	eleventyConfig.ignores.add("admin/index.html");
	// src/ is a 2024 copy of the old WordPress site: unlinked, wrong CRA number,
	// no legal footer. It stays out of the build; _redirects sends /src/ home.
	eleventyConfig.ignores.add("src/**");
};
