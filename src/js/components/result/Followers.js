/** @jsx React.DOM */
var React = require('react');
var AppStore = require('../../stores/AppStore');
var StoreWatchMixin = require('../../mixins/StoreWatchMixin');
var FollowList = require('./FollowList');

function getFollowers(){
  return {items: AppStore.getFollowers()}
}

var Followers =
  React.createClass({
  	mixins: [new StoreWatchMixin(getFollowers)],
    render:function(){
      return  (
        <div className="col-md-6">
        	<h3>Common Followers</h3>
          <FollowList items={this.state.items} />
        </div>
        )
    }
  });
module.exports = Followers;