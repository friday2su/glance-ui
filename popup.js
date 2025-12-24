// popup.js

// Browser API polyfill - ensure browser API is available
if (typeof browser === 'undefined' && typeof chrome !== 'undefined') {
  var browser = chrome;
}

document.addEventListener('DOMContentLoaded', function() {
  console.log('Glance UI popup loaded');
  
  const extensionToggle = document.getElementById('extensionToggle');
  
  // Load the current state
  if (typeof browser !== 'undefined' && browser.storage) {
    browser.storage.sync.get({
      popLinksEnabled: true  // Default to enabled
    }).then(function(items) {
      // Set the toggle state based on stored value
      extensionToggle.checked = items.popLinksEnabled;
      
      // Add event listener to update the setting when toggle changes
      extensionToggle.addEventListener('change', function() {
        browser.storage.sync.set({
          popLinksEnabled: this.checked
        }).then(function() {
          console.log('Extension enabled state saved:', this.checked);
        }).catch(function(error) {
          console.error('Error saving settings:', error);
        });
      });
    }).catch(function(error) {
      console.error('Error loading settings:', error);
      // Default to enabled if there's an error
      extensionToggle.checked = true;
      
      // Add event listener even when storage fails
      extensionToggle.addEventListener('change', function() {
        browser.storage.sync.set({
          popLinksEnabled: this.checked
        }).then(function() {
          console.log('Extension enabled state saved:', this.checked);
        }).catch(function(error) {
          console.error('Error saving settings:', error);
        });
      });
    });
  }
});