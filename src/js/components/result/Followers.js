/** @jsx React.DOM */
var React = require('react');
var AppStore = require('../../stores/AppStore');
var StoreWatchMixin = require('../../mixins/StoreWatchMixin');
var FollowList = require('./FollowList');
var AppActions = require('../../actions/AppActions');
var AppConstants = require('../../constants/AppConstants');

function getFollowers(){
  return AppStore.getFollowers();
}

var Followers =
  React.createClass({
  	mixins: [new StoreWatchMixin(getFollowers)],
    _viewMore: function() {
      AppActions.viewMoreFollow(this.state.list, this.state.ids, AppConstants.TARGET_FOLLOERS);
    },
    render:function(){
      return  (
        <div className="col-md-6">
        	<h3>Common Followers</h3>
          <FollowList list={this.state.list}
            ids={this.state.ids} 
            loading={this.state.loading}
            viewMore={this._viewMore} />
        </div>
        )
    }
  });
module.exports = Followers;