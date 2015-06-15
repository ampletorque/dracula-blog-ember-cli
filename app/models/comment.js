import DS from 'ember-data';

export default DS.Model.extend({
  text: DS.attr('string'),
  Post: DS.belongsTo('post', {async: true})
});
