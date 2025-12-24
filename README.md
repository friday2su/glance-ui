<p align="center">
  <img src="icons/icon128.png" alt="Glance UI Logo" width="128" height="128">
</p>

<p align="center">
  <a href="https://github.com/friday2su/glance-ui/releases"><img src="https://img.shields.io/github/v/release/friday2su/glance-ui?style=flat-square" alt="GitHub release (latest by date)"></a>
  <a href="https://github.com/friday2su/glance-ui/blob/main/LICENSE"><img src="https://img.shields.io/github/license/friday2su/glance-ui?style=flat-square" alt="GitHub License"></a>
  <img src="https://img.shields.io/github/downloads/friday2su/glance-ui/total?style=flat-square&color=blue" alt="Total Downloads">
  <img src="https://img.shields.io/github/repo-size/friday2su/glance-ui?style=flat-square" alt="Repo Size">
  <img src="https://img.shields.io/badge/manifest-v3-orange?style=flat-square" alt="Manifest V3">
  <img src="https://img.shields.io/badge/browser-chrome%20%7C%20firefox-blue?style=flat-square" alt="Supported Browsers">
</p>

<h1 align="center">Glance UI</h1>

<p align="center">
  <strong>Modern Link Previewing for Enhanced Browsing</strong>
</p>

<p align="center">
  Preview links instantly without losing your place. Glance UI provides a seamless, secure, and intuitive modal experience for exploring content through elegant drag-and-drop interactions.
</p>

<p align="center">
  <a href="https://raw.githubusercontent.com/friday2su/glance-ui/main/assets/demo.mp4">
    <img src="https://img.shields.io/badge/Demo-Video-blue?style=for-the-badge&logo=video" alt="Demo Video" style="max-width: 800px;">
  </a>
</p>

<br>

## Overview

Glance UI transforms your browsing experience by enabling contextual link previews that maintain your workflow. Whether you're researching, reading, or exploring the web, Glance UI lets you "peek" at links without disrupting your current context. With cross-browser compatibility and a focus on security and performance, Glance UI delivers a fluid and safe browsing enhancement.

## Key Features

*   **Intuitive Drag & Drop**: Effortlessly preview links by dragging them to the dedicated drop zone - no accidental triggers, just intentional previews.
*   **Elegant Modal Design**: Immerse yourself in content with our sleek dark-themed modal featuring smooth animations and refined UI elements.
*   **Cross-Browser Support**: Fully compatible with Chrome and Firefox, ensuring a consistent experience across your preferred browsers.
*   **Smart Controls**: Convenient circular control buttons positioned outside the modal for easy access to close and open-in-tab functions.
*   **Customizable Settings**: Tailor the experience with adjustable modal width and animation preferences via the options panel.
*   **Extension Toggle**: Easily enable or disable the extension via the toggle switch in the popup menu.
*   **GitHub Support**: Show your support by starring the project on GitHub directly from the options page.
*   **Responsive Design**: Adapts seamlessly to different screen sizes while maintaining optimal viewing experience.
*   **Privacy Focused**: All functionality runs locally with no external tracking or data collection.
*   **Lightweight**: Minimal resource usage with efficient code that activates only when needed.

## Installation

### Firefox (Manual Install)

> **Note**: As this is an unsigned extension, you will need to use Firefox Developer Edition / Nightly to install it permanently.

1.  Type `about:config` in the address bar and accept the risk.
2.  Search for `xpinstall.signatures.required`.
3.  Toggle the value to `false`.
4.  Download `glance-ui-firefox.xpi` from the [Releases](https://github.com/friday2su/glance-ui/releases) page.
5.  Go to `about:addons`.
6.  Click on the cogwheel and select "Install Add-on From File...".
7.  Select the downloaded `.xpi` file.

### Chrome / Edge / Brave (From Release)

1.  Navigate to the [Releases](https://github.com/friday2su/glance-ui/releases) page.
2.  Download the `extension.zip` asset from the latest version.
3.  Extract the archive to a preferred location.
4.  Open your browser's extensions page (`chrome://extensions` or `edge://extensions`).
5.  Enable **Developer mode** in the top right corner.
6.  Select **Load unpacked** and choose the extracted folder.

### Chrome / Edge / Brave (From Source)

1.  Navigate to your browser's extensions page (`chrome://extensions` or `edge://extensions`)
2.  Enable **Developer mode** in the top right corner
3.  Select **Load unpacked** and choose the extension directory
4.  The extension will be installed and ready to use

### Firefox (From Source)

> **Note**: Firefox requires version 109+ for full Manifest V3 support

1.  Open Firefox and navigate to `about:debugging`
2.  Select "This Firefox" or "Extensions"
3.  Click "Load Temporary Add-on"
4.  Select the extension directory

### From Source (All Browsers)

1.  Clone or download this repository
2.  Follow the respective browser instructions above, selecting the repository directory

## Usage

### Drag & Drop Preview

1. Navigate to any webpage with links
2. Drag any link element to the "Drop Here to Glance UI" target that appears at the bottom of the page
3. The link will open in a sleek modal overlay without leaving your current page
4. Use the control buttons to close the modal or open the link in a new tab
5. Alternatively, press `Escape` or click outside the modal to close

### Customization

1. Click the extension icon in your browser toolbar
2. Navigate to the options page
3. Adjust settings like modal width and animation preferences
4. Click "Save Settings" to apply your changes

## Development

### Prerequisites

*   Modern browser with extension development support
*   Basic understanding of JavaScript and CSS
*   Node.js 18+
*   npm package manager

### Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/friday2su/glance-ui.git
    cd glance-ui
    ```

2. Follow the installation instructions above to load the extension

### Packaging

To generate a production-ready extension package:

```bash
# Package the extension using npm script
npm run pack
```

This command produces an optimized `extension.zip` in the project root, excluding development files. The resulting package can be uploaded directly to browser extension stores.

Alternatively, you can manually compress the directory contents, ensuring to exclude unnecessary files like README.md, test.html, and generate_icons.html.

### Architecture

*   `manifest.json` - Extension configuration and permissions
*   `content.js` - Core functionality for link previews
*   `content.css` - Styling for modals and UI elements
*   `background.js` - Extension lifecycle management
*   `popup.html/js` - Toolbar popup interface
*   `options.html/js` - Settings and preferences panel

## License

[MIT](LICENSE) © 2025