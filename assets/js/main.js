// TABS CHANGING
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

// FADE UP ANIMATION
const fadeUpElements = document.querySelectorAll('.fade-up');

// function to check visibility
const handleScroll = () => {
  fadeUpElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('visible'); // Add the "visible" class to trigger the animation
    }
  });
};
// Run the handler on scroll and load
window.addEventListener('scroll', handleScroll);
window.addEventListener('load', handleScroll);
