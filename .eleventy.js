module.exports = function (config) {
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

    return {
        dir: {
            layouts: "_layouts"
        }
    }
};