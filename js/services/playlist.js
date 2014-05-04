(function () {
  'use strict';

  var module = angular.module('playlist', []);

  module.factory('playlist', [function(){
    var playlist = {
      tracks: [],
      addTrack: function(id, title) {
        return playlist.tracks.push({
          id: id,
          title: title
        });
      },
      getTrack: function(index) {
        return (playlist.tracks[index] || null);
      }
    };

    return playlist;
  }]);

})();



