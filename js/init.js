var gapiLoaded;

function load() {
  gapi.client.setApiKey('AIzaSyAFiqMW3gEMzwckXdJ14bkduSB_kDHWULM');
  gapi.client.load('youtube', 'v3', loaded);
}

function loaded() {
  gapiLoaded = true;
}
