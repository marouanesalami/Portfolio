/* =========================================
   PORTFOLIO MAROUANE SALAMI - 2026
   JavaScript Principal
========================================= */

/* =========================================
   CURSEUR PERSONNALISÉ ACTIF PARTOUT
========================================= */
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;
    cursorOutline.style.left = `${posX}px`;
    cursorOutline.style.top = `${posY}px`;
});

// Effet hover sur liens et boutons
document.querySelectorAll('a, button, .carousel-card, .tool-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
    el.addEventListener('mouseleave', () => {
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});

/* =========================================
   PRELOADER AVEC ANIMATION NETFLIX
========================================= */
const preloader = document.getElementById('preloader');
const starContainer = document.getElementById('starContainer');
const introText = document.getElementById('introText');
const sliderContainer = document.getElementById('sliderContainer');
const sliderThumb = document.getElementById('sliderThumb');

// Texte à taper
const textToType = "Bienvenue sur mon portfolio...";
let charIndex = 0;

// Effet machine à écrire
function typeWriter() {
    if (charIndex < textToType.length) {
        introText.textContent += textToType.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 80);
    }
}

// Démarrer l'animation après le dessin de l'étoile (2s)
setTimeout(() => {
    typeWriter();
}, 2200);

// Slider pour entrer
let isDragging = false;
let startX = 0;
let currentX = 0;

sliderThumb.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    sliderThumb.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    currentX = e.clientX - startX;
    const maxSlide = sliderContainer.offsetWidth - sliderThumb.offsetWidth - 4;

    if (currentX < 0) currentX = 0;
    if (currentX > maxSlide) currentX = maxSlide;

    sliderThumb.style.left = `${currentX + 2}px`;

    // Si glissé à plus de 80%
    if (currentX > maxSlide * 0.8) {
        triggerEntrance();
    }
});

document.addEventListener('mouseup', () => {
    if (isDragging && currentX < (sliderContainer.offsetWidth - sliderThumb.offsetWidth - 4) * 0.8) {
        // Revenir au début si pas assez glissé
        sliderThumb.style.left = '2px';
    }
    isDragging = false;
    sliderThumb.style.cursor = 'grab';
    startX = 0;
    currentX = 0;
});

// Support tactile
sliderThumb.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
});

document.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    currentX = e.touches[0].clientX - startX;
    const maxSlide = sliderContainer.offsetWidth - sliderThumb.offsetWidth - 4;

    if (currentX < 0) currentX = 0;
    if (currentX > maxSlide) currentX = maxSlide;

    sliderThumb.style.left = `${currentX + 2}px`;

    if (currentX > maxSlide * 0.8) {
        triggerEntrance();
    }
});

document.addEventListener('touchend', () => {
    if (isDragging && currentX < (sliderContainer.offsetWidth - sliderThumb.offsetWidth - 4) * 0.8) {
        sliderThumb.style.left = '2px';
    }
    isDragging = false;
    startX = 0;
    currentX = 0;
});

// ANIMATION STYLE NETFLIX
function triggerEntrance() {
    isDragging = false;

    // Masquer le texte et le slider
    introText.parentElement.style.opacity = '0';
    sliderContainer.style.opacity = '0';

    // Après 300ms, agrandir l'étoile (scale 20x en 1.5s)
    setTimeout(() => {
        starContainer.style.transform = 'scale(20)';
        starContainer.style.opacity = '0';
    }, 300);

    // Après 1.8s, fondu complet du preloader
    setTimeout(() => {
        preloader.style.opacity = '0';
    }, 1800);

    // Après 2.4s, masquer complètement le preloader
    setTimeout(() => {
        preloader.style.display = 'none';
        document.body.style.overflow = 'auto';

        // Afficher le progress widget
        document.getElementById('progressWidget').style.opacity = '1';

        // Afficher le bandeau cookies si pas déjà accepté
        showCookieBanner();
    }, 2400);
}

/* =========================================
   BANDEAU COOKIES RGPD
========================================= */
function showCookieBanner() {
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
        setTimeout(() => {
            document.getElementById('cookieBanner').classList.add('show');
        }, 1000);
    }
}

function acceptCookies() {
    localStorage.setItem('cookieConsent', 'accepted');
    document.getElementById('cookieBanner').classList.remove('show');
}

function refuseCookies() {
    localStorage.setItem('cookieConsent', 'refused');
    document.getElementById('cookieBanner').classList.remove('show');
}

/* =========================================
   NAVBAR AVEC DÉTECTION SECTION ACTIVE
========================================= */
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-item');

function updateActiveNav() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);

// Scroll smooth vers sections
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = item.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });
        }

        // Fermer le menu mobile si ouvert
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

/* =========================================
   MENU HAMBURGER AVEC FERMETURE EXTÉRIEUR
========================================= */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Fermeture au clic extérieur
document.addEventListener('click', (e) => {
    if (mobileMenu.classList.contains('active') && 
        !mobileMenu.contains(e.target) && 
        !hamburger.contains(e.target)) {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Fermeture au clic sur un lien mobile
document.querySelectorAll('.mobile-nav-item').forEach(item => {
    item.addEventListener('click', () => {
        if (!item.classList.contains('cv-download-mobile')) {
            mobileMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

/* =========================================
   THEME SWITCHER
========================================= */
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Charger le thème sauvegardé
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

/* =========================================
   PROGRESS BAR SCROLL
========================================= */
window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    document.getElementById('progressFill').style.height = `${scrolled}%`;
    document.getElementById('progressText').textContent = `${Math.round(scrolled)}%`;
});

/* =========================================
   BACKGROUND CANVAS PARTICLES
========================================= */
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 100;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }

    draw() {
        ctx.fillStyle = `rgba(59, 130, 246, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

/* =========================================
   TYPING EFFECT MÉTIERS
========================================= */
class TypeWriter {
    constructor(txtElement, words, wait = 2000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        let typeSpeed = 150;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const txtElement = document.querySelector('.txt');
    const words = JSON.parse(txtElement.parentElement.getAttribute('data-words'));
    const wait = txtElement.parentElement.getAttribute('data-wait');
    new TypeWriter(txtElement, words, wait);
});

/* =========================================
   REVEAL ON SCROLL
========================================= */
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', reveal);
reveal();

/* =========================================
   CAROUSEL PROJETS 3D - VERSION CORRIGÉE
========================================= */
let currentIndex = 0;
const cards = Array.from(document.querySelectorAll('.carousel-card'));
let visibleCards = [...cards]; // 🔧 NOUVEAU : Liste des cartes visibles après filtrage

function updateCarousel() {
    // 🔧 CORRIGÉ : Utilise visibleCards au lieu de cards
    const totalVisible = visibleCards.length;

    // Réinitialiser toutes les cartes
    cards.forEach(card => {
        card.classList.remove('c-center', 'c-left', 'c-right', 'c-hidden');
        card.classList.add('c-hidden');
    });

    // Appliquer les classes uniquement aux cartes visibles
    visibleCards.forEach((card, index) => {
        if (index === currentIndex) {
            card.classList.remove('c-hidden');
            card.classList.add('c-center');
        } else if (index === (currentIndex - 1 + totalVisible) % totalVisible) {
            card.classList.remove('c-hidden');
            card.classList.add('c-left');
        } else if (index === (currentIndex + 1) % totalVisible) {
            card.classList.remove('c-hidden');
            card.classList.add('c-right');
        }
    });

    // 🔧 CORRIGÉ : Affiche le bon nombre de cartes visibles
    document.getElementById('carouselIndicator').textContent = `${currentIndex + 1} / ${totalVisible}`;
}

function moveCarousel(direction) {
    // 🔧 CORRIGÉ : Utilise visibleCards.length au lieu de totalCards
    const totalVisible = visibleCards.length;
    if (totalVisible === 0) return; // Sécurité si aucune carte visible

    currentIndex = (currentIndex + direction + totalVisible) % totalVisible;
    updateCarousel();
}

updateCarousel();

/* =========================================
   FILTRES PROJETS - VERSION CORRIGÉE
========================================= */
const filterBtns = document.querySelectorAll('.filter-btn');
let currentCategory = 'all';
let currentType = 'all';

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const category = btn.getAttribute('data-category');
        const type = btn.getAttribute('data-type');

        if (category) {
            // Réinitialiser les autres boutons de catégorie
            document.querySelectorAll('[data-category]').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = category;
        }

        if (type) {
            // Toggle pour les types
            if (btn.classList.contains('active')) {
                btn.classList.remove('active');
                currentType = 'all';
            } else {
                document.querySelectorAll('[data-type]').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentType = type;
            }
        }

        filterCards();
    });
});

function filterCards() {
    // 🔧 CORRIGÉ : Reconstruction de la liste des cartes visibles
    visibleCards = [];

    cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        const cardType = card.getAttribute('data-type');

        const categoryMatch = currentCategory === 'all' || cardCategory === currentCategory;
        const typeMatch = currentType === 'all' || cardType === currentType;

        if (categoryMatch && typeMatch) {
            card.style.display = '';
            visibleCards.push(card); // 🔧 NOUVEAU : Ajouter à la liste des visibles
        } else {
            card.style.display = 'none';
        }
    });

    // 🔧 NOUVEAU : Réinitialiser l'index si nécessaire
    if (visibleCards.length > 0) {
        if (currentIndex >= visibleCards.length) {
            currentIndex = 0;
        }
    } else {
        currentIndex = 0;
    }

    updateCarousel();
}

/* =========================================
   DONNÉES DES PROJETS - 12 PROJETS COMPLETS
========================================= */
const projectsData = [
    // PROJET 1 - CALCULE COMME CÉSAR
    {
        tag: "Site Éducatif",
        title: "Calcule comme César",
        description: "Projet universitaire (SAE 203) consistant en une plateforme e-learning communautaire sur les mathématiques romaines. Le site intègre un espace membre complet permettant aux utilisateurs de s'inscrire, de suivre leur progression et d'interagir via un espace commentaires.",
        objectives: "Développer un système d'inscription et de connexion sécurisé (hachage des mots de passe, protection contre les failles XSS/SQL). Maintenir la connexion de l'utilisateur à travers les pages et restreindre l'accès à certaines fonctionnalités (poster un commentaire). Structurer le code pour gérer proprement les modèles (Utilisateurs, Articles et Commentaires).",
        technologies: ["PHP 8", "MySQL", "Sessions & Auth", "Architecture MVC", "HTML5/CSS3"],
        result: "Site 100% fonctionnel avec gestion de compte utilisateur. Le système de commentaires dynamiques favorise l'interaction, et la base de données relationnelle gère efficacement les liens entre utilisateurs et contenus.",
        images: [
            "https://res.cloudinary.com/dbmabn5zu/image/upload/v1769351631/riseshot-17692587134988561_chelps.png",
            "https://res.cloudinary.com/dbmabn5zu/image/upload/v1769351631/riseshot-17692600063084760_gd7xea.png",
            "https://res.cloudinary.com/dbmabn5zu/image/upload/v1769351631/riseshot-17692589414935098_jtm0um.png"
        ],
        liveLink: "https://tpfront.alwaysdata.net/cesar/index.php",
        githubLink: "#"
    },

    // PROJET 2 - BAROMÈTRE CLIMATIQUE
    {
        tag: "Data Visualisation",
        title: "Baromètre Climatique",
        description: "Tableau de bord interactif (Dashboard) permettant de visualiser les données d'un sondage national sur le changement climatique. L'interface adopte un style cybernéon pour une immersion totale, avec une carte de France interactive.",
        objectives: "Transformer un jeu de données brut (fichier CSV volumineux) en informations visuelles claires et engageantes. Maîtriser la librairie D3.js pour générer des graphiques dynamiques qui se mettent à jour instantanément selon le département sélectionné.",
        technologies: ["JavaScript ES6", "D3.js", "CSS3 Animations", "Parsing CSV"],
        result: "Dashboard performant capable de traiter et d'afficher des milliers de données en temps réel. Visualisation intuitive (Carte, Radar, Donut chart) avec une identité visuelle forte et unique.",
        images: [
            "https://res.cloudinary.com/dbmabn5zu/image/upload/v1769352219/riseshot-17692823874462806_vuxiap.png",
            "https://res.cloudinary.com/dbmabn5zu/image/upload/v1769352220/riseshot-17693504891174271_kabedv.png",
            "https://res.cloudinary.com/dbmabn5zu/image/upload/v1769352956/riseshot-17693529122434515_us8gjb.png"
        ],
        liveLink: " https://marouanesalami.github.io/barom-tre-visualisation-climat/",
        githubLink: " https://marouanesalami.github.io/barom-tre-visualisation-climat"
    },

    // PROJET 3 - TIFLOW BARBER
    {
        tag: "App Business",
        title: "Tiflow Barber",
        description: "Conception et développement d'une application web sur-mesure pour un salon de coiffure parisien. L'objectif était de créer une alternative indépendante aux plateformes onéreuses type Planity. L'application gère le flux complet du choix des prestations par le client jusqu'à l'encaissement et la gestion comptable (Ticket Z) par les coiffeurs.",
        objectives: "Supprimer les frais de commissions des plateformes tierces en déployant une solution propriétaire sans abonnement. Développer une interface Mobile First fluide avec un design soigné (Glassmorphism, Dark/Light mode) reflétant l'identité luxe du salon. Utiliser une base de données NoSQL (Firebase) pour gérer les créneaux disponibles instantanément et éviter les doubles réservations entre les différents coiffeurs.",
        technologies: ["JavaScript ES6", "Tailwind CSS", "Firebase Firestore & Auth", "EmailJS Notifications", "API Google Maps"],
        result: "Livraison d'une solution fonctionnelle permettant au commerce d'économiser ses frais de plateforme mensuels. L'application intègre un système de panier dynamique, une gestion multi-collaborateurs et une automatisation des emails de confirmation.",
        images: [
            "https://res.cloudinary.com/dbmabn5zu/image/upload/v1769354608/Earth_colors_boho_tablet_mockup_wood_shapes_zirbsw.png",
            "https://res.cloudinary.com/dbmabn5zu/image/upload/v1769354611/Earth_colors_boho_tablet_mockup_wood_shapes_1_bfe1ry.png"
        ],
        liveLink: "https://marouanesalami.github.io/tiflow-barber-site/",
        githubLink: "https://marouanesalami.github.io/tiflow-barber-site"
    },

    // PROJET 4 - FREELANCE ARCHITECT
    {
        tag: "Outil Utilitaire",
        title: "Freelance Architect",
        description: "Développement d'un outil de calcul financier destiné aux freelances et auto-entrepreneurs. L'application permet de définir son Taux Journalier Moyen (TJM) non pas au hasard, mais en fonction de ses besoins de vie réels (loyer, épargne) et de ses charges professionnelles.",
        objectives: "Créer un algorithme en JavaScript pur (Vanilla JS) qui recalcule instantanément tous les résultats (Salaire net, Chiffre d'affaire, Taxes) à chaque modification d'un curseur ou d'un champ. Concevoir une interface utilisateur (UI) de type SaaS Fintech propre et rassurante, en utilisant des variables CSS et une mise en page responsive (Grid/Flexbox). Guider l'utilisateur étape par étape pour transformer des données complexes (fiscalité, jours ouvrés) en une information simple et actionnable.",
        technologies: ["HTML5", "CSS3 Variables & Glassmorphism", "JavaScript", "DOM Manipulation", "Math logic"],
        result: "Un outil performant, sans dépendance externe, qui offre une expérience fluide. Le code est structuré pour être facilement maintenable et évolutif (ajout futur d'export PDF).",
        images: [
            "https://res.cloudinary.com/dbmabn5zu/image/upload/v1769353175/riseshot-17693530304885176_almyyb.png",
            "https://res.cloudinary.com/dbmabn5zu/image/upload/v1769353490/riseshot-17693533315068970_sgt5mm.png",
            "https://res.cloudinary.com/dbmabn5zu/image/upload/v1769353480/riseshot-17693534283611780_zyqh8t.png"
        ],
        liveLink: "https://marouanesalami.github.io/Freelance-Architect-/",
        githubLink: "https://marouanesalami.github.io/Freelance-Architect-"
    },

    // PROJET 5 - FAIR-SQUAD
    {
        tag: "Algorithme",
        title: "Fair-Squad",
        description: "Création d'une application web pour résoudre un problème récurrent lors des matchs de sport entre amis : créer des équipes équilibrées rapidement. L'outil utilise un algorithme de tri pour répartir les joueurs équitablement en fonction de leur niveau.",
        objectives: "Implémenter un algorithme de distribution (Greedy Algorithm ou tri serpent) qui classe les joueurs par niveau et les distribue pour minimiser l'écart de score total entre les deux équipes. Créer une interface dynamique permettant d'ajouter, noter et supprimer des joueurs à la volée avant de générer les équipes. Afficher graphiquement la balance de force entre les deux équipes pour confirmer l'équité du match.",
        technologies: ["JavaScript", "Arrays & Sort methods", "CSS3 Design Néon/Sport", "HTML5"],
        result: "Une application simple mais efficace qui répond parfaitement à un besoin utilisateur réel. Le projet met en avant la capacité à traduire une logique mathématique en code fonctionnel.",
        images: [
            "https://res.cloudinary.com/dbmabn5zu/image/upload/v1769355658/final_mobile_rsoujt.png"
        ],
        liveLink: "https://marouanesalami.github.io/Fair-squad/",
        githubLink: "https://marouanesalami.github.io/Fair-squad"
    },

    // PROJET 6 - API DASHBOARD COLLECTION
    {
        tag: "Intégration API",
        title: "API Dashboard Collection",
        description: "Duo d'applications web développées pour maîtriser les interactions avec des services tiers (APIs). Module 1 : Météo Vibe - Interface météo au design Glassmorphism connectée à OpenWeatherMap avec système de Mode Simulation intelligent. Module 2 : Nutri-Truth Scanner - Outil d'analyse nutritionnelle connecté à OpenFoodFacts avec recherche instantanée et analyse détaillée.",
        objectives: "Maîtriser l'asynchrone en utilisant async/await et fetch pour effectuer des requêtes HTTP sans bloquer l'interface. Parser des réponses JSON complexes (objets imbriqués) pour en extraire uniquement l'information utile à l'utilisateur. Implémenter des stratégies de repli (fallback) pour assurer la robustesse de l'application face aux aléas du réseau.",
        technologies: ["Vanilla JS ES6", "Fetch API", "CSS3 Glassmorphism & Animations", "OpenData APIs"],
        result: "Deux interfaces réactives et esthétiques qui transforment des données brutes en informations visuelles claires. Elles prouvent une autonomie dans l'utilisation de documentations techniques externes.",
        images: [
            "https://res.cloudinary.com/dbmabn5zu/image/upload/v1769355270/final_q9f6ba.png",
            "https://res.cloudinary.com/dbmabn5zu/image/upload/v1769355254/Earth_colors_boho_tablet_mockup_wood_shapes_2_iweoze.png"
        ],
        liveLink: "https://marouanesalami.github.io/meteo/",
        githubLink: "https://marouanesalami.github.io/meteo"
    },

    // PROJET 7 - RÉSEAU ALUMNI USPN
    {
        tag: "UX/UI Design",
        title: "Réseau Alumni USPN",
        description: "Projet de conception (8 semaines) visant à créer la plateforme officielle des anciens élèves de l'Université Sorbonne Paris Nord. L'outil est une solution hybride entre un CRM (gestion de la relation) et un Réseau Social Professionnel, connectant étudiants, diplômés, enseignants et entreprises partenaires.",
        objectives: "Création d'une bibliothèque de composants atomiques réutilisables (Boutons, Cartes, Typographie) respectant la charte graphique de l'université pour garantir la cohérence visuelle. Définition de Personas (Étudiant, Recruteur, Admin) et cartographie des parcours utilisateurs complexes (Inscription, Recherche d'emploi, Matching mentorat). Conception de maquettes haute-fidélité interactives pour les fonctionnalités clés : Tableau de bord personnalisé, Annuaire filtrable et Espace Recruteur.",
        technologies: ["Figma", "FigJam", "Design Thinking", "Prototypage", "Auto-layout", "Travail Collaboratif Agile"],
        result: "Livraison d'un prototype interactif complet prêt à être développé. Le projet a permis de structurer une réponse design complexe répondant à un cahier des charges institutionnel précis.",
        images: [
            "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
        ],
        liveLink: "#",
        githubLink: "#"
    },

    // PROJET 8 - AGENCE IMMOBILIÈRE SEO
    {
        tag: "SEO & Web Design",
        title: "Agence Immobilière : Architecture SEO",
        description: "Projet universitaire (Module R306) axé sur la conception 'SEO-First' d'un site pour une agence immobilière en Bretagne. Contrairement à une approche classique, le design a été entièrement piloté par les contraintes de référencement naturel pour garantir une visibilité maximale sur les moteurs de recherche dès le lancement.",
        objectives: "Analyse concurrentielle et définition d'une liste de 30 mots-clés stratégiques (Génériques, Moyenne et Longue traîne) pour structurer l'arborescence du site. Conception des maquettes en anticipant les métriques de Google (LCP, CLS, FID) pour assurer un temps de chargement optimal et une stabilité visuelle. Hiérarchisation stricte du contenu (Balisage H1, H2, H3) et optimisation des métadonnées (Title, Description) pour chaque page clé (Accueil, Catalogue, Fiche Bien).",
        technologies: ["Figma", "Design System", "Maquettage Mobile-First", "Audit SEO", "Lighthouse", "Core Web Vitals", "Sémantique HTML5"],
        result: "Livraison d'un prototype fonctionnel accompagné d'un audit technique complet. Le projet démontre qu'un beau design peut (et doit) être au service de la performance technique et du positionnement marketing.",
        images: [
            "https://res.cloudinary.com/dbmabn5zu/image/upload/v1769427421/4_dyecm6.png"
           "https://res.cloudinary.com/dbmabn5zu/image/upload/v1769427423/5_qujfaf.png"
        ],
        liveLink: "#",
        githubLink: "#"
    },

    // PROJET 9 - MASTER-WORD
    {
        tag: "Backend PHP",
        title: "Master-Word : Jeu de Lettres Multijoueur",
        description: "Projet individuel de développement (SAE 203) consistant à recréer la mécanique du célèbre jeu télévisé 'Motus' (ou Wordle) sous forme d'application web. L'intégralité du moteur de jeu a été développée en PHP Natif (sans framework) pour démontrer une maîtrise parfaite de la Programmation Orientée Objet (POO).",
        objectives: "Concevoir la logique de validation des mots : vérification de l'existence dans le dictionnaire, gestion des lettres bien placées (Vert), mal placées (Jaune) ou absentes. Séparer strictement le code en Modèles (Données), Vues (Interface) et Contrôleurs (Logique) pour un code maintenable et professionnel. Implémenter un mode Multijoueur compétitif avec un système d'authentification sécurisé (hachage Bcrypt) et un classement (Leaderboard) persistant en base de données.",
        technologies: ["PHP 8 Natif", "POO", "MySQL", "PDO", "Librairie GD", "Sessions PHP", "Architecture MVC"],
        result: "Une application web complète proposant deux modes de jeu (Solo avec difficulté variable & Multijoueur). La gestion des états de jeu via les sessions PHP permet une expérience fluide, et le code respecte les standards de sécurité actuels (Injections SQL, XSS).",
        images: [
            "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=800&h=600&fit=crop"
        ],
        liveLink: "#",
        githubLink: "#"
    },

    // PROJET 10 - DIAGNOSTIC PRÉDICTIF
    {
        tag: "Data Science",
        title: "Diagnostic Prédictif : Tumeurs Mammaires",
        description: "Projet d'analyse de données (Data Mining) réalisé dans le cadre de la SAE 203 sur un jeu de données médicales réelles. L'objectif était de développer un modèle statistique capable de prédire avec précision si une tumeur est bénigne ou maligne en fonction de caractéristiques physiques mesurées (rayon, texture, concavité, etc.).",
        objectives: "Analyse approfondie des distributions via des histogrammes comparatifs pour identifier les variables les plus discriminantes (ex: le rayon moyen et les points concaves séparent nettement les cas). Utilisation de matrices de corrélation et de nuages de points pour comprendre les interactions entre les variables (ex: lien fort entre le rayon et le périmètre) et éviter la redondance d'information. Mise en place d'un modèle de régression/classification supervisée. Validation de la performance via une matrice de confusion pour minimiser les erreurs de diagnostic (Faux Négatifs/Positifs).",
        technologies: ["Langage R", "Python", "Statistiques Descriptives", "Machine Learning", "Matrice de Confusion", "Visualisation de données", "Seaborn/Matplotlib"],
        result: "Développement d'un modèle performant atteignant 93% de précision globale (Accuracy). L'analyse a permis d'isoler les facteurs de risque critiques (Rayon, Périmètre, Aire), fournissant un outil d'aide à la décision clinique fiable.",
        images: [
           "https://res.cloudinary.com/dbmabn5zu/image/upload/v1769363793/Capture_d_%C3%A9cran_2026-01-25_183909_j4ezyq.png"
           "https://res.cloudinary.com/dbmabn5zu/image/upload/v1769427425/10_uridu2.png"
           "https://res.cloudinary.com/dbmabn5zu/image/upload/v1769427425/11_xipnnq.png"
           "https://res.cloudinary.com/dbmabn5zu/image/upload/v1769427427/9_ndc1jp.png"
        ],
        liveLink: "#",
        githubLink: "#"
    },

    // PROJET 11 - IMMO-STRATÉGIE
    {
        tag: "Business Intelligence",
        title: "Immo-Stratégie : Implantation Sociale",
        description: "Projet de simulation professionnelle (SAE 206) réalisé en équipe pour le compte de la Fédération des Entreprises Sociales pour l'Habitat (ESH). La mission consistait à agir comme un cabinet de conseil pour identifier les zones géographiques prioritaires pour l'implantation de nouveaux logements sociaux en France.",
        objectives: "Extraire et nettoyer des données démographiques et économiques massives issues de l'INSEE (Open Data). Mettre en corrélation plusieurs indicateurs (Taux de pauvreté, vieillissement de la population, saturation du parc immobilier existant) pour repérer les zones en tension. Créer des tableaux de bord interactifs et des cartes thermiques (Heatmaps) pour rendre les statistiques lisibles par le client.",
        technologies: ["Tableau Software", "Dashboarding", "Données INSEE", "Excel", "Nettoyage de données", "Canva", "Data Visualization"],
        result: "Livraison d'un rapport stratégique validé par le client. L'analyse a permis d'isoler trois départements critiques nécessitant une intervention urgente : la Seine-Saint-Denis (93), le Nord (59) et le Rhône (69), en se basant sur des preuves chiffrées irréfutables.",
        images: [
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
           "https://res.cloudinary.com/dbmabn5zu/image/upload/v1769427421/6_sp4oyj.png"
           "https://res.cloudinary.com/dbmabn5zu/image/upload/v1769427420/8_kgcded.png"
           "https://res.cloudinary.com/dbmabn5zu/image/upload/v1769427421/7_oeubja.png"
        ],
        liveLink: "#",
        githubLink: "#"
    },

    // PROJET 12 - SAINBIO'Z
    {
        tag: "Intégration Web",
        title: "Sainbio'z : Refonte Digitale",
        description: "Projet de développement 'fil rouge' visant la digitalisation complète d'un primeur bio historique (35 ans d'existence). Le site est conçu comme une vitrine multi-facettes : présentation institutionnelle, catalogue produits, blog d'actualités et portail dédié aux professionnels (B2B). Actuellement en phase d'intégration technique.",
        objectives: "Mise en place d'une architecture HTML5 rigoureuse (Header, Nav, Main, Footer) optimisée pour le SEO local dès la conception. Création d'un fichier CSS global utilisant des variables CSS (:root) pour gérer facilement les couleurs (Vert Bio, Or) et la maintenance future. Développement de scripts en Vanilla JS pour gérer le menu responsive, les animations au défilement (Scroll Reveal) et les carrousels d'avis clients, sans dépendre de librairies lourdes.",
        technologies: ["HTML5", "Multi-pages", "CSS3", "Flexbox/Grid", "Variables CSS", "JavaScript", "Intersection Observer API", "Responsive Design"],
        result: "L'architecture technique est déployée (Routing, fichiers statiques, Design System de base). Le squelette des pages clés (Accueil, Blog, Contact, B2B) est intégré et responsive. Le projet est en phase de peuplement de contenu et d'optimisation finale.",
        images: [
            "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&h=600&fit=crop"
        ],
        liveLink: "#",
        githubLink: "#"
    }
];

/* =========================================
   MODALES PROJETS AVEC CAROUSEL IMAGES
========================================= */
let currentModalImageIndex = 0;
let currentProject = null;

function openProject(index) {
    currentProject = projectsData[index];
    currentModalImageIndex = 0;
    const modal = document.getElementById('projectModal');

    // Remplir les informations
    document.getElementById('mTag').textContent = currentProject.tag;
    document.getElementById('mTitle').textContent = currentProject.title;
    document.getElementById('mDesc').textContent = currentProject.description;
    document.getElementById('mObjectives').textContent = currentProject.objectives;
    document.getElementById('mResult').textContent = currentProject.result;

    // Technologies
    const toolsContainer = document.getElementById('mTools');
    toolsContainer.innerHTML = '';
    currentProject.technologies.forEach(tech => {
        const span = document.createElement('span');
        span.className = 'm-tool';
        span.textContent = tech;
        toolsContainer.appendChild(span);
    });

    // Carousel d'images
    const imagesContainer = document.getElementById('modalCarouselImages');
    const dotsContainer = document.getElementById('modalCarouselDots');

    imagesContainer.innerHTML = '';
    dotsContainer.innerHTML = '';

    currentProject.images.forEach((imgSrc, idx) => {
        const img = document.createElement('img');
        img.src = imgSrc;
        img.className = `modal-carousel-image${idx === 0 ? ' active' : ''}`;
        img.alt = `${currentProject.title} - Image ${idx + 1}`;
        imagesContainer.appendChild(img);

        const dot = document.createElement('div');
        dot.className = `modal-carousel-dot${idx === 0 ? ' active' : ''}`;
        dot.onclick = () => goToModalImage(idx);
        dotsContainer.appendChild(dot);
    });

    // Liens
    document.getElementById('mLiveLink').href = currentProject.liveLink;
    document.getElementById('mGithubLink').href = currentProject.githubLink;

    modal.classList.add('open');
}

function changeModalImage(direction) {
    if (!currentProject) return;
    currentModalImageIndex = (currentModalImageIndex + direction + currentProject.images.length) % currentProject.images.length;
    updateModalCarousel();
}

function goToModalImage(index) {
    currentModalImageIndex = index;
    updateModalCarousel();
}

function updateModalCarousel() {
    const images = document.querySelectorAll('.modal-carousel-image');
    const dots = document.querySelectorAll('.modal-carousel-dot');

    images.forEach((img, idx) => {
        img.classList.toggle('active', idx === currentModalImageIndex);
    });

    dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentModalImageIndex);
    });
}

function closeModal() {
    document.getElementById('projectModal').classList.remove('open');
}

// Fermeture au clic sur overlay
document.getElementById('projectModal').addEventListener('click', (e) => {
    if (e.target.id === 'projectModal') {
        closeModal();
    }
});

// Fermeture avec Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
        closeCVModal();
    }
});

/* =========================================
   MODALE CV
========================================= */
function openCVModal() {
    document.getElementById('cvModal').classList.add('open');
}

function closeCVModal() {
    document.getElementById('cvModal').classList.remove('open');
}

document.getElementById('cvModal').addEventListener('click', (e) => {
    if (e.target.id === 'cvModal') {
        closeCVModal();
    }
});

/* =========================================
   CHARTS COMPÉTENCES
========================================= */
// Chart Développement
const ctxDev = document.getElementById('chartDev').getContext('2d');
new Chart(ctxDev, {
    type: 'radar',
    data: {
        labels: ['HTML/CSS', 'JavaScript', 'React', 'PHP', 'Node.js'],
        datasets: [{
            label: 'Niveau',
            data: [90, 85, 75, 70, 65],
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
            borderColor: 'rgba(59, 130, 246, 1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(59, 130, 246, 1)'
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
            r: {
                beginAtZero: true,
                max: 100,
                ticks: {
                    display: false
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                },
                pointLabels: {
                    color: 'rgba(255, 255, 255, 0.7)',
                    font: {
                        size: 12
                    }
                }
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    }
});

// Chart Communication
const ctxCom = document.getElementById('chartCom').getContext('2d');
new Chart(ctxCom, {
    type: 'radar',
    data: {
        labels: ['Travail d\'équipe', 'Présentation', 'Rédaction', 'Gestion projet', 'Veille'],
        datasets: [{
            label: 'Niveau',
            data: [85, 80, 75, 70, 90],
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
            borderColor: 'rgba(59, 130, 246, 1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(59, 130, 246, 1)'
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
            r: {
                beginAtZero: true,
                max: 100,
                ticks: {
                    display: false
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                },
                pointLabels: {
                    color: 'rgba(255, 255, 255, 0.7)',
                    font: {
                        size: 12
                    }
                }
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    }
});

// Chart Créativité
const ctxCrea = document.getElementById('chartCrea').getContext('2d');
new Chart(ctxCrea, {
    type: 'radar',
    data: {
        labels: ['UI Design', 'UX', 'Photoshop', 'Illustrator', 'Figma'],
        datasets: [{
            label: 'Niveau',
            data: [80, 85, 75, 70, 90],
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
            borderColor: 'rgba(59, 130, 246, 1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(59, 130, 246, 1)'
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
            r: {
                beginAtZero: true,
                max: 100,
                ticks: {
                    display: false
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                },
                pointLabels: {
                    color: 'rgba(255, 255, 255, 0.7)',
                    font: {
                        size: 12
                    }
                }
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    }
});

/* =========================================
   CARD TILT EFFECT
========================================= */
const tiltCards = document.querySelectorAll('.card-tilt');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

console.log('Portfolio Marouane Salami - Tous les scripts chargés avec succès !');

