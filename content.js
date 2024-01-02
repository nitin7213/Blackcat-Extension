// content.js

// ... (other code)

// Get the "Go back" button element
const goBackButton = document.getElementById("site_status_block_page_go_back");

// Add a click event listener to the button
goBackButton.addEventListener("click", () => {
  history.go(-2); // Go back two URLs in browser history

  // Inform the background script to reset processedTabs
  chrome.runtime.sendMessage({ action: "resetProcessedTabs" });
});

// ... (other code)
