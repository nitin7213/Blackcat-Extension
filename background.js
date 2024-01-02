// List of harmful websites to block
var harmfulWebsites = [
  "example.com",
  "harmfulwebsite.com",
  "malwarewebsite.com",
];

// Initialize a dictionary object to keep track of processed tabs
var processedTabs = {};

// This function runs when a tab is updated
function onTabUpdate(tabId, changeInfo, tab) {
  // Check if the tab has already been processed
  if (processedTabs[tabId]) {
    return;
  }

  // Add the tab to the processed list
  processedTabs[tabId] = true;

  // Check if the tab's URL matches a harmful website
  for (var i = 0; i < harmfulWebsites.length; i++) {
    if (tab.url.includes(harmfulWebsites[i])) {
      // Show the popup and block the tab
      chrome.browserAction.setPopup({ tabId: tabId, popup: "popup.html" });

      // Check if the blocked URL already has a URL parameter
      var blockedUrl = chrome.extension.getURL("blocked.html");
      if (!blockedUrl.includes("?")) {
        // Add the URL parameter to the blocked URL
        blockedUrl += "?url=" + encodeURIComponent(tab.url);
      }

      chrome.tabs.update(tabId, { url: blockedUrl });
      break;
    }
  }
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getTabId") {
    // Get the current tab ID and send it back to the popup
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      sendResponse({ tabId: tabs[0].id });
    });
    return true; // to indicate that we will send a response asynchronously
  }
});
// background.js

// ... (other code)

// Listen for messages from the content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "highlight") {
    // Highlight the specified element in the current tab
    chrome.tabs.highlight({ tabs: sender.tab.index }, () => {
      chrome.tabs.executeScript(sender.tab.id, {
        code: `document.querySelector('${message.selector}').style.backgroundColor = '${message.color}'`,
      });
    });
  } else if (message.action === "resetProcessedTabs") {
    // Reset processedTabs when the user goes back
    processedTabs = {};
  }
});

// ... (other code)

// Add a listener for tab updates
chrome.tabs.onUpdated.addListener(onTabUpdate);

// Listen for clicks on the extension icon
chrome.browserAction.onClicked.addListener(function (tab) {
  // Send a message to the content script to retrieve the blocked URL
  chrome.tabs.sendMessage(
    tab.id,
    { action: "getBlockedUrl" },
    function (response) {
      // Check if a blocked URL was found
      if (response && response.blockedUrl) {
        // Open the blocked URL in a new tab
        chrome.tabs.create({ url: response.blockedUrl });
      }
    }
  );
});
