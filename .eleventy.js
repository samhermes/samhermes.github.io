module.exports = function (config) {
    config.addCollection('posts', collection =>
        collection.getFilteredByGlob('_posts/*.md')
    )

    config.addCollection('projects', collection =>
        collection.getFilteredByGlob('_projects/*.md')
    )

    config.addCollection('category', collection =>
        collection.getFilteredByGlob('_category/*.md')
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