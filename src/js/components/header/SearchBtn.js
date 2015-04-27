/** @jsx React.DOM */
var React = require('react');

var SearchBtn =
  React.createClass({
    _onSearch:function(e){
      this.props.onSearch(e);
    },
    render:function(){
      if (this.props.loading) {
        return (<button className="btn btn-primary disabled">Searching</button>) ;
      } else
      {
        return (<button className="btn btn-primary">Search</button>);
      }
    }
  });
module.exports = SearchBtn;