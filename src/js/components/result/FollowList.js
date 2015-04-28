/** @jsx React.DOM */
var React = require('react');
var FollowItem = require('./FollowItem');
var FollowItemMore = require('./FollowItemMore');
var FollowItemMsg = require('./FollowItemMsg');

var FollowList =
  React.createClass({
    render:function(){
      var content = null;
      var msg = null;
      if (this.props.list.length === 0) {
        msg = (<FollowItemMsg>No Result</FollowItemMsg>);
      } else {
        content = this.props.list.map(function(item){
          return (
              <FollowItem key={item.id} item={item} />
          )})

        if (this.props.ids.length > this.props.list.length) {
          if (this.props.loading) {
            msg = (<FollowItemMsg>Loading...</FollowItemMsg>);
          } else {
            msg = (<FollowItemMore viewMore={this.props.viewMore}/>);
          }
        }
      }

      return (
        <div className="list-group">
            {content}
            {msg}
          </div>
        )
    }
  });

module.exports = FollowList;