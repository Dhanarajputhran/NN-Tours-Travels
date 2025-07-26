// =================== SLIDER LOGIC (for gallery image slideshow if needed) ===================
let currentSlide = 0;
const slides = document.querySelectorAll('.gallery img');

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) slide.classList.add('active');
  });
}

if (slides.length > 0) {
  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }, 4000);
}

// =================== NAV TOGGLE & SCROLL ANIMATION ===================
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector(".menu-btn");
  const nav = document.querySelector("nav");

  // Mobile menu toggle
  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

  // Fade-in on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, {
    threshold: 0.1
  });

  document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));

  // Highlight active link on scroll
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("nav a");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (pageYOffset >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
});

// =================== TOUR PLACE SELECTION LOGIC ===================

// ✅ 1. Place your data here
const data = {
  "Andhra Pradesh": {
    "Tirupati": [
      "https://wallpaperaccess.com/full/3479478.jpg",
      "http://1.bp.blogspot.com/-XT6SsCdI9-0/Uf-E48pCTvI/AAAAAAAAKwA/i30uqMg4M7w/s1600/tirupati-balaji-temple-night-view.jpg"
    ],
    "Araku Valley": [
      "https://vizagtourism.org.in/images/places-to-visit/header/araku-valley-vizag-tourism-entry-fee-timings-holidays-reviews-header.jpg",
      "https://drscdn.500px.org/photo/13938657/q%3D80_m%3D2000/v2?sig=63e4c32515cade7483ea14f995d7b4ef2e92cae648437bb61f8cb9f4dc842d69"
    ],
    "Vijayawada": [
      "https://vijayawadatourism.com/images/places-to-visit/headers/kanaka-durga-temple-vijayawada-entry-fee-timings-holidays-reviews-header.jpg",
      "https://i.pinimg.com/originals/f6/e3/e5/f6e3e521ab5509539fd6ae20846a9cca.jpg"
    ],
    "Srisailam": [
      "https://www.todaystraveller.net/wp-content/uploads/2021/03/22-2048x1365.jpg",
      "https://www.adotrip.com/public/images/areas/master_images/5e4142c1ea17a-Srisailam_Trip.jpg"
    ],
    "Lepakshi": []
  },
  "Karnataka": {
    "Udupi": [],
    "Coorg": [],
    "Hampi": [],
    "Gokarna": [],
    "Mysore Palace": []
  },
  "Kerala": {
    "Munnar": [],
    "Wayanad": [],
    "Thekkady": [],
    "Alleppey": [],
    "Kovalam Beach": []
  }
};

// ✅ 2. Get elements
const stateSelect = document.getElementById("stateSelect");
const placeList = document.getElementById("placeList"); // ← where checkboxes will go
const resultsDiv = document.getElementById("results");

// ✅ 3. Populate state dropdown on page load
for (let state in data) {
  const option = document.createElement("option");
  option.value = state;
  option.textContent = state;
  stateSelect.appendChild(option);
}

// ✅ 4. When a state is selected → show checkbox list of places
stateSelect.addEventListener("change", () => {
  placeList.innerHTML = ""; // clear old places

  const selectedState = stateSelect.value;
  if (!selectedState) return;

  const places = data[selectedState];

  for (let place in places) {
    const label = document.createElement("label");
    label.style.display = "block";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = place;
    checkbox.name = "place";

    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(" " + place));
    placeList.appendChild(label);
  }
});

// ✅ 5. On OK button click → show images for selected places
document.getElementById("showTours").addEventListener("click", () => {
  resultsDiv.innerHTML = ""; // clear old results

  const selectedState = stateSelect.value;
  const checkedPlaces = document.querySelectorAll('#placeList input[type="checkbox"]:checked');
  const selectedPlaces = Array.from(checkedPlaces).map(cb => cb.value);

  selectedPlaces.forEach(place => {
    const placeBlock = document.createElement("div");
    placeBlock.className = "place-block";

    const title = document.createElement("h2");
    title.textContent = place;
    placeBlock.appendChild(title);

    const grid = document.createElement("div");
    grid.className = "image-grid";

    const images = data[selectedState][place];
    if (images.length > 0) {
      images.forEach(url => {
        const img = document.createElement("img");
        img.src = url;
        grid.appendChild(img);
      });
    } else {
      const msg = document.createElement("p");
      msg.textContent = "Images coming soon...";
      grid.appendChild(msg);
    }

    placeBlock.appendChild(grid);
    resultsDiv.appendChild(placeBlock);
  });
});

// =================== Hero FOR SECTIONS ===================
let currentHero = 0;
const heroSlides = document.querySelectorAll('.hero-slider img');

function showHeroSlide(index) {
  heroSlides.forEach((img, i) => {
    img.classList.remove('active');
    if (i === index) img.classList.add('active');
  });
}

setInterval(() => {
  currentHero = (currentHero + 1) % heroSlides.length;
  showHeroSlide(currentHero);
}, 4000);

// =================== CONTACT FORM ➜ Google Sheets ===================
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  
  const form = e.target;
  const data = {
    name: form.name.value,
    email: form.email.value,
    phone: form.phone.value,
    message: form.message.value,
  };

  // Show success message immediately
  document.getElementById("successMsg").classList.remove("hidden");
  form.reset();

  // Send data in the background (no wait)
  fetch("https://script.google.com/macros/s/AKfycbzLgOS0WHwmvw_UAO-j0TrvBgst_ane1h_tdwtEItIvek19SASlB63u-LwtAfAUcyhULg/exec", {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
});

// Example: Smooth scroll to footer when a button is clicked
document.querySelector('.scroll-to-footer')?.addEventListener('click', () => {
  document.querySelector('footer').scrollIntoView({ behavior: 'smooth' });
});

// =================== gallery view ===================
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll(".gallery-thumb");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const closeBtn = document.getElementById("closeBtn");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");

  let currentIndex = 0;

  images.forEach((img, index) => {
    img.addEventListener("click", () => {
      currentIndex = index;
      showImage();
    });
  });

  function showImage() {
    lightbox.style.display = "flex";
    lightboxImg.src = images[currentIndex].src;
  }

  function closeLightbox() {
    lightbox.style.display = "none";
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage();
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage();
  }

  closeBtn.addEventListener("click", closeLightbox);
  nextBtn.addEventListener("click", nextImage);
  prevBtn.addEventListener("click", prevImage);

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
});
