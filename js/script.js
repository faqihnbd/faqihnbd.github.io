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
  initLanguageToggle();
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
  const portfolioLinks = document.querySelectorAll(
    ".portfolio-item-link, .portfolio-link"
  );
  const modal = document.querySelector(".portfolio-modal");
  const modalContent = document.querySelector(".modal-content");
  const modalClose = document.querySelector(".modal-close");
  const modalOverlay = document.querySelector(".modal-overlay");

  // Portfolio data
  const portfolioData = {
    portfolio1: {
      title: "Point Of Sales Website",
      category: "Web Development",
      description: {
        id: "Aplikasi POS Berbasis CRM dan ERP yang sangat andal membantu reporting dan pengelolaan inventory secara real-time.",
        en: "Reliable CRM and ERP-based POS application that helps reporting and real-time inventory management.",
      },
      details: {
        client: ": Internal Project",
        date: ": Mei 2025",
        technologies:
          ": HTML, CSS-Tailwind, JavaScript-React(Frontend), Javascript-Node.JS Express(Backend), Mysql2 Sequalize ORM, Cloud SaaS",
        status: {
          id: ": Sedang Dalam Pengembangan 85% Progress",
          en: ": Under Development 85% Progress",
        },
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
      description: {
        id: "Corporate Website yang Menarik dan User-Friendly serta responsif sesuai permintaan Client. Sehingga dapat memenuhi ekspetasi Client dengan baik.",
        en: "Attractive and User-Friendly corporate website that is responsive according to client requests. So it can meet client expectations well.",
      },
      details: {
        client: ": Putra Mandiri Tractor",
        date: ": Juni 2025",
        technologies:
          ": Javascript, React, Express.js (untuk admin mengelola product)",
        status: {
          id: ": Selesai",
          en: ": Completed",
        },
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
      description: {
        id: "Script otomatis untuk testing project Aplikasi POS berbasis web saya.",
        en: "Automated script for testing my web-based POS application project.",
      },
      details: {
        client: "Internal Project",
        date: ":Juli 2025",
        technologies: ": Selenium, Chrome WebDriver, Python",
        status: {
          id: ": Sedang Dalam Pengembangan",
          en: ": Under Development",
        },
      },
      type: "mixed", // video, images, mixed
      video: "https://www.youtube.com/embed/Nu3Wx2Qe-lA?autoplay=1&mute=1",
      images: ["img/portfolio/seleniumrts.png"],
      liveUrl: "#",
      codeUrl: "#",
    },
    portfolio4: {
      title: "Automation Testing Playwright",
      category: "Web Testing",
      description: {
        id: "Automation Testing UI dengan Playwright",
        en: "Automation Testing UI with Playwright",
      },
      details: {
        client: ": Internal Project",
        date: ": Juli 2025",
        technologies: ": Javascript, Playwright",
        status: {
          id: ": Masih Dalam Pengembangan",
          en: ": Under Development",
        },
      },
      type: "mixed",
      video: "https://www.youtube.com/embed/y2W_qr9pMdg?autoplay=1&mute=1",
      images: ["img/portfolio/playwright.png"],
      liveUrl: "#",
      codeUrl: "#",
    },
    portfolio5: {
      title: "Digital Signage",
      category: "Web Development",
      description: {
        id: "Aplikasi Digital Signage yang interaktif dan responsif untuk menampilkan informasi secara real-time.",
        en: "Interactive and responsive Digital Signage application for displaying real-time information.",
      },
      details: {
        client: ": Internal Project",
        date: ": Agustus 2025",
        technologies:
          ": React Vite, Tailwind CSS, Javascript, Node.js Express, Mysql2 Sequalize ORM",
        status: {
          id: ": Sedang Dalam Pengembangan 80% Progress",
          en: ": Under Development 80% Progress",
        },
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

        // Cari data-portfolio dari elemen ini atau parent-nya
        let portfolioId = this.getAttribute("data-portfolio");

        // Jika tidak ada, cari di parent yang memiliki data-portfolio
        if (!portfolioId) {
          const parentWithData = this.closest("[data-portfolio]");
          if (parentWithData) {
            portfolioId = parentWithData.getAttribute("data-portfolio");
          }
        }

        const data = portfolioData[portfolioId];

        if (!data) return;

        // Get current language
        const modalCurrentLang = localStorage.getItem("language") || "id";

        // Handle description based on language
        const description =
          typeof data.description === "object"
            ? data.description[modalCurrentLang]
            : data.description;

        // Handle status based on language
        const status =
          typeof data.details.status === "object"
            ? data.details.status[modalCurrentLang]
            : data.details.status;

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
            <h3 data-lang-key="portfolio.project.description">Deskripsi Project</h3>
            <p>${description}</p>
            <h3 data-lang-key="portfolio.project.details">Detail Project</h3>
            <ul>
              <li><strong data-lang-key="portfolio.project.client">Client:</strong> ${data.details.client}</li>
              <li><strong data-lang-key="portfolio.project.date">Tanggal:</strong> ${data.details.date}</li>
              <li><strong data-lang-key="portfolio.project.technologies">Teknologi:</strong> ${data.details.technologies}</li>
              <li><strong data-lang-key="portfolio.project.status">Status:</strong> ${status}</li>
            </ul>
          </div>
        `;

        // Initialize gallery functionality
        initModalGallery();

        // Apply current language to modal content
        changeLanguage(modalCurrentLang);

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
        video:
          "https://www.youtube.com/embed/y2W_qr9pMdg?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=y2W_qr9pMdg",
        poster: "img/portfolio/playwright.png",
      },
      portfolio5: {
        video:
          "https://www.youtube.com/embed/Deht9mN3tIg?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=Deht9mN3tIg",
        poster: "img/portfolio/rts1.png",
      },
    };

    const portfolioId = item
      .querySelector(".portfolio-item-link")
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

/*==============================================================
# LANGUAGE TOGGLE
==============================================================*/
const translations = {
  id: {
    // Navigation
    "nav.home": "Beranda",
    "nav.about": "Tentang Saya",
    "nav.resume": "Resume",
    "nav.portfolio": "Portfolio",
    "nav.services": "Layanan",
    "nav.contact": "Kontak",

    // Hero Section
    "hero.greeting": "Halo, Saya",
    "hero.description":
      "Saya meraih gelar Sarjana Sistem Komputer dari Universitas Serang Raya. Memiliki pengalaman lebih dari 1 tahun di bidang IT. Saya memiliki pemikiran logis dalam pendekatan praktis untuk memecahkan masalah dalam suatu pekerjaan. Saya akan terus ingin belajar dan berkembang di bidang IT, karena saya senang mengatasi tantangan dan meningkatkan kinerja saya.",
    "hero.viewPortfolio": "Lihat Portfolio",
    "hero.contactMe": "Hubungi Saya",

    // About Section
    "about.subtitle": "Tentang Saya",
    "about.title": "Mengenal Saya Lebih Dekat",
    "about.experience": "Tahun Pengalaman di Bidang IT",
    "about.jobTitle": "Junior Quality Assurance",
    "about.description":
      "Saya Berminat besar di bidang Software Quality Assurance. Memiliki pemahaman dasar tentang pengujian manual dan otomatis, familiar dengan tools seperti Playwright, K6, Selenium, Postman, dan Git. Terbiasa mempelajari teknologi baru dengan cepat dan teliti dalam menganalisis bug untuk memastikan kualitas produk.<br /><br /><p><b>Pengalaman Proyek / Portofolio:</b></p>1. Automation Testing Sistem Point Of Sale Modern (Project Pribadi) Menggunakan alat Playwright, K6, Selenium, Postman  untuk membuat script test otomatis pada fitur login, CRUD, Dan lain-lain. Menjalankan test pada browser Chromonium, WebDriver. Membuat laporan hasil testing dalam format HTML.<br />2. API Testing untuk Aplikasi REST Menggunakan Postman untuk menguji fungsionalitas API.<br/>3. Pengujian performa API menggunakan K6 untuk testing beban kerja API.",
    "about.name": "Nama:",
    "about.email": "Email:",
    "about.phone": "Telepon:",
    "about.age": "Usia:",
    "about.ageValue": "24 Tahun",
    "about.address": "Alamat:",
    "about.freelance": "Freelance:",
    "about.freelanceStatus": "Tersedia",

    // About Project Experience
    "about.downloadCV": "Download CV",
    "about.contactMe": "Hubungi Saya",

    // Resume Section
    "resume.subtitle": "Resume",
    "resume.title": "Curriculum Vitae",
    "resume.education": "Pendidikan",
    "resume.experience": "Pengalaman",
    "resume.skills": "Keahlian",

    // Portfolio Section
    "portfolio.subtitle": "Portfolio",
    "portfolio.title": "Karya Terbaik Saya",
    "portfolio.all": "Semua",
    "portfolio.web": "Web",
    "portfolio.app": "App",

    // Experience
    "exp.job1.date": "Jul 2024 - Sekarang, <br />Jakarta, Indonesia.",
    "exp.job1.title": "Staff Support & Deployment Software",
    "exp.job1.company": "PT Murni Solusindo Nusantara",
    "exp.job1.description":
      "• Deployment Software: mengimplementasikan perangkat lunak atau sistem ke dalam lingkungan produksi yang melalui beberapa tahap untuk mengembangkan sistem dengan sukses. Implementasi versi aplikasi terbaru dan pengecekan bug error, <br />• Preventive & Corrective Maintenance: Melakukan perawatan preventif berkala untuk memastikan aplikasi berjalan optimal, dan mengambil tindakan korektif cepat atas gangguan atau masalah yang terjadi.<br />• Cross-Team Coordination: Bekerja sama dengan Quality Assurance dan Helpdesk untuk mengidentifikasi dan menyelesaikan masalah teknis secara tepat waktu. <br />• Customer Support: Menangani keluhan pelanggan terkait penggunaan sistem kami, kemudian memberikan penanganan yang tepat dan cepat saat terjadi masalah sistem. <br />• Monitoring dan Reporting: Membuat checklist dan melakukan monitoring berkala terhadap server aplikasi yang sedang berjalan, termasuk memeriksa log server untuk mendeteksi potensi masalah sebelum berdampak pada operasional. <br />• Problem Analysis and Resolution: Menganalisis masalah yang kompleks, mengoordinasikan solusi dengan tim terkait, dan melaporkan masalah kritis kepada atasan untuk ditindaklanjuti. <br />• Product & Client Management: Bertanggung jawab mengelola produk seperti Kisan KD100, Smartqueue, Smartchequebook (Maveric), Smartforex, dan PID Panelo. Menangani klien besar seperti Bank BNI, Bank BRI, Bank BCA, Bank UOB, Bank SBI, ANTARA News, dan klien strategis lainnya, serta memastikan setiap interaksi memenuhi harapan pelanggan. <br />• Scheduled Maintenance: Memastikan jadwal Preventive dan Corrective Maintenance sesuai dengan kesepakatan pelanggan, dan menyediakan solusi teknis yang tepat dan efisien. <br />• Performance Testing: Melakukan stress testing untuk mesin Kisan KD100 dan Antara PID, terutama untuk klien strategis seperti ANTARA News, untuk memastikan kinerja mesin yang optimal bahkan dalam kondisi beban kerja yang tinggi.",
    "exp.job2.date": "Des 2023 - Mar 2024, <br />Tangerang, Indonesia.",
    "exp.job2.title": "Led Technician Staff (IT Division)",
    "exp.job2.company": "PT Adhi Kartika Jaya (JJ PROMOTION)",
    "exp.job2.description":
      "• Mengganti dan merawat LED Videotron <br />• Merakit dan merawat komputer, berbagai perangkat keras seperti (VGA, RAM dan Motherboard), Instalasi Windows, CCTV <br />• Mendiagnosis masalah perangkat keras dan perangkat lunak komputer <br />• Membuat laporan kegiatan harian <br />• Bekerja sama dalam tim",
    // Services Section
    "services.subtitle": "Layanan",
    "services.title": "Apa Yang Saya Tawarkan",
    "services.webDev.title": "Web Development",
    "services.webDev.description":
      "Pembuatan website profesional dengan teknologi terkini, responsif, dan SEO-friendly untuk berbagai jenis bisnis dan kebutuhan.",
    "services.appDev.title": "App Development",
    "services.appDev.description": "Coming Soon",
    "services.testing.title": "Web Automation Testing",
    "services.testing.description":
      "Cepat dan teliti dalam menganalisis bug untuk memastikan kualitas produk.",
    "services.backend.title": "Backend Development",
    "services.backend.description":
      "Pengembangan sistem backend yang andal, aman, dan scalable untuk mendukung aplikasi web.",
    "services.ecommerce.title": "E-commerce Solutions",
    "services.ecommerce.description":
      "Pembuatan toko online lengkap dengan sistem pembayaran, manajemen produk, dan integrasi dengan sistem lainnya.",
    "services.seo.title": "SEO Optimization",
    "services.seo.description":
      "Optimasi website untuk mesin pencari untuk meningkatkan peringkat dan visibilitas website.",

    // Contact Section
    "contact.subtitle": "Kontak",
    "contact.title": "Hubungi Saya",
    "contact.location.title": "Lokasi",
    "contact.location.value": "Tangerang, Indonesia",
    "contact.email.title": "Email",
    "contact.phone.title": "Telepon",
    "contact.followMe": "Ikuti Saya",
    "contact.form.namePlaceholder": "Nama Anda",
    "contact.form.emailPlaceholder": "Email Anda",
    "contact.form.subjectPlaceholder": "Subjek",
    "contact.form.messagePlaceholder": "Pesan Anda",
    "contact.form.sendButton": "Kirim Pesan",

    // Portfolio Modal
    "portfolio.project.description": "Deskripsi Project",
    "portfolio.project.details": "Detail Project",
    "portfolio.project.client": "Client",
    "portfolio.project.date": "Tanggal",
    "portfolio.project.technologies": "Teknologi",
    "portfolio.project.status": "Status",

    // Skills Section
    "skills.soft.title": "Soft Skills",
    "skills.soft.teamwork": "Team Work",
    "skills.soft.communication": "Komunikasi",
    "skills.soft.automation": "Automation Testing",

    // Validation messages
    "validation.nameRequired": "Nama harus diisi",
    "validation.emailRequired": "Email harus diisi",
    "validation.emailInvalid": "Format email tidak valid",
    "validation.subjectRequired": "Subjek harus diisi",
    "validation.messageRequired": "Pesan harus diisi",
    "validation.success": "Pesan berhasil dikirim!",
    "validation.error": "Terjadi kesalahan. Silakan coba lagi.",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.about": "About Me",
    "nav.resume": "Resume",
    "nav.portfolio": "Portfolio",
    "nav.services": "Services",
    "nav.contact": "Contact",

    // Hero Section
    "hero.greeting": "Hello, I'm",
    "hero.description":
      "I earned a Bachelor's degree in Computer Systems from Serang Raya University. I have more than 1 year of experience in IT. I have logical thinking with a practical approach to solving problems in a job. I will continue to want to learn and develop in the IT field, because I enjoy overcoming challenges and improving my performance.",
    "hero.viewPortfolio": "View Portfolio",
    "hero.contactMe": "Contact Me",

    // About Section
    "about.subtitle": "About Me",
    "about.title": "Getting to Know Me Better",
    "about.experience": "Years of Experience in the IT Field",
    "about.jobTitle": "Junior Quality Assurance",
    "about.description":
      "I am passionate about Software Quality Assurance. I have a basic understanding of manual and automated testing, and am familiar with tools like Playwright, K6, Selenium, Postman, and Git. I am accustomed to learning new technologies quickly and thoroughly analyzing bugs to ensure product quality.<br /><br /><p><b>Project Experience / Portfolio:</b></p>1. Automation Testing of Modern Point of Sale Systems (Personal Project) Using Playwright, K6, Selenium, and Postman to create automated test scripts for login, CRUD, and other features. Running tests on Chromonium and WebDriver browsers. Generating test result reports in HTML format.<br />2. API Testing for REST Applications Using Postman to test API functionality.<br/>3. API performance testing using K6 for API workload testing.",
    "about.name": "Name:",
    "about.email": "Email:",
    "about.phone": "Phone:",
    "about.age": "Age:",
    "about.ageValue": "24 Years",
    "about.address": "Address:",
    "about.freelance": "Freelance:",
    "about.freelanceStatus": "Available",

    // About Project Experience
    "about.downloadCV": "Download CV",
    "about.contactMe": "Contact Me",

    // Resume Section
    "resume.subtitle": "Resume",
    "resume.title": "Curriculum Vitae",
    "resume.education": "Education",
    "resume.experience": "Experience",
    "resume.skills": "Skills",

    // Portfolio Section
    "portfolio.subtitle": "Portfolio",
    "portfolio.title": "My Best Works",
    "portfolio.all": "All",
    "portfolio.web": "Web",
    "portfolio.app": "App",

    // Experience
    "exp.job1.date": "Jul 2024 - Present, <br />Jakarta, Indonesia.",
    "exp.job1.title": "Staff Support & Deployment Software",
    "exp.job1.company": "PT Murni Solusindo Nusantara",
    "exp.job1.description":
      "• Software Deployment: implementing software or systems into production environments through several stages to successfully develop systems. Implementation of the latest application versions and checking for bug errors, <br />• Preventive & Corrective Maintenance: Performing regular preventive maintenance to ensure applications run optimally, and taking quick corrective action on disruptions or problems that occur.<br />• Cross-Team Coordination: Collaborating with Quality Assurance and Helpdesk to identify and resolve technical issues in a timely manner. <br />• Customer Support: Handling customer complaints related to the use of our systems, then providing appropriate and quick handling when system problems occur. <br />• Monitoring and Reporting: Creating checklists and conducting regular monitoring of running application servers, including checking server logs to detect potential problems before impacting operations. <br />• Problem Analysis and Resolution: Analyzing complex problems, coordinating solutions with related teams, and reporting critical issues to superiors for follow-up. <br />• Product & Client Management: Responsible for managing products such as Kisan KD100, Smartqueue, Smartchequebook (Maveric), Smartforex, and PID Panelo. Handling large clients such as Bank BNI, Bank BRI, Bank BCA, Bank UOB, Bank SBI, ANTARA News, and other strategic clients, and ensuring every interaction meets customer expectations. <br />• Scheduled Maintenance: Ensuring Preventive and Corrective Maintenance schedules are in accordance with customer agreements, and providing appropriate and efficient technical solutions. <br />• Performance Testing: Conducting stress testing for Kisan KD100 and Antara PID machines, especially for strategic clients such as ANTARA News, to ensure optimal machine performance even under high workload conditions.",
    "exp.job2.date": "Dec 2023 - Mar 2024, <br />Tangerang, Indonesia.",
    "exp.job2.title": "Led Technician Staff (IT Division)",
    "exp.job2.company": "PT Adhi Kartika Jaya (JJ PROMOTION)",
    "exp.job2.description":
      "• Replacing and maintaining LED videotrons <br />• Assembling and maintaining computers, various hardware such as (VGA, RAM and Motherboard), Windows installation, CCTV <br />•Diagnosing computer hardware and software problems <br />• Creating daily activity reports <br />•Working in a team",
    // Services Section
    "services.subtitle": "Services",
    "services.title": "What I Offer",
    "services.webDev.title": "Web Development",
    "services.webDev.description":
      "Creating professional websites with the latest technology, responsive, and SEO-friendly for various types of businesses and needs.",
    "services.appDev.title": "App Development",
    "services.appDev.description": "Coming Soon",
    "services.testing.title": "Web Automation Testing",
    "services.testing.description":
      "Fast and thorough in analyzing bugs to ensure product quality.",
    "services.backend.title": "Backend Development",
    "services.backend.description":
      "Development of reliable, secure, and scalable backend systems to support web applications.",
    "services.ecommerce.title": "E-commerce Solutions",
    "services.ecommerce.description":
      "Creating complete online stores with payment systems, product management, and integration with other systems.",
    "services.seo.title": "SEO Optimization",
    "services.seo.description":
      "Website optimization for search engines to improve ranking and website visibility.",

    // Contact Section
    "contact.subtitle": "Contact",
    "contact.title": "Contact Me",
    "contact.location.title": "Location",
    "contact.location.value": "Tangerang, Indonesia",
    "contact.email.title": "Email",
    "contact.phone.title": "Phone",
    "contact.followMe": "Follow Me",
    "contact.form.namePlaceholder": "Your Name",
    "contact.form.emailPlaceholder": "Your Email",
    "contact.form.subjectPlaceholder": "Subject",
    "contact.form.messagePlaceholder": "Your Message",
    "contact.form.sendButton": "Send Message",

    // Portfolio Modal
    "portfolio.project.description": "Project Description",
    "portfolio.project.details": "Project Details",
    "portfolio.project.client": "Client",
    "portfolio.project.date": "Date",
    "portfolio.project.technologies": "Technologies",
    "portfolio.project.status": "Status",

    // Skills Section
    "skills.soft.title": "Soft Skills",
    "skills.soft.teamwork": "Team Work",
    "skills.soft.communication": "Communication",
    "skills.soft.automation": "Automation Testing",

    // Validation messages
    "validation.nameRequired": "Name is required",
    "validation.emailRequired": "Email is required",
    "validation.emailInvalid": "Invalid email format",
    "validation.subjectRequired": "Subject is required",
    "validation.messageRequired": "Message is required",
    "validation.success": "Message sent successfully!",
    "validation.error": "An error occurred. Please try again.",
  },
};

function initLanguageToggle() {
  const langOptions = document.querySelectorAll(".lang-option");
  const currentLang = localStorage.getItem("language") || "id";

  // Set initial active language
  setActiveLanguage(currentLang);
  changeLanguage(currentLang);

  langOptions.forEach((option) => {
    option.addEventListener("click", function () {
      const selectedLang = this.getAttribute("data-lang");
      setActiveLanguage(selectedLang);
      changeLanguage(selectedLang);
      localStorage.setItem("language", selectedLang);
    });
  });
}

function setActiveLanguage(lang) {
  const langOptions = document.querySelectorAll(".lang-option");
  langOptions.forEach((option) => {
    option.classList.remove("active");
    if (option.getAttribute("data-lang") === lang) {
      option.classList.add("active");
    }
  });
}

function changeLanguage(lang) {
  const elements = document.querySelectorAll("[data-lang-key]");

  elements.forEach((element) => {
    const key = element.getAttribute("data-lang-key");
    if (translations[lang] && translations[lang][key]) {
      // Check if element has placeholder attribute
      if (element.hasAttribute("placeholder")) {
        element.placeholder = translations[lang][key];
      } else {
        element.innerHTML = translations[lang][key];
      }
    }
  });

  // Update HTML lang attribute
  document.documentElement.lang = lang;

  // Update page title
  if (lang === "en") {
    document.title = "Portfolio & CV Faqih";
  } else {
    document.title = "Portfolio & CV Faqih";
  }
}
