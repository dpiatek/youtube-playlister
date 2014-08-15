var gapiLoaded;
var player;
var iframeApiLoaded;

function load() {
  gapi.client.setApiKey(YT_PL_KEY);
  gapi.client.load('youtube', 'v3', loaded);
}

function loaded() {
  gapiLoaded = true;
}

function onYouTubeIframeAPIReady() {
  iframeApiLoaded = true;
}
