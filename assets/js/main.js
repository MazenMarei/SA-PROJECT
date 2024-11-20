// tabs
document.addEventListener("DOMContentLoaded", function () {
  // Get all the tab buttons
    const tabs = document.querySelectorAll('.tabs .tab');

  // Add event listeners to each tab
    tabs.forEach(tab => {
    tab.addEventListener('click', function () {
      // Get the target tab content ID from the clicked tab's data attribute
        const targetContentId = tab.getAttribute('data-tab-target');
      // Remove the 'active' class from all tabs and tab contents
        tabs.forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content > div').forEach(content => content.classList.remove('active'));
      // Add the 'active' class to the clicked tab and the corresponding tab content
        tab.classList.add('active');
        document.querySelector(targetContentId).classList.add('active');
    });
});
});