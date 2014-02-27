Lightapi
========

This is a simple web framework based on Express and inspired from Sails.js.
Undex GPL v2 licence.

[![Build Status](https://travis-ci.org/palra/lightapi.png?branch=master)](https://travis-ci.org/palra/lightapi) [![NPM version](https://badge.fury.io/js/lightapi.png)](http://badge.fury.io/js/lightapi) [![Dependency Status](https://gemnasium.com/palra/lightapi.png)](https://gemnasium.com/palra/lightapi)

Quick start
----------

* Create a Node application following this structure:

```
  main_folder
  ├─┬ api
  │ ├─ controllers
  │ └─ views
  └── config
```

* In the `controllers` folder, create a `IndexController.js` node module. It will exports a object associating an action name to a function like this :

```javascript
  module.exports = {
    index: function (req, res) {
      res.render("index.ejs", {name: req.params.name}
    }
  }
```
* In the `views` folder, create a `index.ejs` template, and type something like : 

```
  Hello <%= name %> !
```
* Finally, in the `config` folder, add a `router.js` node module, which will define the routing of your application. The system is pretty much like Sails.js router (see http://sailsjs.org/#!documentation/routes), without resourseful routing.

```javascript
  module.exports = {
    "/:name": "IndexController:index"
  }
```
* Create an `app.js` node module in the main folder and simply add that following line : `require('lightapi');`

* Launch the app : `node app` and go to http://localhost:1337/World and magic will happend !

Documentation will be completed later, the roadmap a little bit before.
For some examples of app build using Light API, see [this repo](https://github.com/palra/lightapi-sample-app), and have a look at the differents branches.
