/** @jsx React.DOM */
var React = require('react');
var AppStore = require('../../stores/AppStore');
var StoreWatchMixin = require('../../mixins/StoreWatchMixin');
var FollowList = require('./FollowList');
var AppActions = require('../../actions/AppActions');
var AppConstants = require('../../constants/AppConstants');

function getFollowings(){
  return AppStore.getFollowings();
}

var Followings =
  React.createClass({
  	mixins: [new StoreWatchMixin(getFollowings)],
    _viewMore: function() {
      AppActions.viewMoreFollow(this.state.list, this.state.ids, AppConstants.TARGET_FOLLOWINGS);
    },
    render:function(){
      return  (
        <div className="col-md-6">
        	<h3>Common Followings</h3>
          <FollowList list={this.state.list}
            ids={this.state.ids} 
            loading={this.state.loading}
            viewMore={this._viewMore} />
        </div>
      )
    }
  });
module.exports = Followings;