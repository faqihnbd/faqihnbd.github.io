/*==============================================================
# DOCUMENT READY
==============================================================*/
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all functions
  initTypedText();
  initMobileMenu();
  initStickyHeader();
  initScrollSpy();
  initTabSwitching();
  initSkillsAnimation();
  initPortfolioFilter();
  initPortfolioModal();
  initPortfolioVideoPreview();
  initTestimonialSlider();
  initContactForm();
  initScrollAnimation();
  initThemeToggle();
});

/*==============================================================
# TYPED TEXT ANIMATION
==============================================================*/
function initTypedText() {
  if (document.querySelector(".auto-type")) {
    new Typed(".auto-type", {
      strings: [
        "QA Manual Testing",
        "QA Automation Testing Junior",
        "Web Developer",
        "Backend Developer",
        "Web Freelancer",
        "Support & Deployment Software",
        "IT Helpdesk",
      ],
      typeSpeed: 50,
      backSpeed: 50,
      backDelay: 2000,
      loop: true,
    });
  }
}

/*==============================================================
# MOBILE MENU TOGGLE
==============================================================*/
function initMobileMenu() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    // Close mobile menu and scroll to section when clicking on a nav link
    document.querySelectorAll(".nav-link").forEach(function (navLink) {
      navLink.addEventListener("click", function (e) {
        e.preventDefault(); // Prevent default anchor jump

        // Close mobile menu
        if (hamburger.classList.contains("active")) {
          hamburger.classList.remove("active");
          navMenu.classList.remove("active");
        }

        // Scroll to section
        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);
        const header = document.querySelector(".header");

        if (targetElement && header) {
          const headerHeight = header.offsetHeight;
          const targetPosition = targetElement.offsetTop - headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      });
    });
  }
}

/*==============================================================
# STICKY HEADER
==============================================================*/
function initStickyHeader() {
  const header = document.querySelector(".header");

  if (header) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 100) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    });
  }
}

/*==============================================================
# SCROLLSPY
==============================================================*/
function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  const header = document.querySelector(".header");

  if (!sections.length || !navLinks.length || !header) return;

  window.addEventListener("scroll", function () {
    let current = "";
    const scrollY = window.pageYOffset;
    const headerHeight = header.offsetHeight;

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - headerHeight - 20; // 20px buffer
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = sectionId;
      }
    });

    navLinks.forEach(function (navLink) {
      navLink.classList.remove("active");
      if (navLink.getAttribute("href") === "#" + current) {
        navLink.classList.add("active");
      }
    });
  });
}

/*==============================================================
# TAB SWITCHING
==============================================================*/
function initTabSwitching() {
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabPanes = document.querySelectorAll(".tab-pane");

  if (tabBtns.length && tabPanes.length) {
    tabBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        // Remove active class from all buttons
        tabBtns.forEach(function (btn) {
          btn.classList.remove("active");
        });

        // Add active class to clicked button
        this.classList.add("active");

        // Hide all tab panes
        tabPanes.forEach(function (pane) {
          pane.classList.remove("active");
        });

        // Show the selected tab pane
        const target = this.getAttribute("data-target");
        document.getElementById(target).classList.add("active");
      });
    });
  }
}

/*==============================================================
# SKILLS ANIMATION
==============================================================*/
function initSkillsAnimation() {
  const skillItems = document.querySelectorAll(".skill-item");

  if (skillItems.length) {
    // Initial setup of progress bars
    skillItems.forEach(function (item) {
      const progress = item.querySelector(".skill-progress");
      if (progress) {
        const progressValue = progress.getAttribute("data-progress");
        progress.style.setProperty("--progress", progressValue + "%");
      }
    });

    // Animate progress bars when in viewport
    const animateSkills = function () {
      skillItems.forEach(function (item) {
        if (isInViewport(item)) {
          item.classList.add("active");
        }
      });
    };

    // Initial check
    animateSkills();

    // Check on scroll
    window.addEventListener("scroll", animateSkills);
  }
}

/*==============================================================
# PORTFOLIO FILTER
==============================================================*/
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  if (filterBtns.length && portfolioItems.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        // Remove active class from all buttons
        filterBtns.forEach(function (btn) {
          btn.classList.remove("active");
        });

        // Add active class to clicked button
        this.classList.add("active");

        const filterValue = this.getAttribute("data-filter");

        // Filter items
        portfolioItems.forEach(function (item) {
          if (
            filterValue === "all" ||
            item.getAttribute("data-category") === filterValue
          ) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        });
      });
    });
  }
}

/*==============================================================
# PORTFOLIO MODAL
==============================================================*/
function initPortfolioModal() {
  const portfolioLinks = document.querySelectorAll(".portfolio-link");
  const modal = document.querySelector(".portfolio-modal");
  const modalContent = document.querySelector(".modal-content");
  const modalClose = document.querySelector(".modal-close");
  const modalOverlay = document.querySelector(".modal-overlay");

  // Portfolio data
  const portfolioData = {
    portfolio1: {
      title: "Point Of Sales Website",
      category: "Web Development",
      description:
        "Aplikasi POS Berbasis CRM dan ERP yang sangat andal membantu reporting dan pengelolaan inventory secara real-time.",
      details: {
        client: "Internal Project",
        date: "Mei 2025",
        technologies:
          "HTML, CSS-Tailwind, JavaScript-React(Frontend), Javascript-Node.JS Express(Backend), Mysql2 Sequalize ORM",
        status: "Sedang Dalam Pengembangan 85% Progress",
      },
      type: "mixed", // video, images, mixed
      video: "https://www.youtube.com/embed/lqN44HMgcvM?autoplay=1&mute=1",
      images: [
        "img/rtspos.png",
        "img/portfolio/kasir.png",
        "img/portfolio/menu.png",
      ],
      liveUrl: "#",
      codeUrl: "#",
    },
    portfolio2: {
      title: "Corporate Website",
      category: "Web Development",
      description:
        "Corporate Website yang Menarik dan User-Friendly serta responsif sesuai permintaan Client. Sehingga dapat memenuhi ekspetasi Client dengan baik.",
      details: {
        client: "Putra Mandiri Tractor",
        date: "Juni 2025",
        technologies:
          "Javascript, React, Express.js (untuk admin mengelola product)",
        status: "Selesai",
      },
      type: "mixed",
      video: "https://www.youtube.com/embed/OQDv8kQJWsg?autoplay=1&mute=1",
      images: [
        "img/portfolio/corporatewebsite.png",
        "img/portfolio/adminPM.png",
        "img/portfolio/codereviewPM.png",
      ],
      liveUrl: "#",
      codeUrl: "#",
    },
    portfolio3: {
      title: "Automation Testing Selenium",
      category: "Web Testing",
      description:
        "Script otomatis untuk testing project Aplikasi POS berbasis web saya.",
      details: {
        client: "Internal Project",
        date: "Juli 2025",
        technologies: "Selenium, Chrome WebDriver, Python",
        status: "Sedang Dalam Pengembangan",
      },
      type: "mixed", // video, images, mixed
      video: "https://www.youtube.com/embed/Nu3Wx2Qe-lA?autoplay=1&mute=1",
      images: ["img/portfolio/seleniumrts.png"],
      liveUrl: "#",
      codeUrl: "#",
    },
    portfolio4: {
      title: "Automation Testing Cypress",
      category: "Web Testing",
      description: "Coming Soon",
      details: {
        client: "Internal Project",
        date: "Coming soon",
        technologies: "Javascript - Coming Soon",
      },
      type: "images",
      images: [
        "img/portfolio3.jpg",
        "img/portfolio/brand-logo.jpg",
        "img/portfolio/brand-guide.jpg",
      ],
      liveUrl: "#",
      codeUrl: "#",
    },
    portfolio5: {
      title: "Digital Signage",
      category: "Web Development",
      description:
        "Aplikasi Digital Signage yang interaktif dan responsif untuk menampilkan informasi secara real-time.",
      details: {
        client: "Internal Project",
        date: "Agustus 2025",
        technologies:
          "React Vite, Tailwind CSS, Javascript, Node.js Express, Mysql2 Sequalize ORM",
        status: "Sedang Dalam Pengembangan 80% Progress",
      },
      type: "mixed", // video, images, mixed
      video: "https://www.youtube.com/embed/Deht9mN3tIg?autoplay=1&mute=1",
      images: [
        "img/portfolio/rts1.png",
        "img/portfolio/rts2.png",
        "img/portfolio/rts3.png",
        "img/portfolio/rts4.png",
      ],
      liveUrl: "#",
      codeUrl: "#",
    },
  };

  if (
    portfolioLinks.length &&
    modal &&
    modalContent &&
    modalClose &&
    modalOverlay
  ) {
    portfolioLinks.forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();

        const portfolioId = this.getAttribute("data-portfolio");
        const data = portfolioData[portfolioId];

        if (!data) return;

        let mediaContent = "";

        // Generate media content based on type
        if (data.type === "video" || data.type === "mixed") {
          if (data.video) {
            mediaContent += `
              <div class="modal-video-container">
                <iframe class="modal-video" 
                        src="${data.video}" 
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                </iframe>
              </div>
            `;
          }
        }

        if (data.type === "images" || data.type === "mixed") {
          if (data.images && data.images.length > 0) {
            mediaContent += `
              <div class="modal-gallery">
                <div class="gallery-main">
                  <img src="${data.images[0]}" alt="${data.title} - Main Image" id="galleryMainImage">
                </div>
            `;

            if (data.images.length > 1) {
              mediaContent += `
                <div class="gallery-thumbnails">
              `;
              data.images.forEach((img, index) => {
                mediaContent += `
                  <img src="${img}" alt="${data.title} - Image ${index + 1}" 
                       class="gallery-thumb ${index === 0 ? "active" : ""}" 
                       data-full="${img}">
                `;
              });
              mediaContent += `</div>`;
            }
            mediaContent += `</div>`;
          }
        }

        modalContent.innerHTML = `
          <div class="modal-header">
            <h2>${data.title}</h2>
          </div>
          <div class="modal-body">
            ${mediaContent}
            <h3>Deskripsi Project</h3>
            <p>${data.description}</p>
            <h3>Detail Project</h3>
            <ul>
              <li><strong>Client:</strong> ${data.details.client}</li>
              <li><strong>Tanggal:</strong> ${data.details.date}</li>
              <li><strong>Teknologi:</strong> ${data.details.technologies}</li>
              <li><strong>Status:</strong> ${data.details.status}</li>
            </ul>
          </div>
        `;

        // Initialize gallery functionality
        initModalGallery();

        // Show modal
        modal.style.display = "block";
        document.body.style.overflow = "hidden";
      });
    });

    // Close modal when clicking the close button
    modalClose.addEventListener("click", function () {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    });

    // Close modal when clicking outside the modal content
    modalOverlay.addEventListener("click", function () {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    });
  }
}

// Gallery functionality for modal
function initModalGallery() {
  const thumbnails = document.querySelectorAll(".gallery-thumb");
  const mainImage = document.getElementById("galleryMainImage");

  if (thumbnails.length && mainImage) {
    thumbnails.forEach(function (thumb) {
      thumb.addEventListener("click", function () {
        // Remove active class from all thumbnails
        thumbnails.forEach((t) => t.classList.remove("active"));

        // Add active class to clicked thumbnail
        this.classList.add("active");

        // Update main image
        const fullImageSrc = this.getAttribute("data-full");
        mainImage.src = fullImageSrc;
        mainImage.alt = this.alt.replace("- Image", "- Main Image");
      });
    });
  }
}

/*==============================================================
# TESTIMONIAL SLIDER
==============================================================*/
function initTestimonialSlider() {
  const testimonialSlider = document.querySelector(".testimonial-slider");
  const testimonialItems = document.querySelectorAll(".testimonial-item");

  if (testimonialSlider && testimonialItems.length > 1) {
    let currentIndex = 0;
    const maxIndex = testimonialItems.length - 1;

    // Auto slide every 5 seconds
    setInterval(function () {
      currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
      const scrollPos =
        testimonialItems[currentIndex].offsetLeft -
        testimonialSlider.offsetLeft;
      testimonialSlider.scrollTo({
        left: scrollPos,
        behavior: "smooth",
      });
    }, 5000);
  }
}

/*==============================================================
# CONTACT FORM
==============================================================*/
function initContactForm() {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const subject = document.getElementById("subject").value;
      const message = document.getElementById("message").value;

      // Basic validation
      if (!name || !email || !subject || !message) {
        alert("Silahkan isi semua bidang formulir.");
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Silahkan masukkan alamat email yang valid.");
        return;
      }

      // Create mailto link with form data
      const mailtoSubject = encodeURIComponent(subject);
      const mailtoBody = encodeURIComponent(
        `Nama: ${name}\n` +
          `Email: ${email}\n` +
          `Subjek: ${subject}\n\n` +
          `Pesan:\n${message}`
      );

      const mailtoLink = `mailto:faqihnusabhakti22@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

      // Open email client
      window.location.href = mailtoLink;

      // Show success message and reset form
      setTimeout(() => {
        alert(
          "Email client Anda telah dibuka. Silahkan kirim email dari aplikasi email Anda."
        );
        contactForm.reset();
      }, 500);
    });
  }
}

/*==============================================================
# SCROLL ANIMATION
==============================================================*/
function initScrollAnimation() {
  const sections = document.querySelectorAll(".section");
  const timelineItems = document.querySelectorAll(".timeline-item");

  const animateElements = function () {
    // Animate sections
    sections.forEach(function (section) {
      if (isInViewport(section)) {
        section.classList.add("active");
      }
    });

    // Animate timeline items
    timelineItems.forEach(function (item) {
      if (isInViewport(item)) {
        item.classList.add("active");
      }
    });
  };

  // Initial check
  animateElements();

  // Check on scroll
  window.addEventListener("scroll", animateElements);
}

/*==============================================================
# THEME TOGGLE
==============================================================*/
function initThemeToggle() {
  const themeToggle = document.querySelector(".theme-toggle");
  const themeIcon = document.querySelector(".theme-toggle i");

  if (themeToggle && themeIcon) {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem("theme");

    if (
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.body.classList.add("dark-theme");
      themeIcon.classList.remove("fa-moon");
      themeIcon.classList.add("fa-sun");
    }

    // Toggle theme on click
    themeToggle.addEventListener("click", function () {
      document.body.classList.toggle("dark-theme");

      // Update icon
      if (document.body.classList.contains("dark-theme")) {
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");
        localStorage.setItem("theme", "dark");
      } else {
        themeIcon.classList.remove("fa-sun");
        themeIcon.classList.add("fa-moon");
        localStorage.setItem("theme", "light");
      }
    });
  }
}

/*==============================================================
# HELPER FUNCTIONS
==============================================================*/
// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <=
      (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
    rect.bottom >= 0
  );
}

// Smooth scroll to element
function scrollToElement(element) {
  window.scrollTo({
    top: element.offsetTop,
    behavior: "smooth",
  });
}

/*==============================================================
# PORTFOLIO VIDEO PREVIEW
==============================================================*/
function initPortfolioVideoPreview() {
  const portfolioItems = document.querySelectorAll('[data-has-video="true"]');

  portfolioItems.forEach((item) => {
    const img = item.querySelector(".portfolio-img img");
    const originalSrc = img.src;
    let hoverTimeout;
    let isVideoLoaded = false;
    let loadingIndicator;

    // Portfolio data untuk video preview - semua menggunakan YouTube
    const portfolioData = {
      portfolio1: {
        video:
          "https://www.youtube.com/embed/lqN44HMgcvM?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=lqN44HMgcvM",
        poster: "img/rtspos.png",
      },
      portfolio2: {
        video:
          "https://www.youtube.com/embed/OQDv8kQJWsg?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=OQDv8kQJWsg",
        poster: "img/portfolio/corporatewebsite.png",
      },
      portfolio3: {
        video:
          "https://www.youtube.com/embed/Nu3Wx2Qe-lA?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=Nu3Wx2Qe-lA",
        poster: "img/portfolio/seleniumrts.png",
      },
      portfolio4: {
        video: "",
        poster: "img/comingsoon.png",
      },
      portfolio5: {
        video:
          "https://www.youtube.com/embed/Deht9mN3tIg?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=Deht9mN3tIg",
        poster: "img/portfolio/rts1.png",
      },
    };

    const portfolioId = item
      .querySelector(".portfolio-link")
      .getAttribute("data-portfolio");
    const videoData = portfolioData[portfolioId];

    if (videoData && videoData.video) {
      // Mouse enter - start video preview
      item.addEventListener("mouseenter", () => {
        clearTimeout(hoverTimeout);

        hoverTimeout = setTimeout(() => {
          if (!isVideoLoaded) {
            // Show loading indicator
            loadingIndicator = document.createElement("div");
            loadingIndicator.className = "video-loading show";
            loadingIndicator.innerHTML =
              '<i class="fas fa-spinner fa-spin"></i> Loading...';
            item.querySelector(".portfolio-img").appendChild(loadingIndicator);

            // Create iframe element for YouTube
            const iframe = document.createElement("iframe");
            iframe.src = videoData.video;
            iframe.frameBorder = "0";
            iframe.allow =
              "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
            iframe.allowFullscreen = true;
            iframe.style.cssText = `
              width: 100%;
              height: 100%;
              object-fit: cover;
              position: absolute;
              top: 0;
              left: 0;
              z-index: 1;
              opacity: 0;
              transition: opacity 0.8s ease;
              border: none;
            `;

            // Add iframe to portfolio img container
            const portfolioImg = item.querySelector(".portfolio-img");
            portfolioImg.appendChild(iframe);

            // When iframe loads
            iframe.addEventListener("load", () => {
              // Hide loading indicator
              if (loadingIndicator) {
                loadingIndicator.remove();
                loadingIndicator = null;
              }

              // Fade in iframe
              iframe.style.opacity = "0.9";
            });

            // Fallback timeout to remove loading indicator
            setTimeout(() => {
              if (loadingIndicator) {
                loadingIndicator.remove();
                loadingIndicator = null;
              }
              iframe.style.opacity = "0.9";
            }, 2000);

            isVideoLoaded = true;
          }
        }, 300); // Reduced delay untuk response yang lebih cepat
      });

      // Mouse leave - stop video preview
      item.addEventListener("mouseleave", () => {
        clearTimeout(hoverTimeout);

        // Remove loading indicator if exists
        if (loadingIndicator) {
          loadingIndicator.remove();
          loadingIndicator = null;
        }

        const iframe = item.querySelector(".portfolio-img iframe");
        if (iframe) {
          iframe.style.opacity = "0";
          setTimeout(() => {
            iframe.remove();
            isVideoLoaded = false;
          }, 800);
        }
      });
    }
  });
}
