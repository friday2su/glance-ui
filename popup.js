// popup.js

// Browser API polyfill - ensure browser API is available
if (typeof browser === 'undefined' && typeof chrome !== 'undefined') {
  var browser = chrome;
}

document.addEventListener('DOMContentLoaded', function() {
  console.log('Glance UI popup loaded');
});