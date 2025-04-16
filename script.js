// Toggle do Menu Mobile
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
  navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
  mobileMenuBtn.innerHTML = navLinks.style.display === 'flex' ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
  mobileMenuBtn.classList.toggle('active');
});

// Funcionalidade de copiar chave PIX com animação
const copyPixBtn = document.getElementById('copy-pix');
const copyMessage = document.getElementById('copy-message');
const pixKey = document.querySelector('.pix-key').textContent;

copyPixBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(pixKey).then(() => {
    // Efeito de confete ao copiar
    criarConfete();

    // Mostrar mensagem
    copyMessage.style.display = 'block';
    copyMessage.classList.add('pulsating');

    // Frase HIMYM ao copiar PIX
    showRandomQuote("Desafio aceito! Chave PIX copiada.");

    setTimeout(() => {
      copyMessage.classList.remove('pulsating');
      copyMessage.style.display = 'none';
    }, 3000);
  });
});

// Função para criar efeito de confete
function criarConfete() {
  const pixContainer = document.querySelector('.pix-container');

  for (let i = 0; i < 50; i++) {
    const confete = document.createElement('div');
    confete.classList.add('confete');

    // Cores do tema
    const cores = ['#4D77FF', '#FF4D6D', '#FFA447', '#02C39A'];
    const corAleatoria = cores[Math.floor(Math.random() * cores.length)];

    confete.style.backgroundColor = corAleatoria;
    confete.style.left = Math.random() * 100 + '%';
    confete.style.width = Math.random() * 8 + 3 + 'px';
    confete.style.height = Math.random() * 4 + 2 + 'px';
    confete.style.opacity = Math.random() + 0.5;
    confete.style.animation = `confete ${Math.random() * 2 + 1}s ease-in forwards`;

    pixContainer.appendChild(confete);

    // Remover confete depois da animação
    setTimeout(() => {
      confete.remove();
    }, 3000);
  }
}

// Envio do formulário para WhatsApp com animação
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Efeito de carregamento no botão
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
  submitBtn.disabled = true;

  // Pegar valores do formulário
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;

  // Simular carregamento
  setTimeout(() => {
    // Formatar mensagem para WhatsApp
    const whatsappMessage = `*Contato do Site VanClaren's:*%0A%0A*Nome:* ${name}%0A*Email:* ${email}%0A*Assunto:* ${subject}%0A*Mensagem:* ${message}%0A%0A*LEGEN... ESPERA UM POUCO... DÁRIO!*`;

    // Criar link do WhatsApp com mensagem pré-preenchida
    const whatsappLink = `https://wa.me/5548991056014?text=${whatsappMessage}`;

    // Abrir WhatsApp em uma nova aba
    window.open(whatsappLink, '_blank');

    // Restaurar botão
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;

    // Resetar formulário
    contactForm.reset();

    // Mostrar mensagem de sucesso
    showRandomQuote("Mensagem enviada! Logo em breve responderemos.");

    // Adicionar animação de sucesso ao formulário
    const formElement = document.querySelector('.contact-form');
    formElement.classList.add('form-success');
    setTimeout(() => {
      formElement.classList.remove('form-success');
    }, 2000);
  }, 1500);
});

// Rolagem suave para links âncora com efeito de zoom
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      // Adicionar efeito de destaque na seção
      targetElement.classList.add('highlight-section');
      setTimeout(() => {
        targetElement.classList.remove('highlight-section');
      }, 1500);

      // Rolar suavemente
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });

      // Fechar menu mobile se estiver aberto
      if (window.innerWidth <= 768) {
        navLinks.style.display = 'none';
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        mobileMenuBtn.classList.remove('active');
      }

      // Mostrar citação aleatória
      if (Math.random() < 0.3) {
        setTimeout(() => {
          showRandomQuote();
        }, 800);
      }
    }
  });
});

// Adicionar classe ativa aos links de navegação durante scroll
const sections = document.querySelectorAll('section[id]');

function destacarNavegacaoAoRolar() {
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
      navLink.classList.add('active');
    }
  });

  // Exibir ou ocultar botão de voltar ao topo
  const backToTopBtn = document.getElementById('backToTop');
  if (scrollY > 300) {
    backToTopBtn.classList.add('show');
  } else {
    backToTopBtn.classList.remove('show');
  }
}

window.addEventListener('scroll', destacarNavegacaoAoRolar);

// Botão de voltar ao topo
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Efeito de paralaxe para a imagem da Kombi
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const kombiImage = document.querySelector('.kombi-image-container');

  if (kombiImage) {
    kombiImage.style.transform = `translateY(${scrollY * 0.05}px)`;
  }
});

// Função para animar elementos durante scroll com diferentes atrasos
function animarAoRolar() {
  const elementosAnimados = document.querySelectorAll('.service-card, .project-card, .about-content, .contact-form, .proposal-section, .gbconnect-invite, .feature-item');

  elementosAnimados.forEach((element, index) => {
    const elementPosition = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementPosition < windowHeight - 50) {
      // Adicionar atraso com base no índice para efeito em cascata
      setTimeout(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, 100 * (index % 3)); // Usar módulo para limitar o atraso máximo
    }
  });
}

// Configurar estilos iniciais para animação
document.addEventListener('DOMContentLoaded', function () {
  const elementosAnimados = document.querySelectorAll('.service-card, .project-card, .about-content, .contact-form, .proposal-section, .gbconnect-invite, .feature-item');

  elementosAnimados.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    // Adicionar atraso com base no índice
    element.style.transitionDelay = `${0.1 * (index % 4)}s`;
  });

  // Disparar animação ao carregar
  setTimeout(animarAoRolar, 300);

  // Mostrar citação ao carregar
  setTimeout(() => showRandomQuote(), 2000);
});

window.addEventListener('scroll', animarAoRolar);

// Frases da série "Como Eu Conheci Sua Mãe"
const frasesDaSerie = [
  "Desafio Aceito!",
  "LEGEN... ESPERA UM POUCO... DÁRIO!",
  "História real.",
  "Temos um código!",
  "Você conhece o Ted?",
  "Nada de bom acontece depois das 2 da manhã.",
  "O Código dos Bros diz...",
  "Eu já tentei isso, mas não sou Ted Mosby.",
  "Não seja um Ted. Seja um Barney!",
  "É um ótimo dia para construir um bar.",
  "Olhos no prêmio, Scherbatsky!",
  "Cadê o cocô?",
];

// Função para mostrar citação aleatória
function showRandomQuote(quote = null) {
  const quoteElement = document.getElementById('himym-quote');

  // Se não for fornecida uma citação, escolha uma aleatória
  if (!quote) {
    const randomIndex = Math.floor(Math.random() * frasesDaSerie.length);
    quote = frasesDaSerie[randomIndex];
  }

  quoteElement.textContent = quote;
  quoteElement.classList.add('show');

  setTimeout(() => {
    quoteElement.classList.remove('show');
  }, 5000);
}

// Easter egg: Digitar "Barney" em qualquer campo de texto
document.querySelectorAll('input, textarea').forEach(input => {
  input.addEventListener('input', function () {
    if (this.value.toLowerCase().includes('barney')) {
      showRandomQuote("LEGEN... ESPERA UM POUCO... DÁRIO!");
    }
  });
});

// Easter egg: 3 cliques rápidos no logo
const logo = document.querySelector('.logo');
let clickCount = 0;
let clickTimer;

logo.addEventListener('click', function (e) {
  e.preventDefault();

  clickCount++;

  if (clickCount === 1) {
    clickTimer = setTimeout(() => {
      clickCount = 0;
    }, 800);
  }

  if (clickCount === 3) {
    clearTimeout(clickTimer);
    clickCount = 0;

    // Modo festa
    document.documentElement.classList.toggle('party-mode');

    // Adicionar confete
    criarConfete();

    // Mostrar citação
    showRandomQuote("É HORA DO TERNO! TERNO LIGADO!");
  }
});

// Mostrar citação aleatória a cada minuto
setInterval(() => {
  // 15% de chance de mostrar uma citação
  if (Math.random() < 0.15) {
    showRandomQuote();
  }
}, 60000);

// Efeito de sombra no menu ao rolar
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 50) {
    nav.classList.add('nav-scrolled');
  } else {
    nav.classList.remove('nav-scrolled');
  }
});

// Adicionar efeitos de hover nos serviços
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mouseenter', function () {
    const icon = this.querySelector('.service-icon i');
    icon.classList.add('fa-bounce');

    setTimeout(() => {
      icon.classList.remove('fa-bounce');
    }, 1000);
  });
});

// Frases motivacionais para o formulário de contato
const placeholdersMensagem = [
  "Nos conte sobre seu projeto ou ideia... Desafio aceito!",
  "Tem uma ideia? Nós transformamos em código... LENDÁRIO!",
  "Seu próximo projeto começa aqui. Conte-nos mais...",
  "Vamos criar algo incrível juntos! O que você tem em mente?",
  "História real: só precisamos da sua ideia para começar!"
];

// Trocar placeholder da mensagem aleatoriamente no foco
const messageTextarea = document.getElementById('message');

if (messageTextarea) {
  messageTextarea.addEventListener('focus', function () {
    const randomIndex = Math.floor(Math.random() * placeholdersMensagem.length);
    this.placeholder = placeholdersMensagem[randomIndex];
  });

  messageTextarea.addEventListener('blur', function () {
    this.placeholder = "Nos conte sobre seu projeto ou ideia...";
  });
}

// Konami Code Easter Egg
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', function (e) {
  if (e.key === konamiCode[konamiIndex]) {
    konamiIndex++;

    if (konamiIndex === konamiCode.length) {
      // Ativar modo festa
      document.body.style.background = 'var(--gradient-accent)';
      criarConfete();

      // Mostrar mensagem lendária
      const lendarioMsg = document.createElement('div');
      lendarioMsg.textContent = "LEGEN... ESPERA UM POUCO... DÁRIO!";
      lendarioMsg.style.position = 'fixed';
      lendarioMsg.style.top = '50%';
      lendarioMsg.style.left = '50%';
      lendarioMsg.style.transform = 'translate(-50%, -50%)';
      lendarioMsg.style.backgroundColor = 'white';
      lendarioMsg.style.color = 'var(--accent)';
      lendarioMsg.style.padding = '30px';
      lendarioMsg.style.borderRadius = 'var(--radius)';
      lendarioMsg.style.fontSize = '24px';
      lendarioMsg.style.fontWeight = 'bold';
      lendarioMsg.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.3)';
      lendarioMsg.style.zIndex = '1000';
      lendarioMsg.style.fontFamily = 'var(--font-primary)';

      document.body.appendChild(lendarioMsg);

      setTimeout(() => {
        lendarioMsg.remove();
        document.body.style.background = '';
      }, 3000);

      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
});

// Função debounce para otimizar scroll
function debounce(func, wait = 100) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Aplicando debounce ao scroll
window.removeEventListener('scroll', destacarNavegacaoAoRolar);
window.addEventListener('scroll', debounce(destacarNavegacaoAoRolar));
window.removeEventListener('scroll', animarAoRolar);
window.addEventListener('scroll', debounce(animarAoRolar));

// Toast message para feedbacks
function showToast(mensagem) {
  const toast = document.createElement('div');
  toast.textContent = mensagem;
  toast.style.position = 'fixed';
  toast.style.bottom = '20px';
  toast.style.right = '20px';
  toast.style.padding = '12px 20px';
  toast.style.background = '#4D77FF';
  toast.style.color = '#fff';
  toast.style.borderRadius = '8px';
  toast.style.zIndex = '9999';
  toast.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
  toast.style.fontWeight = '600';
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}
