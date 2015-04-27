/** @jsx React.DOM */
var React = require('react');
var AppActions = require('../../actions/AppActions');

var AppStore = require('../../stores/AppStore');
var StoreWatchMixin = require('../../mixins/StoreWatchMixin');
var SearchBarTxtInput = require('./SearchBarTxtInput');
var SearchBtn = require('./SearchBtn');
var ErrorMsg = require('./ErrorMsg')

function getSearchBar() {
  return AppStore.getSearchBar();
}

var SearchBar =
  React.createClass({
    mixins:[StoreWatchMixin(getSearchBar)],
    _onSearch:function(e){
      e.preventDefault();
      AppActions.serachCommon(this.state.firstUsername, this.state.secondUsername);
    },
    _onChangeFirstUsername:function(value){
      this.setState({firstUsername: value});
    },
    _onChangeSecondUsername:function(value){
      this.setState({secondUsername: value});
    },
    render:function(){
      return  (
        <div>
          <div className="searchBar">
            <h2>Search Common Twitter</h2>
            <form onSubmit={this._onSearch}>
              <SearchBarTxtInput
                placeholder="First Twitter"
                onChange={this._onChangeFirstUsername}
                value={this.state.firstUsername}/>
              <SearchBarTxtInput
                placeholder="Second Twitter"
                onChange={this._onChangeSecondUsername}
                value={this.state.secondUsername}/>
              <SearchBtn 
                onSearch={this._onSearch}
                loading={this.state.loading} />
            </form>
          </div>
          <ErrorMsg errorMsg={this.state.errorMsg} />
        </div>
        )
    }
  });
module.exports = SearchBar;
