// Create web server

// Import modules
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Comment = require('../models/comment');

// Create web server
var commentRouter = express.Router();
commentRouter.use(bodyParser.json());

// Create routes
commentRouter.route('/')
    // Get all comments
    .get(function(req, res, next) {
        Comment.find({}, function(err, comment) {
            if (err) throw err;
            res.json(comment);
        });
    })

    // Add new comment
    .post(function(req, res, next) {
        Comment.create(req.body, function(err, comment) {
            if (err) throw err;
            console.log('Comment created!');
            var id = comment._id;

            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('Added the comment with id: ' + id);
        });
    })

    // Delete all comments
    .delete(function(req, res, next) {
        Comment.remove({}, function(err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });

commentRouter.route('/:commentId')
    // Get comment by id
    .get(function(req, res, next) {
        Comment.findById(req.params.commentId, function(err, comment) {
            if (err) throw err;
            res.json(comment);
        });
    })

    // Update comment by id
    .put(function(req, res, next) {
        Comment.findByIdAndUpdate(req.params.commentId, {
            $set: req.body
        }, {
            new: true
        }, function(err, comment) {
            if (err) throw err;
            res.json(comment);
        });
    })

    // Delete comment by id
    .delete(function(req, res, next) {
        Comment.findByIdAndRemove(req.params.commentId, function(err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });

// Export module
module.exports = commentRouter;