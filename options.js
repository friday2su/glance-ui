// options.js

// Browser API polyfill - ensure browser API is available
if (typeof browser === 'undefined' && typeof chrome !== 'undefined') {
  var browser = chrome;
}

document.addEventListener('DOMContentLoaded', function() {
  const enablePopLinks = document.getElementById('enablePopLinks');
  const showAnimations = document.getElementById('showAnimations');
  const modalWidth = document.getElementById('modalWidth');
  const saveBtn = document.getElementById('saveBtn');
  const statusDiv = document.getElementById('status');

  // Load saved options
  browser.storage.sync.get({
    popLinksEnabled: true,
    animationsEnabled: true,
    modalWidth: '85'
  }).then(function(items) {
    enablePopLinks.checked = items.popLinksEnabled;
    showAnimations.checked = items.animationsEnabled;
    // Set default to 85 if no value is stored
    modalWidth.value = items.modalWidth || '85';
  }).catch(function(error) {
    console.error('Error loading options:', error);
  });

  // Save options
  saveBtn.addEventListener('click', function() {
    browser.storage.sync.set({
      popLinksEnabled: enablePopLinks.checked,
      animationsEnabled: showAnimations.checked,
      modalWidth: modalWidth.value
    }).then(function() {
      // Show success message
      statusDiv.textContent = 'Settings saved successfully!';
      statusDiv.className = 'status success';
      statusDiv.style.display = 'block';
      
      // Hide message after 3 seconds
      setTimeout(function() {
        statusDiv.style.display = 'none';
      }, 3000);
    }).catch(function(error) {
      console.error('Error saving options:', error);
      statusDiv.textContent = 'Error saving settings';
      statusDiv.className = 'status error';
      statusDiv.style.display = 'block';
      setTimeout(function() {
        statusDiv.style.display = 'none';
      }, 3000);
    });
  });
});