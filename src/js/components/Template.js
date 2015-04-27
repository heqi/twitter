/** @jsx React.DOM */
var React = require('react');
var SearchBar = require('./header/SearchBar');

var Template =
  React.createClass({
    render:function(){
      return  (
        <div className="container">
        	<SearchBar />
          {this.props.children}
        </div>
        )
    }
  });
module.exports = Template;
