(function () {
  'use strict';

  var module = angular.module('yt-playlister');

  module.factory('player', ['playlist', function(playlist) {
    var iframePlayer;

    var player = {
      load: function(id, index) {
        if (!id || !iframeApiLoaded) return;

        player.currentIndex = index;

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
          var nextIndex = player.currentIndex + 1;
          var nextTrack = playlist.getTrack(nextIndex);

          if (event.data === YT.PlayerState.ENDED && nextTrack) {
            player.currentIndex = nextIndex;
            iframePlayer.loadVideoById(nextTrack.id);
          }
        }
      },
      currentIndex: null,
      currentVidId: null
    };

    return player;
  }]);

})();
