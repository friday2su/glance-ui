// background.js
console.log('Glance UI background service worker loaded');

// Browser API polyfill - ensure browser API is available
if (typeof browser === 'undefined' && typeof chrome !== 'undefined') {
  var browser = chrome;
}

// Listen for installation event to perform one-time setup
browser.runtime.onInstalled.addListener(() => {
  console.log('Glance UI extension installed');
});

// Listen for extension icon click
if (browser.action) {
  browser.action.onClicked.addListener((tab) => {
    console.log('Glance UI extension icon clicked');
  });
} else if (browser.browserAction) {
  browser.browserAction.onClicked.addListener((tab) => {
    console.log('Glance UI extension icon clicked');
  });
}