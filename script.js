// Listen for when the popup is loaded
document.addEventListener("DOMContentLoaded", function() {

    // Get references to the HTML elements
    const closeButton = document.getElementById("close-btn");
    const settingsButton = document.getElementById("settings");
    const viewSiteReportButton = document.getElementById("sidebar_view_site_report");
    const addUrlButton = document.getElementById("sidebar_get_help");

    // Add event listeners to the buttons
    closeButton.addEventListener("click", closePopup);
    settingsButton.addEventListener("click", openSettings);
    viewSiteReportButton.addEventListener("click", viewSiteReport);
    addUrlButton.addEventListener("click", addUrlToWhitelist);


    // Close the popup when the close button is clicked
    function closePopup() {
        window.close();
    }

    // Open the settings page when the settings button is clicked
    function openSettings() {
        chrome.runtime.openOptionsPage();
    }


    // Open the site report page when the view site report button is clicked
    function viewSiteReport() {
        window.location.href = "body/site_analysis.html";

    }

    // Add the current URL to the whitelist when the add URL button is clicked
    function addUrlToWhitelist() {
        window.location.href = "body/whitelist.html";
    }


    // Get references to the button and popup elements
    const openButton = document.getElementById("open-popup");
    const popup = document.querySelector(".popup");

    // Listen for the click event on the button
    openButton.addEventListener("click", () => {
        // Show the popup by changing its style display property
        popup.style.display = "block";
    });

});