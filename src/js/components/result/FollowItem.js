/** @jsx React.DOM */
var React = require('react');

var FollowItem =
  React.createClass({
    render:function(){
      var data = this.props.item;
      var url = "https://twitter.com/" + data.screen_name;
      
      return  (
        <div className="list-group-item item">
          <a href={url} target="_blank">
            <img className="avatar" src={data.profile_image_url_https} />
          </a>
          <div className="item-content">
            <a href={url} target="_blank"> <strong>{data.name}</strong></a>
            <span className="screenName">@{data.screen_name}</span>
            <p>{data.description}</p>
          </div>
        </div>
        )
    }
  });
module.exports = FollowItem;