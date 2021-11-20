const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function (config) {
    config.addPlugin(pluginRss);
    config.addPlugin(syntaxHighlight);

    config.addCollection('posts', collection =>
        collection.getFilteredByGlob('_posts/*.md')
            .sort((a, b) => b.date - a.date)
    )

    config.addCollection('projects', collection =>
        collection.getFilteredByGlob('_projects/*.md')
    )

    config.setBrowserSyncConfig({
        files: './_site/css/**/*.css'
    });
    config.addPassthroughCopy('img')
    config.addPassthroughCopy('js')
    config.addPassthroughCopy({ 'favicon': '/' })

    return {
        dir: {
            layouts: "_layouts"
        }
    }
};