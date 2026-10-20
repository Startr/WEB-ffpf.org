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
	// Hidden pending consent (officer review, 2026-10-20): the patient
	// sponsorship and shop pages, and src/, the 2024 copy of the old
	// WordPress site that repeats them. _redirects sends their URLs on.
	for (const dir of [
		"sponsorship", "shop", "sponsorship-category", "sponsorship-tag",
		"fr/parrainage", "fr/sponsorship-category", "fr/sponsorship-tag",
		"src",
	]) {
		eleventyConfig.ignores.add(`${dir}/**`);
	}
};
