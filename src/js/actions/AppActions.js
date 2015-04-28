var AppConstants = require('../constants/AppConstants');
var AppDispatcher = require('../dispatchers/AppDispatcher');
var ApiClient = require('../api/ApiClient');

var AppActions = {
  serachCommon:function(firstUsername, secondUsername)
  {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.SEARCH_COMMON,
      firstUsername: firstUsername,
      secondUsername: secondUsername
    })

    ApiClient.search(firstUsername, secondUsername, function(data) {
	    	AppDispatcher.handleViewAction({
		      actionType: AppConstants.SEARCH_COMMON_SUCCESS,
		      data: data
		    })
   		}.bind(this), function(error) {
   			AppDispatcher.handleViewAction({
		      actionType: AppConstants.SEARCH_COMMON_FAILURE,
		      error: error
		    })
   		}.bind(this)
    )
  },
  viewMoreFollow:function(list, ids, target) {
    if (ids.length <= list.length) {
      return;
    }
    AppDispatcher.handleViewAction({
      actionType: AppConstants.VIEW_MORE,
      target: target
    })

    var index = list.length;
    var howmany = ids.length - list.length;
    if (howmany > 10) howmany = 10;

    var idStr = ids.slice();
    idStr = idStr.splice(index, howmany);
    idStr = idStr.join(",");

    ApiClient.lookupUsers(idStr, function(data) {
        AppDispatcher.handleViewAction({
          actionType: AppConstants.VIEW_MORE_SUCCESS,
          target: target,
          data: data
        })
      }.bind(this), function(error) {
        AppDispatcher.handleViewAction({
          actionType: AppConstants.VIEW_MORE_FAILURE,
          target: target,
          error: error
        })
      }.bind(this)
    )
  }

}

module.exports = AppActions;
