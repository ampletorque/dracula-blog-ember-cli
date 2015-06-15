import Ember from "ember";


var NewCommentController = {
needs: ['post'],

  actions: {
    save: function() {
      var comment = this.store.createRecord('comment', {
        text: this.get('commentText')
      });
      comment.save();

      var post = this.get('controllers.post.model');
      post.get('comments').pushObject(comment);
      this.set('commentText', null);
      post.save();

      this.transitionToRoute('post', post.id);
    }
  }
};

export default Ember.ObjectController.extend(NewCommentController);
