(function () {
  'use strict';

  var module = angular.module('SearchCtrl', []);

  module.controller('SearchCtrl', ['$scope', 'playlist', function($scope, playlist) {
    $scope.searchResults = null;
    $scope.nextPageToken = null;

    $scope.search = function(query, append) {
      var params = {}, request;
      if (!gapiLoaded || !query) return;

      params.q = query;
      params.part = 'snippet';
      params.type = 'video';
      if ($scope.nextPageToken) params.pageToken = $scope.nextPageToken;

      request = gapi.client.youtube.search.list(params);

      request.execute(function(response) {
        if (append) {
          $scope.searchResults = $scope.searchResults.concat(response.items);
        } else {
          $scope.searchResults = response.items;
        }

        $scope.nextPageToken = response.nextPageToken;
        $scope.$apply();
      });
    };

    $scope.loadMore = function() {
      if ($scope.query) {
        $scope.search($scope.query, true);
      }
    };

    $scope.addToPlaylist = function(id, title) {
      playlist.addTrack(id, title);
    };
  }]);

})();
