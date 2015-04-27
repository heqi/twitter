/** @jsx React.DOM */
var React = require('react');

var SearchBarTxtInput =
  React.createClass({
    _onChange:function(event){
  		this.props.onChange(this.refs.txtInput.getDOMNode().value);
    },
    render:function(){
      return  (
      	<input type="text" 
        placeholder={this.props.placeholder}
      	value={this.props.value}
      	onChange={this._onChange}
      	ref="txtInput" 
        required/>
        )
    }
  });
module.exports = SearchBarTxtInput;