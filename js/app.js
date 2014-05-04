(function() {
  'use strict';

  var module = angular.module('yt-playlister', []);

  module.factory('state', [function() {
    var state = {
      setCurrentVidId: function(id) {
        this.currentVidId = id;
      },
      getCurrentVidId: function() {
        return this.currentVidId;
      },
      currentVidId: null
    };

    return state;
  }]);

  module.controller('PlayerCtrl', ['$scope', '$sce', 'state', function($scope, $sce, state) {
    $scope.currentVid = function() {
      var vidId = state.getCurrentVidId();
      if (!vidId) return;
      return $sce.trustAsResourceUrl('http://www.youtube.com/v/' + vidId + '&version=3');
    };
  }]);

  module.controller('SearchCtrl', ['$scope', 'state', function($scope, state) {
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
      if (!$scope.query) return;
      $scope.search($scope.query, true);
    };

    $scope.addToPlaylist = function(id) {
      state.setCurrentVidId(id);
    };
  }]);

}());

