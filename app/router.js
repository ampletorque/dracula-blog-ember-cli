import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('contact');
  this.resource('recent-comments');
  this.route('author');
  this.resource('posts', { path: '/'}, function() {
    this.resource('post', { path: ':post_id' }, function() {
      this.resource('new-comment', { path: ':comment_id'});
    });
  });
  this.resource('new-post');

});

export default Router;
