---
title: Add GitHub repository as npm dependency
date: 2024-01-11
tags:
  - JavaScript
---
I have a GitHub repository that contains foundational styles and scripts that I use in other projects. In order to avoid copying and pasting the code, I wanted to include it as an npm dependency. Additionally, I wanted to see if I could avoid sending it to npm, and get it directly from GitHub. Fortunately, you can!

From the [NPM docs on `npm install`](https://docs.npmjs.com/cli/v9/commands/npm-install), GitHub repositories can be installed directly by using the [username]/[repository-name] convention:

```bash
npm install samhermes/alexander
```

Once that runs, it will show up in package.json as:

```json
"dependencies": {
	"alexander": "github:samhermes/alexander"
}
```

This worked great, but then I started to wonder about versioning. If I make an update to the `alexander` repository, the latest version will always be pulled into my projects when doing an install. In most cases, this would be a good thing, but it would be better to be able to opt in.

Again, from the [`npm install` docs](https://docs.npmjs.com/cli/v9/commands/npm-install), I found that I could install based on a commit number or tag. I set up a tag for the latest version of the repository, and used it to reinstall:

```bash
npm install samhermes/alexander#1.0.3
```

Now, package.json reflected the tagged version, and I'll need to update to a new version to get any future changes:

```json
"dependencies": {
	"alexander": "github:samhermes/alexander#1.0.3"
}
```