/** @jsx React.DOM */
var React = require('react');
var FollowItem = require('./FollowItem');

var FollowList =
  React.createClass({
    render:function(){
      if (this.props.items.length === 0)
      {
        return (<div className="list-group"><div className="list-group-item">no result</div></div>)
      } else {
        return (
            <div className="list-group">
              {this.props.items.map(function(item){
                return (
                  <div className="list-group-item">
                    <FollowItem key={item.id} item={item} />
                  </div>
                )
            })}</div>
          )
      }
    }
  });

module.exports = FollowList;