# here

Port of the [{here}](https://here.r-lib.org/) R package to work with NodeJS.

## Install

```
npm i @colinfay/here
```

## About

The goal of `here` is to provide a way to reliably build file paths, inspired by what the [{here}](https://here.r-lib.org/) R package does.

`here` uses the following heuristic to build the path: 

- Looks for the `.here` file, going up `process.env.HERE_MAX_DEPTH` (defaulting to 3) folders
  
- If it doesn't find a `.here` file, it looks for the `package.json` file, going up `process.env.HERE_MAX_DEPTH` (defaulting to 5) folders

- If it finds nothing, it returns the passed path unchanged

``` javascript
// The working dir
> process.cwd()
'/Users/colin/nodesproject/herejs'
// Loading here
> const {here, set_here} = require("@colinfay/here")
undefined
// Where is here?
> here()
'/Users/colin/nodesproject/herejs'
// Building a path with here()
> here("lib/index.js")
'/Users/colin/nodesproject/herejs/lib/index.js'
// Changing the here path to a parent directory
> set_here(path = "../..")
undefined
// Here has changed
> here()
'/Users/colin'
> here("lib/index.js")
'/Users/colin/lib/index.js'
// You can also lower the level of depth here is looking into
> here("lib/index.js", max_depth = 1)
'/Users/colin/nodesproject/herejs/lib/index.js'
```

## Why would you want to do that?

Reliably building paths when engineering a project can be quite a challenge: when you have nested folders, you'll have to move back and forth in the tree to get the correct path. 
With `here`, you can move a script up and down the tree, or from one computer to another and still find the correct path.

For example, imagine you have the following structure and want to refer to ./src/app.js.
If you call `here("src/app.js")` in any of the file of this structure, you'll get the path to the file.

```
.
├── dev.js // here("src/app.js") will return the path to app.js 
├── package-lock.json
├── package.json
├── src
│   ├── app.js 
│   ├── index.js // here("src/app.js") will return the path to app.js 
│   └── routes
│       └── routes.js // here("src/app.js") will return the path to app.js 
└── tests
    └── routes.test.js // here("src/app.js") will return the path to app.js 
```

