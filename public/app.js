var app = angular.module("CoderFriends", ["ngRoute"])

app.config(function($routeProvider){
	$routeProvider
	.when("/", {
		templateUrl: "templates/main.html"
	}).when("/home", {
		templateUrl: "templates/home.html",
		controller: "homeCtrl"
	}).when("/friend/:github_username", {
		templateUrl: "templates/friend.html"
	}).otherwise("/")

})
