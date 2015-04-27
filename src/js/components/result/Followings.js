/** @jsx React.DOM */
var React = require('react');
var AppStore = require('../../stores/AppStore');
var StoreWatchMixin = require('../../mixins/StoreWatchMixin');
var FollowList = require('./FollowList');

function getFollowings(){
  return {items: AppStore.getFollowings()}
}

var Followings =
  React.createClass({
  	mixins: [new StoreWatchMixin(getFollowings)],
    render:function(){
      return  (
        <div className="col-md-6">
        	<h3>Common Followings</h3>
          <FollowList items={this.state.items} />
        </div>
      )
    }
  });
module.exports = Followings;