# jia-vue-cli

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

---
title: Vue 多页面
tags: vue,模板,多页面
grammar_cjkRuby: true
date: 2018-6-7
---


---
## 安装 vue-cli

- npm i vue-cli -g

- vue init webpack
	- ? Generate project in current directory? Yes
	- ? Project name jia-vue-cli
	- ? Project description A Vue.js project
	- ? Author JiaLe1 <948962131@qq.com>
	- ? Vue build standalone
	- ? Install vue-router? Yes
	- ? Use ESLint to lint your code? No
	- ? Set up unit tests No
	- ? Setup e2e tests with Nightwatch? No
	- ? Should we run `npm install` for you after the project has been created? (recommended) npm

- npm run dev


---
## 调整项目目录结构

- 默认结构
	- src
		- assets
		- components
		- router
		- App.vue
		- main.js

- 在 `/src` 目录下新建 `pages/index` 目录，将 `/src` 下的 `assets` 、 `router` 、 `App.vue` 、 `main.js` 以及项目根目录下的 `/index.html` 移动到 `/src/pages/index/` 目录下。

- 将修改文件名 `main.js` 为 `index.js` 。


---
## 调整项目配置

- 修改 `/build/utils.js` ，添加多入口配置和多页面输出配置

	``` javascript
	// var path = require('path')
	var glob = require('glob')
	var HtmlWebpackPlugin = require('html-webpack-plugin')
	var PAGE_PATH = path.resolve(__dirname, '../src/pages')
	var merge = require('webpack-merge')

	//多入口配置
	exports.entries = function() {
	  var entryFiles = glob.sync(PAGE_PATH + '/*/*.js')
	  var map = {}
	  entryFiles.forEach((filePath) => {
		var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
		map[filename] = filePath
	  })
	  return map
	}

	//多页面输出配置
	exports.htmlPlugin = function() {
	  let entryHtml = glob.sync(PAGE_PATH + '/*/*.html')
	  let arr = []
	  entryHtml.forEach((filePath) => {
		let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
		let conf = {
		  template: filePath,
		  filename: filename + '.html',
		  chunks: [filename],
		  inject: true
		}
		if (process.env.NODE_ENV === 'production') {
		  conf = merge(conf, {
			chunks: ['manifest', 'vendor', filename],
			minify: {
			  removeComments: true,
			  collapseWhitespace: true,
			  removeAttributeQuotes: true
			},
			chunksSortMode: 'dependency'
		  })
		}
		arr.push(new HtmlWebpackPlugin(conf))
	  })
	  return arr
	}
	```
	
- 修改 `/build/webpack.base.conf.js` 的入口配置

	``` javascript
	module.exports = {
		...
		// entry: {
		//   app: './src/main.js'
		// },
		entry: utils.entries(),
		...
	}
	```
	
- 修改 `/build/webpack.dev.conf.js` 和 `/build/webpack.prod.conf.js` 的多页面配置，注释或删除 `HtmlWebpackPlugin` ，添加 `plugins: [...].concat(utils.htmlPlugin())` 
	
	- webpack.dev.conf.js
	
		``` javascript
		plugins: [
			......
			//  new HtmlWebpackPlugin({
			//    filename: 'index.html',
			//    template: 'index.html',
			//    inject: true
			//  }),
			......
		  ].concat(utils.htmlPlugin())
		```
	
	-  webpack.prod.conf.js
	
		``` javascript
		plugins: [
			......
			// new HtmlWebpackPlugin({
				//   filename: config.build.index,
				//   template: 'index.html',
				//   inject: true,
				//   minify: {
				//     removeComments: true,
				//     collapseWhitespace: true,
				//     removeAttributeQuotes: true
				//     // more options:
				//     // https://github.com/kangax/html-minifier#options-quick-reference
				//   },
				//   // necessary to consistently work with multiple chunks via CommonsChunkPlugin
				//   chunksSortMode: 'dependency'
				// }),
				......
		].concat(utils.htmlPlugin())
		```
	
- 修改打包后的 `/dist` 目录下的项目路径为相对路径

	- 在 `/build/utils.js` 文件中，增加 `publicPath: "../../"` 属性
	
		``` javascript
		// Extract CSS when that option is specified
			// (which is the case during production build)
			if (options.extract) {
			  return ExtractTextPlugin.extract({
				use: loaders,
				fallback: 'vue-style-loader',
				publicPath: '../../'
			  })
			} else {
			  return ['vue-style-loader'].concat(loaders)
			}
		```
		
	- 修改 `/config/index.js` 文件中的 `build: {assetsPublicPath: "/"}` 为 `build: {assetsPublicPath: "./"}`

		``` javascript
		build: {
			// Template for index.html
			index: path.resolve(__dirname, '../dist/index.html'),

			// Paths
			assetsRoot: path.resolve(__dirname, '../dist'),
			assetsSubDirectory: 'static',
			assetsPublicPath: './',
			...
		}
		```
