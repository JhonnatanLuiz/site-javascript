/**
 * JavaScript para o Site JavaScript Tutorial
 * Funcionalidades gerais do site
 */

// ========================================
// NAVEGAÇÃO RESPONSIVA
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('Site JavaScript Tutorial carregado!');
    
    // Inicializar menu hambúrguer mobile
    initMobileMenu();
    
    // Detectar página ativa
    highlightActivePage();
    
    // Scroll suave para âncoras
    initSmoothScroll();
    
    // Code syntax highlighting (básico)
    highlightCodeBlocks();
});

/**
 * Menu Hambúrguer Mobile - Funciona em todas as páginas
 */
function initMobileMenu() {
    // Elementos do menu
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const menuOverlay = document.getElementById('menuOverlay');
    const closeMenu = document.getElementById('closeMenu');
    
    // Verifica se os elementos existem (nem todas as páginas têm menu hambúrguer)
    if (!menuToggle || !sidebar || !menuOverlay || !closeMenu) {
        return;
    }
    
    const menuLinks = sidebar.querySelectorAll('a');

    // Função para abrir menu
    function openMenu() {
        sidebar.classList.remove('-translate-x-full');
        menuOverlay.classList.remove('hidden');
        setTimeout(() => menuOverlay.classList.remove('opacity-0'), 10);
        document.body.style.overflow = 'hidden'; // Previne scroll do body
    }

    // Função para fechar menu
    function closeMenuFunc() {
        sidebar.classList.add('-translate-x-full');
        menuOverlay.classList.add('opacity-0');
        setTimeout(() => menuOverlay.classList.add('hidden'), 300);
        document.body.style.overflow = ''; // Restaura scroll do body
    }

    // Event listeners
    menuToggle.addEventListener('click', openMenu);
    closeMenu.addEventListener('click', closeMenuFunc);
    menuOverlay.addEventListener('click', closeMenuFunc);

    // Fechar menu ao clicar em qualquer link (mobile)
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 1024) { // lg breakpoint
                closeMenuFunc();
            }
        });
    });

    // Fechar menu com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !sidebar.classList.contains('-translate-x-full')) {
            closeMenuFunc();
        }
    });
}

/**
 * Destaca a página ativa no menu
 */
function highlightActivePage() {
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.main-nav a, .sidebar a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') && currentPage.includes(link.getAttribute('href'))) {
            link.classList.add('active');
        }
    });
}

/**
 * Scroll suave para links âncora
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Destaque simples de blocos de código
 */
function highlightCodeBlocks() {
    const codeBlocks = document.querySelectorAll('pre code, .code-block');
    
    codeBlocks.forEach(block => {
        // Adiciona classe para estilização
        block.classList.add('highlighted');
    });
}

/**
 * Toggle para sidebar em mobile (será implementado)
 */
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.classList.toggle('active');
    }
}

/**
 * Copiar código para clipboard
 */
function copyCode(button) {
    const codeBlock = button.nextElementSibling;
    const code = codeBlock.textContent;
    
    navigator.clipboard.writeText(code).then(() => {
        button.textContent = '✅ Copiado!';
        setTimeout(() => {
            button.textContent = '📋 Copiar';
        }, 2000);
    });
}

/**
 * Executar código JavaScript no navegador (Try it yourself)
 */
function runCode(code) {
    try {
        const result = eval(code);
        return result !== undefined ? String(result) : 'Código executado com sucesso!';
    } catch (error) {
        return `Erro: ${error.message}`;
    }
}

// ========================================
// UTILITÁRIOS
// ========================================

/**
 * Formata data para exibição
 */
function formatDate(date) {
    return new Date(date).toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

/**
 * Debounce para otimizar eventos
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export functions if using modules (opcional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        highlightActivePage,
        toggleSidebar,
        copyCode,
        runCode,
        formatDate,
        debounce
    };
}