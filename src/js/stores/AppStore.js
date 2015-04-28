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


var _followings = {list:[], ids:[], loading:false};
var _followers = {list:[], ids:[], loading:false};
// var _followersIds = [];
// var _followingsIds = [];


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
        _searchBar.firstUsername = action.firstUsername;
        _searchBar.secondUsername = action.secondUsername;
        break;
      case AppConstants.SEARCH_COMMON_SUCCESS:
        _searchBar.loading = false;
        _searchBar.errorMsg = "";
        _followers.list = action.data.followersList;
        _followings.list = action.data.followingsList;
        _followers.ids = action.data.followersIds;
        _followings.ids = action.data.followingsIds;
        break;
      case AppConstants.SEARCH_COMMON_FAILURE:

        _searchBar.loading = false;
        // _searchBar.errorMsg = action.error;
        _searchBar.errorMsg = "Error: User not exist";
        break;
      case AppConstants.VIEW_MORE:
        if (action.target === AppConstants.TARGET_FOLLOWINGS) {
          _followings.loading = true;
        } else if (action.target === AppConstants.TARGET_FOLLOERS) {
          _followers.loading = true;
        }
        break;

      case AppConstants.VIEW_MORE_SUCCESS:
        if (action.target === AppConstants.TARGET_FOLLOWINGS) {
          _followings.loading = false;
          _followings.list = _followings.list.concat(action.data);
        } else if (action.target === AppConstants.TARGET_FOLLOERS) {
          _followers.loading = false;
          _followers.list = _followers.list.concat(action.data);
        }
        break;

      case AppConstants.VIEW_MORE_FAILURE:
        if (action.target === AppConstants.TARGET_FOLLOWINGS) {
          _followings.loading = false;
        } else if (action.target === AppConstants.TARGET_FOLLOERS) {
          _followers.loading = false;
        }
        break;
      }
    AppStore.emitChange();

    return true;
  })
})

module.exports = AppStore;
