/* ============ MENU MOBILE ============ */
document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');

    if (menuToggle) {
        menuToggle.addEventListener('click', function () {
            nav.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Fechar menu ao clicar em um link
        document.querySelectorAll('.nav a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    /* ============ HEADER SCROLL ============ */
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
        }
    });

    /* ============ BOTÃO VOLTAR AO TOPO ============ */
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 400) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    /* ============ CONTADOR ANIMADO ============ */
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersStarted = false;

    function animateCounters() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target;
                }
            };
            updateCounter();
        });
    }

    // Iniciar contadores quando a seção sobre estiver visível
    const sobreSection = document.getElementById('sobre');
    if (sobreSection && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countersStarted) {
                    countersStarted = true;
                    animateCounters();
                }
            });
        }, { threshold: 0.3 });
        observer.observe(sobreSection);
    }

    /* ============ ANIMAÇÃO AO SCROLL ============ */
    const animatedElements = document.querySelectorAll(
        '.feature-card, .servico-card, .estrutura-item, .empresa-card, .depoimento-card, .contato-item, .sobre-text, .sobre-stats'
    );

    if ('IntersectionObserver' in window) {
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            fadeObserver.observe(el);
        });
    }

    /* ============ FORMULÁRIO DE CONTATO ============ */
    const contatoForm = document.getElementById('contatoForm');
    const formMessage = document.getElementById('formMessage');

    if (contatoForm) {
        contatoForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const telefone = document.getElementById('telefone').value.trim();
            const assunto = document.getElementById('assunto').value;
            const mensagem = document.getElementById('mensagem').value.trim();

            // Validação básica
            if (!nome || !email || !telefone || !assunto || !mensagem) {
                showMessage('Por favor, preencha todos os campos.', 'error');
                return;
            }

            // Validação de e-mail
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showMessage('Por favor, insira um e-mail válido.', 'error');
                return;
            }

            // Simulação de envio (aqui você conectaria a um backend)
            const submitBtn = contatoForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;

            setTimeout(() => {
                showMessage('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
                contatoForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;

                // Limpar mensagem após 5 segundos
                setTimeout(() => {
                    formMessage.className = 'form-message';
                    formMessage.textContent = '';
                }, 5000);
            }, 1500);
        });
    }

    function showMessage(text, type) {
        formMessage.textContent = text;
        formMessage.className = 'form-message ' + type;
    }

    /* ============ MÁSCARA DE TELEFONE ============ */
    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) value = value.slice(0, 11);

            if (value.length > 6) {
                value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
            } else if (value.length > 2) {
                value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
            } else if (value.length > 0) {
                value = `(${value}`;
            }
            e.target.value = value;
        });
    }

    /* ============ SCROLL SUAVE PARA LINKS INTERNOS ============ */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ============ ANIMAÇÃO DO LOGO ============ */
    const logoIcon = document.querySelector('.logo i');
    if (logoIcon) {
        logoIcon.addEventListener('mouseenter', function () {
            this.style.transform = 'rotate(20deg) scale(1.2)';
        });
        logoIcon.addEventListener('mouseleave', function () {
            this.style.transform = 'rotate(0) scale(1)';
        });
    }

    /* ============ EFEITO PARALLAX NO HERO ============ */
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function () {
            const scrolled = window.pageYOffset;
            if (scrolled < 600) {
                hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
            }
        });
    }

    /* ============ ANO ATUAL NO FOOTER ============ */
    const footerBottom = document.querySelector('.footer-bottom p');
    if (footerBottom) {
        const currentYear = new Date().getFullYear();
        footerBottom.innerHTML = footerBottom.innerHTML.replace('2024', currentYear);
    }

    console.log('%c Ideal Odonto ', 'background: linear-gradient(135deg, #0077b6, #00b4d8); color: white; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 10px;');
    console.log('%c Site carregado com sucesso! 🦷 ', 'color: #0077b6; font-size: 14px; font-weight: bold;');
});
