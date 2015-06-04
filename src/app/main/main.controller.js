'use strict';

angular.module('lockWebapp')
	.controller('MainCtrl', function ($scope, $timeout) {
		var Resource = Parse.Object.extend("Resource");
		function updateIsDoorOpen () {
			var query = new Parse.Query(Resource);
			query.first().then(function (resource) {
				$timeout(function () {
					$scope.isDoorOpen = resource.get("isAvailable");
					$timeout(updateIsDoorOpen, 500);
				});
			});
		}
		updateIsDoorOpen();

		$scope.lockDoor = function () {
			var query = new Parse.Query(Resource);
			query.first().then(function (resource) {
				resource.set("isAvailable", false);
				resource.save();
			});
		}
	});
