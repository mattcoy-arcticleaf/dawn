var swiper = new Swiper(".bannerslider", {
    navigation: {
      nextEl: ".next-button",
      prevEl: ".prev-button",
    },
    speed:2000,
    effect: "fade",
  });

document.addEventListener("DOMContentLoaded", function () {
    // Initialize Swiper
    var swiper = new Swiper(".productslider", {
        slidesPerView: 1,
        spaceBetween: 10,
        effect: 'fade',
        pagination: {
          el: ".swiper-pagination",
          clickable:true,
        },
    });

    // Click event to move to corresponding slide when clicking .shop-the-look--button
    document.querySelectorAll(".shop-the-look--button").forEach((button) => {
        button.addEventListener("click", function () {
            let index = parseInt(button.getAttribute("data-index"), 10) - 1; // Convert data-index to zero-based index
            swiper.slideTo(index); // Move slider to selected product
        });
    });
});

document.querySelectorAll("div[data-index]").forEach(item => {
  item.addEventListener("click", function() {
      let indexValue = this.getAttribute("data-index");
      let mobileFacetsMain = document.querySelector(".mobile-facets__main");

      // Find the <details> inside .mobile-facets__main with matching data-index
      let targetDetails = mobileFacetsMain.querySelector(`details[data-index="${indexValue}"]`);
      if (targetDetails) {
          targetDetails.classList.add("menu-opening");
          targetDetails.setAttribute("open", ""); // Add the open attribute
      }
  });
});

 document.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth >= 991) { // Ensure script runs for screens 991px and above
    document.querySelectorAll('[id^="Details-"] summary').forEach((summary) => {
      if (summary.closest('menu-drawer, header-drawer, nav-drawer, .product__accordion')) return; // Ignore elements inside mobile menus

      summary.setAttribute('role', 'button');
      summary.setAttribute('aria-expanded', summary.parentNode.hasAttribute('open'));

      if (summary.nextElementSibling?.id) {
        summary.setAttribute('aria-controls', summary.nextElementSibling.id);
      }

      summary.addEventListener('click', (event) => {
        const detailsElement = event.currentTarget.closest('details');
        if (detailsElement) {
          event.currentTarget.setAttribute(
            'aria-expanded',
            !detailsElement.hasAttribute('open')
          );
        }
      });

      summary.addEventListener('mouseenter', () => {
        if (!summary.closest('header-drawer')) { // Prevent hover effect in mobile menus
          summary.parentNode.setAttribute('open', 'true');
          summary.setAttribute('aria-expanded', 'true');
        }
      });

      summary.parentElement.addEventListener('keyup', (event) => {
        if (event.key === "Escape" && !summary.closest('header-drawer')) {
          summary.parentNode.removeAttribute('open');
          summary.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Close details when hovering over top-level menu links
    document.querySelectorAll('.header__inline-menu > ul > li > a').forEach((link) => {
      link.addEventListener('mouseenter', () => {
        document.querySelectorAll('[id^="Details-"]').forEach((details) => {
          if (!details.closest('header-drawer')) { // Prevent changes inside header-drawer
            const summary = details.querySelector('summary');
            if (summary && !summary.matches(':hover')) {
              details.removeAttribute('open');
              summary.setAttribute('aria-expanded', 'false');
            }
          }
        });
      });
    });

    // Close all open details when the mouse leaves the header
    document.querySelector('header').addEventListener('mouseleave', () => {
      document.querySelectorAll('[id^="Details-"]').forEach((details) => {
        if (!details.closest('header-drawer')) { // Ensure it doesn't close mobile menus
          details.removeAttribute('open');
          const summary = details.querySelector('summary');
          if (summary) {
            summary.setAttribute('aria-expanded', 'false');
          }
        }
      });
    });
  }
});




// Fix potential conflicts in global.js
document.addEventListener("click", (event) => {
  if (window.innerWidth > 989) {
    const summaryElement = event.target.closest('summary');
    if (!summaryElement) return;

    const detailsElement = summaryElement.closest('details');
    if (!detailsElement) return;

    const headerElement = document.querySelector('.header'); // Check if header exists
    if (!headerElement) return; // Prevent firing if .header is not found

    const isOpen = detailsElement.hasAttribute('open');
    headerElement.classList.remove('menu-open');

    if (typeof this.closeMenuDrawer === 'function' && typeof this.openMenuDrawer === 'function') {
      isOpen ? this.closeMenuDrawer(event, summaryElement) : this.openMenuDrawer(summaryElement);
    }
  }
});


// change product grid
function waitForElement(selector, callback) {
  const observer = new MutationObserver((mutations, obs) => {
    if (document.querySelector(selector)) {
      obs.disconnect();
      callback(document.querySelector(selector));
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

waitForElement("#product-grid", (productGrid) => {
  const buttons = document.querySelectorAll(".navigation--layout-button");

  // Check localStorage for saved column size
  const savedColumnSize = localStorage.getItem("grid-column-size");

  if (savedColumnSize) {
    productGrid.setAttribute("data-columns", savedColumnSize);

    buttons.forEach(button => {
      button.setAttribute(
        "data-active",
        button.getAttribute("data-column-size") === savedColumnSize ? "true" : "false"
      );
    });
  }

  // Add event listeners
  buttons.forEach(button => {
    button.addEventListener("click", function () {
      const columnSize = this.getAttribute("data-column-size");

      buttons.forEach(btn => btn.setAttribute("data-active", "false"));
      this.setAttribute("data-active", "true");

      productGrid.setAttribute("data-columns", columnSize);
      localStorage.setItem("grid-column-size", columnSize);
    });
  });
});



// copy link of product
function copyProductLink() {
  const productUrl = window.location.href; // Get the current product URL
  navigator.clipboard.writeText(productUrl).then(() => {
    alert("Product link copied!"); // Optional: Show a success message
  }).catch(err => {
    console.error("Failed to copy: ", err);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const searchModal = document.querySelector(".search-modal");
  const searchForm = document.querySelector(".search-modal__form");

  const observer = new MutationObserver(() => {
      if (searchForm.getAttribute("open") === "true") {
          searchModal.classList.add("active"); // Add your desired class
      } else {
          searchModal.classList.remove("active");
      }
  });

  observer.observe(searchForm, { attributes: true, attributeFilter: ["open"] });
});
