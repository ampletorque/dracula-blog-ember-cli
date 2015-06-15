import Ember from "ember";

var NewPostController = {

  actions: {
    save: function() {
      var newPost = this.store.createRecord('post', {
        title: this.get('title'),
        body: this.get('body')
      });
      newPost.save();
      // this.set('title', null);
      // this.set('body', null);
      this.transitionToRoute('posts');
    }
  }
};

export default Ember.ObjectController.extend(NewPostController);
