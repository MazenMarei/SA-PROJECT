/// <start> a function to handle the hover effect on the navbar items to expand and collapse the items on hover

// get all the nav items
const navItems = document.querySelectorAll(".nav-item-hover");
// variable to store the last hovered nav item
let lastNav = null;
// an array to store the class names to remove the class names from the nav items
const removeClass = [
  "collapseToLeft",
  "collapseToRight",
  "expandToLeft",
  "expandToRight",
];

// loop through the nav items
navItems.forEach((item, i) => {
  // add mouseout event listener to the nav items
  item.addEventListener("mouseout", () => {
    // remove the class names from the nav items
    removeClass.map((c) => item.classList.remove(c));

    // ! set a timeout to 1 millisecond to wait the lastNav variable to be updated to add the class names to the nav items
    setTimeout(() => {
      if (lastNav != null && lastNav != undefined) {
        if (lastNav > i) {
          // * if the last hovered nav item is greater than the current nav item
          item.classList.add("collapseToRight");
        } else if (lastNav < i) {
          // * if the last hovered nav item is less than the current nav item
          item.classList.add("collapseToLeft");
        } else {
          // * if the last hovered nav item is equal to the current nav item
          item.classList.add("collapseToRight");
        }
      }

      // ! set a timeout to 500 milliseconds to remove the class names from the nav items
      // ! if the mouse is out of the nav item and the class names are added to the nav items in the collapse effect timeout

      setTimeout(() => removeClass.map((c) => item.classList.remove(c)), 500);
    }, 1);
  });

  // add mouseover event listener to the nav items
  item.addEventListener("mouseover", () => {
    // remove the class names from the nav items
    removeClass.map((c) => item.classList.remove(c));

    if (lastNav != null && lastNav != undefined && lastNav != i) {
      if (lastNav > i) {
        // * if the last hovered nav item is greater than the current nav item

        // ! set a timeout to 500 milliseconds to make sure that the last collapse animation is finished

        setTimeout(() => item.classList.add("expandToRight"), 500);
      } else if (lastNav < i) {
        // * if the last hovered nav item is less than the current nav item

        setTimeout(() => item.classList.add("expandToLeft"), 500);
      }
    } else {
      // * if the last hovered nav item is equal to the current

      item.classList.add("expandToLeft");
    }
    lastNav = i;
  });
});

const forms = document.querySelectorAll(".needs-validation");

// Loop over them and prevent submission
Array.from(forms).forEach((form) => {
  form.addEventListener(
    "submit",
    (event) => {      
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();          
      }

      form.classList.add("was-validated");
    },
    false
  );
});




// ! Start of Hossney Code
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
