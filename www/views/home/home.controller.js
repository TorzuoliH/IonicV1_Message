angular.module('messages').controller('HomeController', HomeController);

HomeController.$inject = ['$scope', '$state', '$firebaseArray', '$firebaseObject'];

function HomeController($scope, $state, $firebaseArray, $firebaseObject) {
	var me = this;

	////////////////
	// VARIABLES //
	////////////////
	me.list;

	////////////////
	// FUNCTIONS //
	////////////////
	me.init = init;
	me.markAsRead = markAsRead;
	me.open = open;
	me.goArchive = goArchive;

	function goArchive() {
		$state.go('archive');
	}

	function init() {
		var ref = firebase.database().ref().child("messages");

		me.list = $firebaseObject(ref);

		me.list.$bindTo($scope, "data").then(function() {
			console.log($scope.data);
		});
	}

	function markAsRead(messageId) {
		me.list[messageId].status = 'archive';
		me.list.$save();
	}

	function open(messageId) {
		me.list[messageId].status = 'open';
		me.list.$save();
	}

	init();

}
