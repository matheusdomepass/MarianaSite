/**
 * =====================================================
 * MARIANA DOMENEGHETTI — Fisioterapia e Pilates
 * script.js — Comportamentos interativos do site
 * =====================================================
 */

/* =====================================================
   CONFIGURAÇÃO — Atualize aqui antes de publicar
   ===================================================== */

const CONFIG = {
  /**
   * WHATSAPP
   * Insira o número com código do país e DDD, sem espaços ou caracteres especiais.
   * Exemplo: '5511999999999'  (55 = Brasil, 11 = DDD, + número)
   */
  whatsappNumber: '5516997139902',  // ← INSERIR NÚMERO REAL AQUI

  /**
   * Mensagem automática sugerida ao abrir o WhatsApp.
   * Pode ser customizada conforme preferência da profissional.
   */
  whatsappMessage: 'Olá, Mariana! Encontrei seu site e gostaria de saber mais sobre os atendimentos de fisioterapia.',
};

/* =====================================================
   INICIALIZAÇÃO
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileMenu();
  initScrollReveal();
  initWhatsApp();
  initSmoothScroll();
  initActiveNavLinks();
});

/* =====================================================
   HEADER — Comportamento ao rolar
   ===================================================== */

function initHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
      header.classList.remove('transparent');
    } else {
      header.classList.remove('scrolled');
      header.classList.add('transparent');
    }
  };

  // Estado inicial
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* =====================================================
   MENU MOBILE — Hambúrguer
   ===================================================== */

function initMobileMenu() {
  const hamburger = document.getElementById('hamburger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav__link');

  if (!hamburger || !mobileMenu) return;

  const openMenu = () => {
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; // impede scroll de fundo
  };

  const closeMenu = () => {
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  const toggleMenu = () => {
    const isOpen = mobileMenu.classList.contains('open');
    isOpen ? closeMenu() : openMenu();
  };

  hamburger.addEventListener('click', toggleMenu);

  // Fechar ao clicar nos links
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Fechar com tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      closeMenu();
      hamburger.focus();
    }
  });

  // Fechar ao clicar fora do menu (no overlay)
  mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) closeMenu();
  });
}

/* =====================================================
   SCROLL REVEAL — Animações ao rolar
   ===================================================== */

function initScrollReveal() {
  // Respeita prefers-reduced-motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  if (prefersReduced) {
    // Torna tudo visível imediatamente se o usuário preferir
    elements.forEach(el => el.classList.add('visible'));
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.12,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // anima uma única vez
      }
    });
  }, observerOptions);

  elements.forEach(el => observer.observe(el));
}

/* =====================================================
   WHATSAPP — Links e botão flutuante
   ===================================================== */

function initWhatsApp() {
  const number = CONFIG.whatsappNumber.replace(/\D/g, '');
  const message = encodeURIComponent(CONFIG.whatsappMessage);

  // URL de abertura do WhatsApp
  const waUrl = number
    ? `https://wa.me/${number}?text=${message}`
    : '#'; // fallback sem número cadastrado

  // Aplica a URL em todos os botões/links marcados
  const waElements = document.querySelectorAll('[data-whatsapp]');
  waElements.forEach(el => {
    el.href = waUrl;
    if (waUrl === '#') {
      // Aviso no console para o desenvolvedor
      el.addEventListener('click', (e) => {
        e.preventDefault();
        console.warn('[Mariana Site] Número de WhatsApp não configurado. Edite CONFIG.whatsappNumber em js/script.js');
      });
    }
  });
}

/* =====================================================
   SCROLL SUAVE — Links de navegação
   ===================================================== */

function initSmoothScroll() {
  const headerHeight = () => {
    const h = document.getElementById('site-header');
    return h ? h.offsetHeight : 72;
  };

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight();
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* =====================================================
   NAVEGAÇÃO ATIVA — Highlight do link atual
   ===================================================== */

function initActiveNavLinks() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link[href^="#"]');

  if (!sections.length || !navLinks.length) return;

  const headerHeight = document.getElementById('site-header')?.offsetHeight || 72;

  const onScroll = () => {
    let current = '';

    sections.forEach(section => {
      const top = section.offsetTop - headerHeight - 60;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // executa uma vez ao carregar
}
