var AppDispatcher = require('../dispatchers/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var merge = require('react/lib/merge');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = "change";

var _searchBar = {
    firstUsername: '',
    secondUsername: '',
    loading: false,
    errorMsg: ''
  }


var _followings = [];
var _followers = [];


var AppStore = merge(EventEmitter.prototype, {
  emitChange:function(){
    this.emit(CHANGE_EVENT)
  },
  addChangeListener:function(callback){
    this.on(CHANGE_EVENT, callback)
  },

  removeChangeListener:function(callback){
    this.removeListener(CHANGE_EVENT, callback)
  },

  getSearchBar:function() {
    return _searchBar;
  },

  getFollowers:function() {
    return _followers;
  },

  getFollowings:function() {
    return _followings;
  },

  dispatcherIndex:AppDispatcher.register(function(payload){
    var action = payload.action;

    switch(action.actionType){
      case AppConstants.SEARCH_COMMON:
        _searchBar.loading = true;
        _searchBar.firstUsername = payload.action.firstUsername;
        _searchBar.secondUsername = payload.action.secondUsername;
        break;
      case AppConstants.SEARCH_COMMON_SUCCESS:
        _searchBar.loading = false;
        _searchBar.errorMsg = "";
        _followers = payload.action.data.followersList;
        _followings = payload.action.data.followingsList;
        break;
      case AppConstants.SEARCH_COMMON_FAILURE:

        _searchBar.loading = false;
        // _searchBar.errorMsg = action.error;
        _searchBar.errorMsg = "Error: User not exist";
        break;
      }
    AppStore.emitChange();

    return true;
  })
})

module.exports = AppStore;
