/** @jsx React.DOM */
var React = require('react');

var ErrorMsg =
  React.createClass({
    render:function(){
      if (this.props.errorMsg == "") {
        return (<div></div>)
      } else {
        return (
          <div className="errorMsg alert alert-danger">{this.props.errorMsg}</div>
        ) 
      }
    }
  });
module.exports = ErrorMsg;