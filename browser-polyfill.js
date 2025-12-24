(function (global, factory) {
  if (typeof exports !== 'undefined') {
    factory(exports);
  } else {
    factory(global.browser = global.browser || {});
  }
})(this, function (exports) {
  if (typeof browser === 'undefined' || Object.getPrototypeOf(browser) !== Object.prototype) {
    const CHROME_API_NAMES = [
      'alarms',
      'bookmarks',
      'browserAction',
      'commands',
      'contextMenus',
      'cookies',
      'devtools',
      'downloads',
      'extension',
      'extensionTypes',
      'history',
      'i18n',
      'idle',
      'management',
      'notifications',
      'pageAction',
      'runtime',
      'storage',
      'tabs',
      'webNavigation',
      'webRequest',
      'windows',
    ];

    const CHROME_EVENT_API_NAMES = [
      'webRequest'
    ];

    if (typeof chrome !== 'undefined') {
      const apiCache = {};

      for (const apiName of CHROME_API_NAMES) {
        if (apiName in chrome) {
          if (CHROME_EVENT_API_NAMES.includes(apiName)) {
            apiCache[apiName] = chrome[apiName];
          } else {
            const descriptors = Object.getOwnPropertyDescriptors(chrome[apiName]);
            const cache = Object.create(null);

            for (const [propName, descriptor] of Object.entries(descriptors)) {
              if (typeof descriptor.value === 'function') {
                cache[propName] = (...args) => {
                  return new Promise((resolve, reject) => {
                    chrome[apiName][propName](...args, (result) => {
                      if (chrome.runtime.lastError) {
                        reject(chrome.runtime.lastError);
                      } else {
                        resolve(result);
                      }
                    });
                  });
                };
              } else {
                cache[propName] = chrome[apiName][propName];
              }
            }

            apiCache[apiName] = cache;
          }
        }
      }

      Object.assign(global.browser, apiCache);

      global.browser.runtime = global.browser.runtime || {};
      global.browser.runtime.getURL = global.browser.runtime.getURL || chrome.runtime.getURL.bind(chrome.runtime);
    }
  }
});