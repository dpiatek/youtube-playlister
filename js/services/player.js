(function () {
  'use strict';

  var module = angular.module('player', []);

  module.factory('player', ['playlist', function(playlist) {
    var iframePlayer, currentIndex;

    var player = {
      load: function(id, index) {
        if (!id || !iframeApiLoaded) return;

        currentIndex = index;

        if (iframePlayer) {
          iframePlayer.pauseVideo();
          iframePlayer.loadVideoById(id);
          return;
        }

        iframePlayer = new YT.Player('player', {
          height: '360',
          width: '480',
          videoId: id,
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onStateChange
          }
        });

        function onPlayerReady(event) {
          event.target.playVideo();
        }

        function onStateChange(event) {
          var nextIndex = currentIndex + 1;
          var nextTrack = playlist.getTrack(nextIndex);

          if (event.data === YT.PlayerState.ENDED && nextTrack) {
            currentIndex = nextIndex;
            iframePlayer.loadVideoById(nextTrack.id);
          }
        }
      },
      currentVidId: null
    };

    return player;
  }]);

})();
