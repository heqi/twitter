var ApiClient = {
  search: function(firstUsername, secondUsername, success, failuer) {
    $.ajax({
    url: "/api/twitter/search",
    type: "get",
    data: {firstUsername:firstUsername, secondUsername:secondUsername},
    contentType: 'application/json; charset=utf-8',
    success: function(data){
      success(data);
    },
    error : function(jqXHR, textStatus, errorThrown){
      failuer(jqXHR.responseText);
    }});
  }
};

module.exports = ApiClient;