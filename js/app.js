var gapiLoaded;

function load() {
  gapi.client.setApiKey('AIzaSyAFiqMW3gEMzwckXdJ14bkduSB_kDHWULM');
  gapi.client.load('youtube', 'v3', loaded);
}

function loaded() {
  gapiLoaded = true;
}

(function() {

  var module = angular.module('yt-playlister', []);

  module.controller('SearchCtrl', ['$scope', function($scope) {
    $scope.searchResults = null;
    $scope.nextPageToken = null;

    $scope.search = function(query, append) {
      var params = {}, request;
      if (!gapiLoaded || !query) return;

      params.q = query;
      params.part = 'snippet';
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
    }
  }]);

}());

