const html = document.documentElement;
const lightBtn = document.querySelector('.theme-btn.light-btn');
const darkBtn = document.querySelector('.theme-btn.dark-btn');

function setTheme(theme) {
  if (!html) return;
  html.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  if (lightBtn && darkBtn) {
    lightBtn.classList.toggle('active', theme === 'light');
    darkBtn.classList.toggle('active', theme === 'dark');
  }
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light' || savedTheme === 'dark') {
  setTheme(savedTheme);
} else {
  setTheme('dark');
}

if (lightBtn) {
  lightBtn.addEventListener('click', () => setTheme('light'));
}
if (darkBtn) {
  darkBtn.addEventListener('click', () => setTheme('dark'));
}


const navLinks = document.querySelectorAll('a[href^="#"]');

navLinks.forEach(link => {
  link.addEventListener('click', event => {
    const targetId = link.getAttribute('href');
    if (!targetId || targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});


const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const button = item.querySelector('.faq-question');
  if (!button) return;

  button.addEventListener('click', () => {
    const isActive = item.classList.contains('active');

    faqItems.forEach(i => i.classList.remove('active'));

    if (!isActive) {
      item.classList.add('active');
    }
  });
});

// NAVBAR hide on scroll down / show on scroll up
let lastScrollY = window.scrollY;
const headerEl = document.querySelector('.header');

window.addEventListener('scroll', () => {
  if (!headerEl) return;

  const currentY = window.scrollY;

  if (currentY > lastScrollY && currentY > 120) {
    // scroll vers le bas
    headerEl.classList.add('header--hidden');
  } else {
    // scroll vers le haut
    headerEl.classList.remove('header--hidden');
  }

  lastScrollY = currentY;
});



document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".plugin-card");

  // ---- ANIMATION AU SCROLL (ton code) ----
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    cards.forEach((card) => observer.observe(card));
  } else {
    // Fallback vieux navigateurs : on montre tout
    cards.forEach((card) => card.classList.add("is-visible"));
  }

  // ---- MODAL PRODUIT ----
  const modalOverlay = document.getElementById("plugin-modal");
  if (!modalOverlay) return; // sécurité si le HTML du modal n'est pas encore là

  const modalTitle = modalOverlay.querySelector(".plugin-modal-title");
  const modalSubtitle = modalOverlay.querySelector(".plugin-modal-subtitle");
  const modalBadge = modalOverlay.querySelector(".plugin-modal-badge");
  const commandsList = modalOverlay.querySelector(".plugin-modal-commands");
  const contentList = modalOverlay.querySelector(".plugin-modal-content");
  const downloadBtn = modalOverlay.querySelector(".plugin-download-btn");
  const closeBtn = modalOverlay.querySelector(".plugin-modal-close");

  function openModalFromCard(card) {
    const name = card.dataset.name || "";
    const description = card.dataset.description || "";
    const badge = card.dataset.badge || "Plugin";
    const commands = (card.dataset.commands || "").split("|");
    const content = (card.dataset.content || "").split("|");
    const downloadUrl = card.dataset.download || "#";

    modalTitle.textContent = name;
    modalSubtitle.textContent = description;
    modalBadge.textContent = badge;

    commandsList.innerHTML = "";
    commands
      .filter((c) => c.trim() !== "")
      .forEach((cmd) => {
        const li = document.createElement("li");
        li.textContent = cmd.trim();
        commandsList.appendChild(li);
      });

    contentList.innerHTML = "";
    content
      .filter((c) => c.trim() !== "")
      .forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item.trim();
        contentList.appendChild(li);
      });

    downloadBtn.href = downloadUrl;

    modalOverlay.classList.add("open");
  }

  cards.forEach((card) => {
    card.addEventListener("click", (e) => {
      // si plus tard tu mets un vrai bouton dans la carte, on pourra l'exclure ici
      openModalFromCard(card);
    });
  });

  function closeModal() {
    modalOverlay.classList.remove("open");
  }

  closeBtn.addEventListener("click", closeModal);

  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
    }
  });
});

