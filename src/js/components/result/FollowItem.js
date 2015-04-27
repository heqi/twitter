/** @jsx React.DOM */
var React = require('react');

var FollowItem =
  React.createClass({
    render:function(){
      var data = this.props.item;
      return  (
        <div className="item">
          <img className="avatar" src={data.profile_image_url_https} />
          <div className="item-content">
            <strong>{data.name}</strong>
            <span className="screenName">@{data.screen_name}</span>
            <p>{data.description}</p>
          </div>
        </div>
        )
    }
  });
module.exports = FollowItem;