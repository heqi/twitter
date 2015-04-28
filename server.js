var gzippo = require('gzippo');
var express = require('express');
var morgan = require('morgan');
var app = express();
var async = require("async");

var Twitter = require('twitter');
var config = require('./config');
var client = new Twitter(config.twitter);

app.use(morgan('dev'));
app.use(gzippo.staticGzip("" + __dirname + "/dist"));

var twitterApi = function(url, params, callback, saveResult)
{
  client.get(url, params, function(error, tweets, response){
	  if (!error) {
	  	saveResult(tweets);
	    callback();
	  } else
	  {
	  	console.log(error);
	  	callback(error);
	  }
	});
}

var twitterFollowersIds = function(value, callback, saveResult)
{
	var url = 'followers/ids';
	var params = {screen_name:value};
	twitterApi(url, params, callback, saveResult);
}

var twitterFollowingsIds = function(value, callback, saveResult)
{
	var url = 'friends/ids';
	var params = {screen_name:value};
	twitterApi(url, params, callback, saveResult);
}

var twitterFollowersList = function(value, callback, saveResult)
{
	var url = 'followers/list';
	var params = {user_id:value};
	twitterApi(url, params, callback, saveResult);
}

var twitterFollowingsList = function(value, callback, saveResult)
{
	var url = 'friends/list';
	var params = {user_id:value};
	twitterApi(url, params, callback, saveResult);
}

var twitterUsersLookup = function(value, callback, saveResult)
{
	var url = 'users/lookup';
	var params = {user_id:value};
	twitterApi(url, params, callback, saveResult);
}

var compareArray = function(array1, array2) {
	var result = [];
	for (var i = 0; i < array1.length; i++) {
		var user1 = array1[i];
		for (var j = 0; j < array2.length; j++) {
			var user2 = array2[j];
			if (user1 == user2)
			{
				result.push(user1);				
			}
		}
	}
	return result;
}

var handleLookupParament = function(array) {
	var result = array.slice();
	if (array.length > 10) result = result.splice(0,10);
	result = result.join(",");
	return result;
}

app.get('/api/twitter/search',function(req, res) {
	var firstUsername = req.query.firstUsername;
	var secondUsername = req.query.secondUsername;
	var result = {};
	var tmpResult = {};

	if (firstUsername == null || secondUsername == null) {
		console.log("error:wrong params");
		res.status(500).send("error: user not exist");
	  return;
	}

	async.parallel([
    function(callback) {
   		twitterFollowersIds(firstUsername, callback, function(value) {tmpResult.firstFollowers = value;});
    },
    function(callback) {
    	twitterFollowersIds(secondUsername, callback, function(value) {tmpResult.secondFollowers = value;});
    },
    function(callback) {
   		twitterFollowingsIds(firstUsername, callback, function(value) {tmpResult.firstFollowings = value;});
    },
    function(callback) {
    	twitterFollowingsIds(secondUsername, callback, function(value) {tmpResult.secondFollowings = value;});
    }
	], function(err) {
	    if (err) return res.status(500).send(err);

	    if (
	    	tmpResult.firstFollowers == null ||
	    	tmpResult.secondFollowers == null ||
	    	tmpResult.firstFollowers.ids == null ||
	    	tmpResult.secondFollowers.ids == null ||
	    	tmpResult.firstFollowings == null ||
	    	tmpResult.secondFollowings == null ||
	    	tmpResult.firstFollowings.ids == null ||
	    	tmpResult.secondFollowings.ids == null) {
	    	console.log("error:wrong ids result");
	    	res.status(500).send("error: user not exist");
	    	return;
	    }


	    result.followersIds = compareArray(tmpResult.firstFollowers.ids, tmpResult.secondFollowers.ids);
	    result.followingsIds = compareArray(tmpResult.firstFollowings.ids, tmpResult.secondFollowings.ids);

	    async.parallel([
		    function(callback2) {
		   		twitterUsersLookup(handleLookupParament(result.followersIds), callback2, function(value) {result.followersList = value;});
		    },
		    function(callback2) {
		    	twitterUsersLookup(handleLookupParament(result.followingsIds), callback2, function(value) {result.followingsList = value;});
		    }
			], function(err) {
				if (err) return res.status(500).send(err);

				res.send(result);

			});
	});
})

app.get('/api/twitter/lookup_users',function(req, res) {
	console.log("lookup users");
	var params = req.query;
	var value = req.query.user_id;
	var url = 'users/lookup';
	// var params = {user_id:value};
  client.get(url, params, function(error, tweets, response){
	  if (!error) {
	  	res.send(tweets);
	  } else {
	  	res.status(500).send(err);
  }});
})


app.listen(process.env.PORT || 5000);
