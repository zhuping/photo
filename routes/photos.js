var Photo = require('../models/Photo');
var _path = require('path');
var join = _path.join;
var fs = require('fs');

exports.form = function(req, res) {
    res.render('photos/upload', {
        title: 'Photo upload'
    });
}

exports.submit = function(dir) {
    return function(req, res, next) {
        var img = req.files.image;
        var name = req.body.name || img.name;
        var path = join(dir, img.name);
        fs.rename(img.path, path, function(err) {
            if (err) return next(err);

            Photo.create({
                name: name,
                path: img.name
            }, function(err) {
                if (err) return next(err);
                res.redirect('/');
            });
        });
    }
}

exports.list = function(req, res, next) {
    Photo.find({}, function(err, photos) {
        if (err) return next(err);
        res.render('photos', {
            title: 'Photos',
            photos: photos
        });
    });
}

exports.download = function(dir) {
    return function(req, res, next) {
        var id = req.params.id;
        Photo.findById(id, function(err, photo) {
            if (err) return next(err);
            var path = join(dir, photo.path);
            var extname = _path.extname(photo.path);
            res.download(path, photo.name + extname);
        });
    }
}