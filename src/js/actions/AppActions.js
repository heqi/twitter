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
   		}
   )
  }
}

module.exports = AppActions;
