document.addEventListener('DOMContentLoaded', () => {
  // Controle do Menu Mobile
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', function (e) {
      e.preventDefault(); // Previne comportamento padrão
      e.stopPropagation(); // Impede propagação do evento

      // Alterna a classe para abrir/fechar o menu
      navLinks.classList.toggle('open');

      // Atualiza o ícone do botão e atributos de acessibilidade
      if (navLinks.classList.contains('open')) {
        mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden'; // Impede rolagem enquanto menu está aberto
      } else {
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = ''; // Reativa rolagem
      }
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', function (event) {
      if (window.innerWidth <= 768 &&
        navLinks.classList.contains('open') &&
        !navLinks.contains(event.target) &&
        !mobileMenuBtn.contains(event.target)) {
        navLinks.classList.remove('open');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });

    // Fechar menu ao clicar em um link de navegação
    document.querySelectorAll('.nav-link, .mobile-social-pill').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navLinks.classList.remove('open');
          mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
          mobileMenuBtn.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      });
    });
  }

  // Detectar navegação por teclado vs. mouse (para acessibilidade)
  function handleFirstTab(e) {
    if (e.key === 'Tab') {
      document.body.classList.add('using-keyboard');

      // Remover este listener já que sabemos que o usuário está usando teclado
      window.removeEventListener('keydown', handleFirstTab);

      // Adicionar um evento para voltar ao modo mouse quando o mouse for usado
      window.addEventListener('mousedown', () => {
        document.body.classList.remove('using-keyboard');
      });
    }
  }

  window.addEventListener('keydown', handleFirstTab);

  // Função para copiar a chave PIX
  const copyPIXButton = document.getElementById('copy-pix');
  const copyMessage = document.getElementById('copy-message');

  if (copyPIXButton && copyMessage) {
    copyPIXButton.addEventListener('click', () => {
      // Pegar o texto da chave PIX
      const pixKey = document.querySelector('.pix-key').textContent;

      // Copiar para a área de transferência
      navigator.clipboard.writeText(pixKey)
        .then(() => {
          // Mostrar mensagem de sucesso
          copyMessage.style.display = 'block';

          // Adicionar efeito de confete
          criarConfete();

          // Esconder a mensagem após 3 segundos
          setTimeout(() => {
            copyMessage.style.display = 'none';
          }, 3000);
        })
        .catch(err => {
          console.error('Erro ao copiar: ', err);

          // Alternativa para navegadores que não suportam clipboard API
          const textArea = document.createElement('textarea');
          textArea.value = pixKey;
          textArea.style.position = 'fixed';  // Fora da tela
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();

          try {
            const successful = document.execCommand('copy');
            if (successful) {
              copyMessage.style.display = 'block';
              criarConfete();

              setTimeout(() => {
                copyMessage.style.display = 'none';
              }, 3000);
            }
          } catch (err) {
            console.error('Fallback: Erro ao copiar', err);
          }

          document.body.removeChild(textArea);
        });
    });
  }

  // Formulário de contato com redirecionamento para WhatsApp
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Obter valores do formulário
      const name = document.getElementById('name').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      // Validar campos
      if (!name || !subject || !message) {
        alert('Por favor, preencha todos os campos do formulário.');
        return;
      }

      // Número de WhatsApp - use o seu número
      const whatsappNumber = '5548991056014';

      // Construir a mensagem formatada
      const formattedMessage =
        `*Contato via Site da Kombi:*\n\n` +
        `*Nome:* ${name}\n` +
        `*Assunto:* ${subject}\n\n` +
        `*Mensagem:*\n${message}`;

      // Codificar a mensagem para URL
      const encodedMessage = encodeURIComponent(formattedMessage);

      // Criar URL do WhatsApp
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

      // Mostrar animação antes de redirecionar
      const submitButton = contactForm.querySelector('button[type="submit"]');

      // Mudar o texto do botão e adicionar spinner
      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirecionando...';
      submitButton.disabled = true;

      // Criar efeito visual
      contactForm.classList.add('sending');

      // Criar confetes
      criarConfete();

      // Redirecionar para WhatsApp após pequeno delay para o efeito visual
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');

        // Resetar o formulário
        contactForm.reset();

        // Retornar o botão ao estado inicial
        submitButton.innerHTML = 'Enviar Mensagem <i class="fas fa-paper-plane"></i>';
        submitButton.disabled = false;

        // Remover classe de animação
        contactForm.classList.remove('sending');

        // Mostra mensagem de sucesso
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success-message';
        successMessage.innerHTML = `
          <div style="text-align: center; padding: 15px; background-color: rgba(2, 195, 154, 0.1); color: #02C39A; border-radius: 10px; margin-bottom: 20px;">
            <i class="fas fa-check-circle"></i> Você está sendo redirecionado para o WhatsApp!
          </div>
        `;

        // Inserir mensagem no topo do formulário
        contactForm.insertBefore(successMessage, contactForm.firstChild);

        // Remover após 5 segundos
        setTimeout(() => {
          successMessage.remove();
        }, 5000);

      }, 1500);
    });
  }

  // Adicionar rolagem suave para links internos - VERSÃO CORRIGIDA
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      // Verificar se é um link de navegação real (não um link vazio ou link com função)
      const targetId = this.getAttribute('href');

      // Ignorar links vazios, links JavaScript ou links da seção de citações
      if (targetId === '#' || targetId.startsWith('javascript:') || this.classList.contains('social-pill')) {
        return;
      }

      try {
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          e.preventDefault(); // Prevenir comportamento padrão do link

          // Calcular a posição com ajuste para o header fixo
          const headerOffset = 80; // Ajuste conforme a altura do seu cabeçalho
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          // Rolar até a posição
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      } catch (error) {
        console.error("Erro ao rolar para âncora:", error);
      }
    });
  });

  // Botão voltar ao topo
  const backToTopButton = document.getElementById('backToTop');
  if (backToTopButton) {
    // Mostrar/ocultar botão baseado no scroll
    window.addEventListener('scroll', debounce(() => {
      if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
      } else {
        backToTopButton.classList.remove('show');
      }
    }, 100));

    // Rolar para o topo quando o botão é clicado
    backToTopButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Função para exibir frases aleatórias de HIMYM
  window.showRandomQuote = function (quote) {
    const quoteElement = document.getElementById('himym-quote');

    if (quoteElement) {
      quoteElement.textContent = quote;
      quoteElement.classList.add('show');
      quoteElement.setAttribute('aria-hidden', 'false');

      setTimeout(() => {
        quoteElement.classList.remove('show');

        setTimeout(() => {
          quoteElement.setAttribute('aria-hidden', 'true');
        }, 500);
      }, 5000);
    }
  };

  // Destacar item de navegação atual baseado no scroll
  const sections = document.querySelectorAll('section[id]');

  function highlightNavigation() {
    const scrollPosition = window.scrollY;

    // Altura do menu para compensar no cálculo
    const navHeight = document.querySelector('nav').offsetHeight;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - navHeight - 100; // Margem para ativar um pouco antes
      const sectionBottom = sectionTop + section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // Chamar inicialmente e adicionar evento de scroll
  highlightNavigation();
  window.addEventListener('scroll', debounce(highlightNavigation, 100));
});

// Efeito de confete
function criarConfete() {
  const pixContainer = document.querySelector('.pix-container');

  if (!pixContainer) return;

  for (let i = 0; i < 50; i++) {
    const confete = document.createElement('div');
    confete.classList.add('confete');

    const cores = ['#4D77FF', '#FF4D6D', '#FFA447', '#02C39A'];
    const corAleatoria = cores[Math.floor(Math.random() * cores.length)];

    confete.style.backgroundColor = corAleatoria;
    confete.style.left = Math.random() * 100 + '%';
    confete.style.width = Math.random() * 8 + 3 + 'px';
    confete.style.height = Math.random() * 4 + 2 + 'px';
    confete.style.opacity = Math.random() + 0.5;
    confete.style.animation = `confete ${Math.random() * 2 + 1}s ease-in forwards`;

    pixContainer.appendChild(confete);
    setTimeout(() => confete.remove(), 3000);
  }
}

// Função Debounce - evita execução excessiva de funções durante eventos como scroll
function debounce(func, wait = 100) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}