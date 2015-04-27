/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router-component');
var Template = require('./Template');

var Locations = Router.Locations;
var Location = Router.Location;

var Result = require('./result/Result.js');

var APP =
  React.createClass({
    render:function(){
      return (
        <Template>
          <Locations>
            <Location path="/" handler={Result} />
          </Locations>
        </Template>

        )
    }
  });
module.exports = APP;
