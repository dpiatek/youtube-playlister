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
    $scope.response = {};

    $scope.search = function(query) {
      if (!gapiLoaded) return;
      var request = gapi.client.youtube.search.list({
        q: query,
        part: 'snippet'
      });

      request.execute(function(response) {
        $scope.response = response;
        $scope.$apply();
      });
    };
  }]);

}());

