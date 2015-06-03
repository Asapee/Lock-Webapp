'use strict';

angular.module('lockWebapp')
	.controller('MainCtrl', function ($scope, $timeout) {
		$scope.isLoading = false;

		$scope.$watch("lockCode", function (newLockCode) {
			if (newLockCode && newLockCode.length === 4) {
				$scope.isLoading = true;
				Parse.Cloud.run('unlock', { keyCode: newLockCode }, {
					success: function() {
						// wrap code in a $timeout so that $digest runs
						$timeout(function () {
							$scope.lockCode = "";
							$scope.isLocked = false;
							$scope.isLoading = false;
						});
					},
					error: function() {
						$timeout(function () {
							$scope.isLocked = true;
							$scope.isLoading = false;
						});
					}
				});
			}
		});

		$scope.unlock = function () {
			$scope.isLocked = true;
		}
	});
