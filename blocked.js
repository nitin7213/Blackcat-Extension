// Get the blocked URL parameter from the query string
var urlParams = new URLSearchParams(window.location.search);
var blockedUrl = urlParams.get("url");

// Display the blocked URL on the page
document.getElementById("blocked-url").textContent = blockedUrl;

// blocked.js

// Get the "Go back" button element
const goBackButton = document.getElementById("site_status_block_page_go_back");

// Add a click event listener to the button
goBackButton.addEventListener("click", () => {
  history.go(-2); // Go back two URLs in browser history

  // Inform the background script to reset processedTabs
  chrome.runtime.sendMessage({ action: "resetProcessedTabs" });
});

// Get the "Visit Anyway" button element
const visitAnywayButton = document.getElementById("visit_anyway_button");

// Add a click event listener to the button
visitAnywayButton.addEventListener("click", () => {
  window.location.replace("https://www.example.com"); // Replace current URL with example.com
});
