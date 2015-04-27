/** @jsx React.DOM */
var React = require('react');
var Followers = require('./Followers');
var Followings = require('./Followings');

var Result =
  React.createClass({
    render:function(){
      return  (
        <div className="row">
          <Followings />
          <Followers />
        </div>
        )
    }
  });
module.exports = Result;