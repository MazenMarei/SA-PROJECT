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
        form.classList.add("was-validated");
        event.preventDefault();
        event.stopPropagation();
        if (form.id === "shippingDetailsForm") {
          document.getElementById("shippingDetailsButton").click();
        }

        return;
      }
    },
    false
  );
});

// * start of add to cart button

/// import cart variable from local storage or create an empty object
const addToCartBtn = document.querySelectorAll(".add-to-cart");
const cart = JSON.parse(localStorage.getItem("cart")) || {};
const cartCount = document.getElementById("cartCount");
const accordionChart = document.getElementById("accordionChart");
const checkoutError = document.getElementById("checkoutError");
const cartTotalEl = document.getElementById("cartTotal");

let cartQuantity = parseInt(
  Object.keys(cart).reduce(
    (acc, key) => parseInt(acc) + parseInt(cart[key].quantity),
    0
  ),
  10
);

if (cartCount) {
  console.log(cartQuantity);

  cartCount.innerText = cartQuantity;
}

let cartTotal = Object.keys(cart).reduce(
  (acc, key) => acc + cart[key].quantity * cart[key].price,
  0
);
if (cartQuantity < 1 && accordionChart) {
  checkoutError.classList.add("p-3");
  checkoutError.innerText = "Your cart is empty";
} else if (accordionChart) {
  accordionChart.parentElement.classList.remove("d-none");
  for (const key in cart) {
    const { img, price, quantity } = cart[key];
    addCartItem(key, price, img, quantity);
    const quantityInput = document.querySelectorAll(".quantity-input");
    quantityInput.forEach((input) => {
      input.addEventListener("input", (e) => {
        if (e.target.value < 1) {
          e.target.value = 1;
        } else {
          const parent = e.target.parentElement.parentElement;
          const price = parseFloat(
            parent.querySelector(".cart-price").innerText.replace("$", "")
          );
          const name = parent.querySelector(".chart-item-name").innerText;
          const quantity = e.target.value;
          cart[name].quantity = quantity;
          localStorage.setItem("cart", JSON.stringify(cart));
          cartQuantity = parseInt(
            Object.keys(cart).reduce(
              (acc, key) => parseInt(acc) + parseInt(cart[key].quantity),
              0
            ),
            10
          );
          cartCount.innerText = cartQuantity;
          cartTotal = Object.keys(cart).reduce(
            (acc, key) => acc + cart[key].quantity * cart[key].price,
            0
          );
          cartTotalEl.innerText = cartTotal + " $";
        }
      });
    });

    const deleteCartItem = document.querySelectorAll(".delete-cart-item");
    deleteCartItem.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const parent = e.target.parentElement.parentElement;
        const name = parent.querySelector(".chart-item-name").innerText;
        delete cart[name];
        localStorage.setItem("cart", JSON.stringify(cart));
        cartQuantity = parseInt(
          Object.keys(cart).reduce(
            (acc, key) => parseInt(acc) + parseInt(cart[key].quantity),
            0
          ),
          10
        );
        cartCount.innerText = cartQuantity;
        cartTotal = Object.keys(cart).reduce(
          (acc, key) => acc + cart[key].quantity * cart[key].price,
          0
        );
        cartTotalEl.innerText = cartTotal + " $";
        parent.remove();
        if (cartQuantity < 1) {
          accordionChart.parentElement.classList.add("d-none");
          checkoutError.classList.add("p-3");
          checkoutError.innerText = "Your cart is empty";
        }
      });
    });
  }
}

if (cartTotalEl) {
  cartTotalEl.innerText = cartTotal + " $";
}
addToCartBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const parent = e.target.parentElement;
    const img = parent.querySelector("img").src;
    const title = parent.parentElement.querySelector("h3").innerText;
    const price = parent.parentElement
      .querySelector(".price-font")
      .innerText.replace("$", "");

    if (cart[title]) {
      cart[title].quantity += 1;
    } else {
      cart[title] = {
        img,
        price,
        quantity: 1,
      };
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    cartQuantity++;
    console.log(cartQuantity);

    cartCount.innerText = cartQuantity;
  });
});

function addCartItem(name, price, image, quantity) {
  const cartTableBody = document.getElementById("cartTableBody");
  cartTableBody.innerHTML += `<div
class="row p-3 fw-semibold fs-6 align-items-center"
>
<div class="col-3 px-md-auto px-0">
  <div
    class="d-flex flex-column flex-md-row gap-3 align-items-center"
  >
    <img
      src="${image}"
      alt="bookImage"
      width="90px"
      height="100"
      class="img-thumbnail"
    />
    <p class="m-0 text-nowrap chart-item-name">${name}</p>
  </div>
</div>
<div class="col-3 ps-md-5">
  <p class="m-0 cart-price">${price}$</p>
</div>
<div class="col-3 p-1 ">
  <input
    type="number"
    class="form-control quantity-input"
    value="${quantity}"
    min="1"
  />
</div>
<div class="col-3 text-end">
  <button class="btn accent-bg text-white delete-cart-item">
    Delete
  </button>
</div>
</div>`;
}

// ! Start of Hossney Code
// TABS CHANGING
document.addEventListener("DOMContentLoaded", function () {
  // Get all the tab buttons
  const tabs = document.querySelectorAll(".tabs .tab");

  // Add event listeners to each tab
  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      // Get the target tab content ID from the clicked tab's data attribute
      const targetContentId = tab.getAttribute("data-tab-target");
      // Remove the 'active' class from all tabs and tab contents
      tabs.forEach((t) => t.classList.remove("active"));
      document
        .querySelectorAll(".tab-content > div")
        .forEach((content) => content.classList.remove("active"));
      // Add the 'active' class to the clicked tab and the corresponding tab content
      tab.classList.add("active");
      document.querySelector(targetContentId).classList.add("active");
    });
  });
});

// FADE UP ANIMATION
const fadeUpElements = document.querySelectorAll(".fade-up");

// function to check visibility
const handleScroll = () => {
  fadeUpElements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add("visible"); // Add the "visible" class to trigger the animation
    }
  });
};
// Run the handler on scroll and load
window.addEventListener("scroll", handleScroll);
window.addEventListener("load", handleScroll);
