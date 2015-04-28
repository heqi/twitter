/** @jsx React.DOM */
var React = require('react');

var FollowItemMore =
  React.createClass({
    _onClick:function() {
      this.props.viewMore();
    }, 
    render:function(){
      return  (
        <a className="list-group-item item-view-more" onClick={this._onClick} >View More</a>
        )
    }
  });
module.exports = FollowItemMore;