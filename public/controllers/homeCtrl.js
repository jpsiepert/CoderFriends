var app = angular.module("CoderFriends")

app.controller("homeCtrl", function($scope, githubService){

	$scope.getFriends = function(){
		debugger;
		githubService.getFollowing()
		.then(function(res){
			$scope.friends = res.data;
			console.log($scope.friends)
		})
	}

})