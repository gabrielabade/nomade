// Toggle do Menu Mobile
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
  navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Funcionalidade de copiar chave PIX
const copyPixBtn = document.getElementById('copy-pix');
const copyMessage = document.getElementById('copy-message');
const pixKey = document.querySelector('.pix-key').textContent;

copyPixBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(pixKey).then(() => {
    copyMessage.style.display = 'block';
    setTimeout(() => {
      copyMessage.style.display = 'none';
    }, 3000);
  });
});

// Envio do formulário para WhatsApp
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Pegar valores do formulário
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;

  // Formatar mensagem para WhatsApp
  const whatsappMessage = `*Contato do Site:*%0A%0A*Nome:* ${name}%0A*Email:* ${email}%0A*Assunto:* ${subject}%0A*Mensagem:* ${message}`;

  // Criar link do WhatsApp com mensagem pré-preenchida
  const whatsappLink = `https://wa.me/5548991056014?text=${whatsappMessage}`;

  // Abrir WhatsApp em uma nova aba
  window.open(whatsappLink, '_blank');

  // Resetar formulário
  contactForm.reset();
});

// Rolagem suave para links âncora
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });

      // Fechar menu mobile se estiver aberto
      if (window.innerWidth <= 768) {
        navLinks.style.display = 'none';
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
      navLink.classList.add('active');
    } else if (navLink) {
      navLink.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', destacarNavegacaoAoRolar);

// Adicionar CSS para estilizar links de navegação ativos
const styleElement = document.createElement('style');
styleElement.textContent = `
    .nav-link.active {
        color: var(--primary);
    }
    .nav-link.active:after {
        width: 100%;
    }
`;
document.head.appendChild(styleElement);

// Elementos que serão animados no scroll
const elementosAnimados = document.querySelectorAll('.service-card, .project-card, .about-content, .contact-form, .proposal-section, .gbconnect-invite');

// Configurar estilos iniciais para animação
elementosAnimados.forEach(element => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(20px)';
  element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

// Função para animar elementos durante scroll
function animarAoRolar() {
  elementosAnimados.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementPosition < windowHeight - 100) {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }
  });
}

window.addEventListener('scroll', animarAoRolar);

// Disparar uma vez ao carregar a página
window.addEventListener('load', animarAoRolar);

// Frases da série "Como Eu Conheci Sua Mãe"
const frasesDaSerie = [
  "Desafio Aceito!",
  "LEGEN... ESPERA UM POUCO... DÁRIO!",
  "História real.",
  "Temos um código!",
  "Você conhece o Ted?",
  "Nada de bom acontece depois das 2 da manhã.",
  "Cadê o cocô?",
  "O Código dos Bros diz..."
];

// Interatividade dos placeholders para imagens
document.addEventListener('DOMContentLoaded', function () {
  const placeholders = document.querySelectorAll('.placeholder-container');

  placeholders.forEach(placeholder => {
    placeholder.addEventListener('click', function () {
      alert('Clique para substituir por uma imagem real. Este é apenas um espaço reservado para você adicionar suas fotos.');
    });
  });
});