if (!Array.prototype.find) {
  Array.prototype.find = function(predicate) {
    if (this == null) {
      throw new TypeError('Array.prototype.find called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;

    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return value;
      }
    }
    return undefined;
  };
}

if (!Array.prototype.filter) {
  Array.prototype.filter = function(fun/*, thisArg*/) {
    'use strict';

    if (this === void 0 || this === null) {
      throw new TypeError();
    }

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== 'function') {
      throw new TypeError();
    }

    var res = [];
    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++) {
      if (i in t) {
        var val = t[i];

        // NOTE: Technically this should Object.defineProperty at
        //       the next index, as push can be affected by
        //       properties on Object.prototype and Array.prototype.
        //       But that method's new, and collisions should be
        //       rare, so use the more-compatible alternative.
        if (fun.call(thisArg, val, i, t)) {
          res.push(val);
        }
      }
    }

    return res;
  };
}

var posts = [
  {
    id: 1,
    title: 'I vant to vash your vindows',
    body: 'many vindows',
    comments: [1]
  },
  {
    id: 2,
    title: 'I vant to visper through the vall',
    body: 'many valls',
    comments: [2,3]
  }
];

var comments = [
{
  id: 1,
  text: 'i hate windows',
  post: 1
},
{
  id: 2,
  text: 'i hate walls',
  post: 2
},
{
  id: 3,
  text: 'well, i love walls',
  post: 2
}
];

module.exports = function(app) {
  var express = require('express');
  var postsRouter = express.Router();

  postsRouter.get('/', function(req, res) {
    res.send({
      'posts': posts,
      'comments': comments
    });
  });

  postsRouter.post('/', function(req, res) {
    
    res.status(201).end();
  });

  postsRouter.get('/:id', function(req, res) {
    var commentSub = [];

    res.send({

      'post': posts.find(function(post) {
        return post.id == req.params.id
      }),

      'comments': comments.filter(function(comment) {
        return comment.post == req.params.id
      })

    });
  });

  postsRouter.put('/:id', function(req, res) {
    res.send({
      'posts': {
        id: req.params.id
      }
    });
  });

  postsRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/posts', postsRouter);
};
