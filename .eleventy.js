const { DateTime } = require("luxon");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function (config) {
    config.addPlugin(pluginRss);
    config.addPlugin(syntaxHighlight);

    config.addFilter("readableDate", dateObj => {
        return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("DDD");
    });

    config.addCollection('posts', collection =>
        collection.getFilteredByGlob('_posts/*.md')
            .sort((a, b) => b.date - a.date)
    )

    config.addCollection('projects', collection =>
        collection.getFilteredByGlob('_projects/*.md')
    )

    function filterTagList(tags) {
        return (tags || []).filter(tag => ["all", "nav", "post", "posts"].indexOf(tag) === -1);
    }

    // Create an array of all tags
    config.addCollection("tagList", function(collection) {
        let tagSet = new Set();
        collection.getAll().forEach(item => {
            (item.data.tags || []).forEach(tag => tagSet.add(tag));
        });

        return filterTagList([...tagSet]);
    });

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