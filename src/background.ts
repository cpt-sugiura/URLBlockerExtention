let blockedUrls: string[] = [];

function updateBlockedUrls(urls: string[]) {
  blockedUrls = urls.map(url => new URL(url).hostname);
}

function init() {
  // Load the blocked URLs from storage
  browser.storage.local.get({blockedUrls: []}).then(function(result) {
    updateBlockedUrls(result.blockedUrls);
  });

  // Add a listener for changes to the blocked URLs
  browser.storage.onChanged.addListener(function(changes, area) {
    if (area === 'local' && changes.blockedUrls) {
      updateBlockedUrls(changes.blockedUrls.newValue);
    }
  });
}

// Listen for each tab update to check the URL
browser.tabs.onUpdated.addListener(function(tabId, changeInfo) {
  if (changeInfo.url) {
    const url = new URL(changeInfo.url);
    if (blockedUrls.includes(url.hostname)) {
      browser.tabs.executeScript(tabId, {
        code: `alert("このページはブロックされています。by /PhpStormProjects/_HOBBY/URLBlocker/vanilla/");`
      }).then(() => {
        browser.tabs.remove(tabId);
      });
    }
  }
});

init();
