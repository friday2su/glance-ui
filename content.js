// content.js
(function() {
  'use strict';

  // Browser API polyfill - ensure browser API is available
  if (typeof browser === 'undefined' && typeof chrome !== 'undefined') {
    var browser = chrome;
  }

  let popLinkModal = null;
  let popLinkOverlay = null;
  let currentIframe = null;
  let dragTarget = null;
  let currentDraggedUrl = null;
  let settings = {
    popLinksEnabled: true,
    animationsEnabled: true,
    modalWidth: '85'
  };

  // Load settings from storage
  if (typeof browser !== 'undefined' && browser.storage) {
    browser.storage.sync.get({
      popLinksEnabled: true,
      animationsEnabled: true,
      modalWidth: '85'
    }).then(function(items) {
      settings = items;
    }).catch(function(error) {
      console.error('Error loading settings:', error);
    });
    
    // Listen for changes to settings
    if (browser.storage.onChanged) {
      browser.storage.onChanged.addListener(function(changes, namespace) {
        for (let key in changes) {
          if (settings.hasOwnProperty(key)) {
            settings[key] = changes[key].newValue;
          }
        }
      });
    }
  }

  // Drag and drop functionality
  // Add dragstart event listener to all links
  document.addEventListener('dragstart', function(event) {
    if (event.target.tagName === 'A' && event.target.href) {
      currentDraggedUrl = event.target.href;
      showDragTarget();
    }
  });

  // Show the drag target when a link is being dragged
  function showDragTarget() {
    if (!dragTarget) {
      createDragTarget();
    }
    dragTarget.classList.add('active');
  }

  // Hide the drag target
  function hideDragTarget() {
    if (dragTarget) {
      dragTarget.classList.remove('active');
    }
  }

  // Create the drag target element
  function createDragTarget() {
    dragTarget = document.createElement('div');
    dragTarget.className = 'glance-ui-drag-target';
    dragTarget.textContent = 'Drop Here to Glance UI';
    
    // Add drag and drop event listeners
    dragTarget.addEventListener('dragover', function(event) {
      event.preventDefault();
      dragTarget.classList.add('drag-over');
    });
    
    dragTarget.addEventListener('dragleave', function(event) {
      dragTarget.classList.remove('drag-over');
    });
    
    dragTarget.addEventListener('drop', function(event) {
      event.preventDefault();
      dragTarget.classList.remove('drag-over');
      
      if (currentDraggedUrl) {
        const linkText = 'Dragged Link';
        showPopLinkModal(currentDraggedUrl, linkText);
        currentDraggedUrl = null;
      }
      
      hideDragTarget();
    });
    
    document.body.appendChild(dragTarget);
  }

  // Add global drag and drop event listeners
  document.addEventListener('dragover', function(event) {
    // Keep the drag target visible while dragging
    if (dragTarget && dragTarget.classList.contains('active')) {
      // Check if we're near the drag target
      const rect = dragTarget.getBoundingClientRect();
      const isNearTarget = (
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom
      );
      
      if (!isNearTarget) {
        dragTarget.classList.remove('drag-over');
      }
    }
  });

  document.addEventListener('dragend', function(event) {
    // Clean up after drag ends
    setTimeout(() => {
      hideDragTarget();
      currentDraggedUrl = null;
    }, 300);
  });

  function showPopLinkModal(url, title) {
    // Remove existing modal if present
    if (popLinkModal) {
      document.body.removeChild(popLinkModal);
    }
    
    if (popLinkOverlay) {
      document.body.removeChild(popLinkOverlay);
    }
    
    // Remove existing controls if present
    const existingControls = document.querySelector('.glance-ui-pop-link-controls');
    if (existingControls) {
      document.body.removeChild(existingControls);
    }
    
    // Create overlay
    popLinkOverlay = document.createElement('div');
    popLinkOverlay.className = 'glance-ui-pop-link-overlay';
    document.body.appendChild(popLinkOverlay);
    
    // Create modal container
    popLinkModal = document.createElement('div');
    popLinkModal.className = 'glance-ui-pop-link-modal';
    
    // Apply width from settings (adjust for new size)
    const widthValue = settings.modalWidth || '85';
    popLinkModal.style.width = (parseInt(widthValue) - 5) + 'vw'; // Adjust for new size
    
    // Create iframe for the content
    currentIframe = document.createElement('iframe');
    currentIframe.src = url;
    currentIframe.style.display = 'none'; // Hide until loaded
    
    // Add error listener for iframe loading issues
    currentIframe.addEventListener('error', function() {
      // If there's an error loading the iframe, show an error message
      console.error('Failed to load iframe:', url);
      
      // Remove the failed iframe
      if (currentIframe && currentIframe.parentNode) {
        currentIframe.parentNode.removeChild(currentIframe);
      }
      
      // Create an error message element
      const errorDiv = document.createElement('div');
      errorDiv.style.display = 'flex';
      errorDiv.style.flexDirection = 'column';
      errorDiv.style.alignItems = 'center';
      errorDiv.style.justifyContent = 'center';
      errorDiv.style.height = '100%';
      errorDiv.style.color = '#ffffff';
      errorDiv.style.fontSize = '16px';
      errorDiv.style.textAlign = 'center';
      errorDiv.style.padding = '20px';
      errorDiv.style.backgroundColor = '#1a1a1a';
      errorDiv.innerHTML = `
        <div>
          <h3 style="margin: 0 0 10px 0; color: #ff6b6b;">Unable to load this page</h3>
          <p style="margin: 0 0 15px 0;">This page cannot be displayed in a frame due to security restrictions.</p>
          <button id="openInTabBtn" style="
            background-color: #3498db;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
          ">Open in New Tab</button>
        </div>
      `;
      
      // Add the error message to the modal
      popLinkModal.appendChild(errorDiv);
      
      // Add click event to the button
      document.getElementById('openInTabBtn').addEventListener('click', function() {
        window.open(url, '_blank');
        hidePopLinkModal();
      });
    });
    
    // Add load listener to show iframe after loading
    currentIframe.addEventListener('load', function() {
      try {
        // Check if we can access the iframe content (this will fail for cross-origin content)
        const iframeDocument = currentIframe.contentDocument || currentIframe.contentWindow.document;
        
        // Add a small delay to ensure content is rendered
        setTimeout(() => {
          currentIframe.style.display = 'block';
          popLinkModal.classList.add('iframe-loaded');
        }, 100);
      } catch (e) {
        // If we can't access the content, it's likely a cross-origin restriction
        // The iframe will still be displayed but with potential limitations
        setTimeout(() => {
          currentIframe.style.display = 'block';
          popLinkModal.classList.add('iframe-loaded');
        }, 100);
      }
    });
    
    // Assemble modal
    popLinkModal.appendChild(currentIframe);
    
    // Create controls container (at top right of the modal)
    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'glance-ui-pop-link-controls';
    
    // Create open in new tab button with SVG icon (placed first in DOM so it appears on top due to flex-direction: column-reverse)
    const openBtn = document.createElement('button');
    openBtn.className = 'glance-ui-pop-link-control-btn';
    openBtn.title = 'Open in new tab';
    openBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M384 224v184a40 40 0 0 1-40 40H104a40 40 0 0 1-40-40V168a40 40 0 0 1 40-40h167.48M336 64h112v112M224 288L440 72"/></svg>';
    openBtn.addEventListener('click', function() {
      window.open(url, '_blank');
      hidePopLinkModal();
    });
    
    // Create close button with SVG icon
    const closeBtn = document.createElement('button');
    closeBtn.className = 'glance-ui-pop-link-control-btn';
    closeBtn.title = 'Close';
    closeBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"/></svg>';
    closeBtn.addEventListener('click', hidePopLinkModal);
    
    // Add buttons to controls container (open button first so it appears on top)
    controlsContainer.appendChild(openBtn);
    controlsContainer.appendChild(closeBtn);
    
    // Add close functionality when clicking overlay
    popLinkOverlay.addEventListener('click', hidePopLinkModal);
    
    // Prevent closing when clicking inside modal
    popLinkModal.addEventListener('click', function(e) {
      e.stopPropagation();
    });
    
    // Add to document
    document.body.appendChild(popLinkModal);
    document.body.appendChild(controlsContainer);
    
    // Position the controls relative to the modal after it's added to the DOM
    setTimeout(() => {
      const modalRect = popLinkModal.getBoundingClientRect();
      // Position controls at top right of modal with some offset, further outside the modal
      controlsContainer.style.top = (modalRect.top + 10) + 'px';
      controlsContainer.style.right = (window.innerWidth - modalRect.right - 60) + 'px'; // Increased offset to position further outside
      controlsContainer.style.position = 'fixed';
    }, 10);
    
    // Add class to body to prevent scrolling
    document.body.classList.add('glance-ui-modal-open');
  }

  function hidePopLinkModal() {
    if (popLinkModal) {
      // Add smooth fade out effect
      popLinkModal.style.opacity = '0';
      popLinkModal.style.transform = 'translate(-50%, -50%) scale(0.95)';
      
      // Remove elements after animation
      setTimeout(() => {
        document.body.removeChild(popLinkModal);
        popLinkModal = null;
      }, 150);
    }
    
    if (popLinkOverlay) {
      // Add smooth fade out effect
      popLinkOverlay.style.opacity = '0';
      
      setTimeout(() => {
        document.body.removeChild(popLinkOverlay);
        popLinkOverlay = null;
      }, 150);
    }
    
    // Remove controls container
    const controlsContainer = document.querySelector('.glance-ui-pop-link-controls');
    if (controlsContainer) {
      controlsContainer.style.opacity = '0';
      controlsContainer.style.transform = 'translateY(-50%) scale(0.9)';
      
      setTimeout(() => {
        const actualContainer = document.querySelector('.glance-ui-pop-link-controls');
        if (actualContainer) {
          document.body.removeChild(actualContainer);
        }
      }, 150);
    }
    
    if (currentIframe) {
      currentIframe = null;
    }
    
    // Remove class from body to re-enable scrolling
    document.body.classList.remove('glance-ui-modal-open');
  }

  // Allow closing with Escape key
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && popLinkModal) {
      hidePopLinkModal();
    }
  });

  console.log('Glance UI content script loaded');
})();