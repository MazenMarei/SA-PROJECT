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
