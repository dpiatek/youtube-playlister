(function () {
  'use strict';

  var module = angular.module('yt-playlister');

  module.controller('PlaylistCtrl', ['$scope', 'playlist', 'player', function($scope, playlist, player) {
    $scope.playlist = playlist.tracks;

    $scope.playVideo = function(id, index) {
      player.load(id, index);
    };

  }]);

})();
