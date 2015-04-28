/** @jsx React.DOM */
var React = require('react');

var FollowItemMsg =
  React.createClass({
    render:function(){
      return  (
          <div className="list-group-item item-msg">{this.props.children}</div>
        )
    }
  });
module.exports = FollowItemMsg;
