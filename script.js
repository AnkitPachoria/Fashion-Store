
//  Add to cart
document.addEventListener("DOMContentLoaded", function () {
  // Cart sidebar functionality
  const cartIcon = document.getElementById("cartIcon");
  const footerCartIcon = document.getElementById("footerCartIcon"); // Footer cart icon
  const sidebar = document.getElementById("sidebar");
  const closeSidebar = document.getElementById("closeSidebar");

  // Function to open sidebar
  const openSidebar = function () {
    sidebar.classList.add("open");
  };

  // Ensure sidebar opens when cart icons are clicked
  if (cartIcon) {
    cartIcon.addEventListener("click", function (event) {
      event.preventDefault();
      openSidebar();
    });
  }

  if (footerCartIcon) {
    footerCartIcon.addEventListener("click", function (event) {
      event.preventDefault();
      openSidebar();
    });
  }

  // Close sidebar when the close button is clicked
  if (closeSidebar) {
    closeSidebar.addEventListener("click", function () {
      sidebar.classList.remove("open");
    });
  }

  // Counter functionality (remains unchanged)
  const numberElement = document.getElementById("number");
  const decreaseButton = document.getElementById("decrease");
  const increaseButton = document.getElementById("increase");

  let count = parseInt(numberElement.textContent, 10);

  const updateDisplay = () => {
    numberElement.textContent = count;
    decreaseButton.disabled = count <= 1;
  };

  decreaseButton.addEventListener("click", () => {
    if (count > 1) {
      count -= 1;
      updateDisplay();
    }
  });

  increaseButton.addEventListener("click", () => {
    count += 1;
    updateDisplay();
  });

  updateDisplay();
});

//    collection

/* Mobile view */
function toggleFilter() {
  const filterSection = document.getElementById("filterSection");
  if (filterSection.classList.contains("show")) {
    filterSection.classList.remove("show");
  } else {
    filterSection.classList.add("show");
  }
}

function toggleAccordion(id) {
  const body = document.getElementById(id); // Accordion body element
  const icon = body.previousElementSibling.querySelector(".accordion-icon"); // Accordion icon

  // Check if the clicked accordion is already open
  if (body.classList.contains("show")) {
    // Close the clicked accordion
    body.classList.remove("show");
    icon.classList.remove("rotate");
    icon.textContent = "+";
  } else {
    // Close all other accordions first
    document.querySelectorAll(".accordion-body").forEach((el) => {
      if (el !== body) {
        el.classList.remove("show"); // Close other accordions
        el.previousElementSibling
          .querySelector(".accordion-icon")
          .classList.remove("rotate");
        el.previousElementSibling.querySelector(".accordion-icon").textContent =
          "+";
      }
    });

    // Open the clicked accordion
    body.classList.add("show");
    icon.classList.add("rotate");
    icon.textContent = "-";
  }
}

function closeFilterSection() {
  const filterSection = document.getElementById("filterSection");
  filterSection.classList.remove("show");
}

// gallary
  document.addEventListener("DOMContentLoaded", function () {
    const thumbnails = document.querySelectorAll(".full-img");
    const fullImages = document.querySelectorAll(".full-img");
    const modal = document.getElementById("image-modal");
    const modalImage = document.getElementById("modal-image");
    const closeBtn = document.querySelector(".close");
    const prevBtn = document.querySelector(".modal-prev");
    const nextBtn = document.querySelector(".modal-next");
    const fullImageColumn = document.querySelector(".full-image-column"); // Full image container

    let currentIndex = 0;

    function openModal(index) {
      modal.style.display = "block";
      currentIndex = index;
      modalImage.src = fullImages[currentIndex].src;
      scrollToImage(currentIndex);
    }

    function closeModal() {
      modal.style.display = "none";
    }

    function showPrevImage() {
      currentIndex = (currentIndex - 1 + fullImages.length) % fullImages.length;
      modalImage.src = fullImages[currentIndex].src;
      scrollToImage(currentIndex);
    }

    function showNextImage() {
      currentIndex = (currentIndex + 1) % fullImages.length;
      modalImage.src = fullImages[currentIndex].src;
      scrollToImage(currentIndex);
    }

    function scrollToImage(index) {
      const imageToScrollTo = fullImages[index];
      if (imageToScrollTo) {
        fullImageColumn.scrollTo({
          top: imageToScrollTo.offsetTop,
          behavior: "smooth",
        });
      }
    }

    thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener("click", () => {
        const imageUrl = thumbnail.getAttribute("data-full-image");
        currentIndex = Array.from(fullImages).findIndex(
          (img) => img.src === imageUrl
        );
        openModal(currentIndex);
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", closeModal);
    } else {
      console.error("Close button not found");
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", showPrevImage);
    } else {
      console.error("Previous button not found");
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", showNextImage);
    } else {
      console.error("Next button not found");
    }

    // Close modal if clicked outside of image
    window.addEventListener("click", function (event) {
      if (event.target === modal) {
        closeModal();
      }
    });
  });

  // scroll ///
  document.addEventListener("DOMContentLoaded", function () {
    // Get all thumbnail images
    const thumbnails = document.querySelectorAll(".thumbnail-img");
    // Get the full image column
    const fullImageColumn = document.querySelector(".full-image-column");

    // Add click event to each thumbnail
    thumbnails.forEach((thumbnail) => {
      thumbnail.addEventListener("click", function () {
        // Get the full image URL from data attribute
        const fullImageSrc = this.dataset.fullImage;

        // Find the corresponding full image
        const fullImage = Array.from(
          fullImageColumn.querySelectorAll(".full-img")
        ).find((img) => img.dataset.fullImage === fullImageSrc);
        if (fullImage) {
          // Scroll to the full image smoothly
          fullImageColumn.scrollTo({
            top: fullImage.offsetTop - fullImageColumn.offsetTop,
            behavior: "smooth",
          });
          // Optionally, you could highlight or focus the full image
          fullImageColumn
            .querySelectorAll(".full-img")
            .forEach((img) => img.classList.remove("active"));
          fullImage.classList.add("active");
        }
      });
    });
  });

//  NAVBAR SEARCH MODEL
// Modal Class (Search Modal Functionality)
class Modal {
  constructor(modalId, triggerSelector, closeSelector) {
    this.modal = document.getElementById(modalId);
    this.trigger = document.querySelector(triggerSelector);
    this.closeBtn = document.getElementById(closeSelector);
    this.searchInput = document.getElementById("searchInput");
    this.searchButton = document.getElementById("searchButton");
    this.resultsContainer = document.getElementById("searchResults"); // Container for search results
    this.init();
  }

  init() {
    // Show the modal when the trigger is clicked
    this.trigger.addEventListener("click", (e) => {
      e.preventDefault();
      this.show();
    });

    // Hide the modal when the close button is clicked
    this.closeBtn.addEventListener("click", () => {
      this.hide();
    });

    // Hide the modal when clicking outside of it
    window.addEventListener("click", (e) => {
      if (e.target === this.modal) {
        this.hide();
      }
    });

    // When the search button is clicked, filter products
    this.searchButton.addEventListener("click", () => {
      const searchQuery = this.searchInput.value.toLowerCase().trim();
      this.filterProducts(searchQuery);
    });
  }

  show() {
    this.modal.style.display = "block";
  }

  hide() {
    this.modal.style.display = "none";
  }

  // Function to filter products based on search query
  filterProducts(query) {
    const products = document.querySelectorAll(".product");
    this.resultsContainer.innerHTML = ""; // Clear previous results

    if (query) {
      let resultsFound = false;

      products.forEach((product) => {
        const productName = product.getAttribute("data-product-name").toLowerCase();

        if (productName.includes(query)) {
          // Create a clone or custom result element to display in modal
          const productClone = product.cloneNode(true);
          this.resultsContainer.appendChild(productClone);
          resultsFound = true;
        }
      });

      if (!resultsFound) {
        this.resultsContainer.innerHTML = "<p>No products found.</p>";
      }
    } else {
      this.resultsContainer.innerHTML = "<p>Please enter a search term.</p>";
    }
  }
}


// Initialize modals on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  new Modal("searchModal", ".search-trigger", "closeModal");
});





// image slider stop
document.addEventListener("DOMContentLoaded", function () {
  const sliderTrack = document.querySelector(".slider-track");
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  let currentSlide = 0;
  const slidesToShow = 3; // Limit the slider to show 4 slides
  const slideWidth = slides[0].clientWidth;

  function updateSliderPosition() {
    const offset = -(slideWidth * currentSlide);
    sliderTrack.style.transform = `translateX(${offset}px)`;

    // Disable the next button after the 4th slide
    if (currentSlide >= slidesToShow) {
      nextBtn.disabled = true;
      nextBtn.style.opacity = "0.5"; // Make the button look disabled
      // Prevent further transition by setting the slider's width to the total slides to show
      sliderTrack.style.transition = "none";
      // Align the slider to the fourth slide
      sliderTrack.style.transform = `translateX(${
        -slideWidth * slidesToShow
      }px)`;
    } else {
      nextBtn.disabled = false;
      nextBtn.style.opacity = "1";
      // Restore transition when the slider is in the sliding range
      sliderTrack.style.transition = "transform 0.5s ease";
    }

    // Disable the prev button when at the start
    if (currentSlide === 0) {
      prevBtn.disabled = true;
      prevBtn.style.opacity = "0.5"; // Make the button look disabled
    } else {
      prevBtn.disabled = false;
      prevBtn.style.opacity = "1";
    }
  }

  nextBtn.addEventListener("click", () => {
    if (currentSlide < slidesToShow) {
      currentSlide++;
      updateSliderPosition();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentSlide > 0) {
      currentSlide--;
      updateSliderPosition();
    }
  });

  // Initialize the slider
  updateSliderPosition();

  // Display "View All Products" card after the 4th slide
  const viewAllCard = document.createElement("div");
  viewAllCard.className = "slide view-all-card";
  viewAllCard.innerHTML = `
    <div class="product-info">
      <h5>View All Products</h5>
      <p>Check out our full collection</p>
      <a href="collection.html" class="btn-2">VIEW ALL PRODUCTS</a>
    </div>
  `;
  sliderTrack.appendChild(viewAllCard);

  // Adjust slider position on window resize
  window.addEventListener("resize", updateSliderPosition);
});

// sizeconst sizeBoxes = document.querySelectorAll('.size-box');

document.addEventListener("DOMContentLoaded", () => {
  const sizeBoxes = document.querySelectorAll('.size-box'); // Adjust the selector if necessary

  sizeBoxes.forEach((box) => {
    box.addEventListener("click", () => {
      // Remove active class from all size boxes
      sizeBoxes.forEach((item) => item.classList.remove("active"));
      // Add active class to the clicked size box
      box.classList.add("active");
    });
  });
});






// 
document.getElementById("nextDiscoverSlide").addEventListener("click", function() {
  const slider = document.querySelector(".discover-trips-slider-container");
  const slideWidth = document.querySelector(".discover-slide").offsetWidth + 20; // Width of a slide + the gap
  slider.scrollBy({
    left: slideWidth, // Move by the width of one slide
    behavior: "smooth" // Smooth scrolling
  });
});

document.getElementById("prevDiscoverSlide").addEventListener("click", function() {
  const slider = document.querySelector(".discover-trips-slider-container");
  const slideWidth = document.querySelector(".discover-slide").offsetWidth + 20; // Width of a slide + the gap
  slider.scrollBy({
    left: -slideWidth, // Move by the width of one slide (in reverse)
    behavior: "smooth" // Smooth scrolling
  });
});

// /////
document.getElementById("nextNewDiscoverSlide").addEventListener("click", function() {
  const slider = document.querySelector(".new-discover-slider-container");
  const slideWidth = document.querySelector(".new-discover-slide").offsetWidth + 20; // Width of a slide + the gap
  slider.scrollBy({
    left: slideWidth, // Move by the width of one slide
    behavior: "smooth" // Smooth scrolling
  });
});

document.getElementById("prevNewDiscoverSlide").addEventListener("click", function() {
  const slider = document.querySelector(".new-discover-slider-container");
  const slideWidth = document.querySelector(".new-discover-slide").offsetWidth + 20; // Width of a slide + the gap
  slider.scrollBy({
    left: -slideWidth, // Move by the width of one slide (in reverse)
    behavior: "smooth" // Smooth scrolling
  });
});