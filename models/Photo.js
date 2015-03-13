/*
 ** OSX下mongodb的安装方法 http://www.inferjay.com/blog/2014/07/18/use-homebrew-install-mongodb-at-the-mac-osx-10.9.4/
 */

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/photo_app');

var schema = new mongoose.Schema({
    name: String,
    path: String
});

module.exports = mongoose.model('Photo', schema);