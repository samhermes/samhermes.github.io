const { DateTime } = require("luxon");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

module.exports = function (config) {
    config.addPlugin(pluginRss);
    config.addPlugin(syntaxHighlight);

    config.addFilter("readableDate", dateObj => {
        return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("DDD");
    });

    let markdownLibrary = markdownIt({
        html: true,
        breaks: true,
        linkify: true
    }).use(markdownItAnchor);
    config.setLibrary("md", markdownLibrary);

    config.addCollection('posts', collection =>
        collection.getFilteredByGlob('_posts/*.md')
            .sort((a, b) => b.date - a.date)
    )

    config.addFilter('postsFilter', function(collection, post) {
        if (!post) return collection;
        return collection.filter(item => item.data.selected)
    })

    config.addCollection('projects', collection =>
        collection.getFilteredByGlob('_projects/*.md').sort((a, b) => {
            return Number(a.data.order) - Number(b.data.order);
        })
    )

    config.addCollection('writing', collection =>
        collection.getFilteredByGlob('_writing/*.md')
            .sort((a, b) => b.date - a.date)
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

    config.setServerOptions({
        watch: ["_site/**/*.css"]
    });

    config.addPassthroughCopy('fonts')
    config.addPassthroughCopy('img')
    config.addPassthroughCopy('js')
    config.addPassthroughCopy({ 'favicon': '/' })
    config.addPassthroughCopy('robots.txt')

    return {
        dir: {
            layouts: "_layouts"
        }
    }
};
