/**
 * JavaScript para o Site JavaScript Tutorial
 * Funcionalidades gerais do site
 */

// ========================================
// NAVEGAÇÃO RESPONSIVA
// ========================================
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function () {
        console.log('Site JavaScript Tutorial carregado!');

        // Inicializar menu hambúrguer mobile
        initMobileMenu();

        // Detectar página ativa
        highlightActivePage();

        // Scroll suave para âncoras
        initSmoothScroll();

        // Code syntax highlighting (básico)
        highlightCodeBlocks();

        // Inicializar carrossel se existir na página
        initCarousel();
    });
}

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
        link.addEventListener('click', function (e) {
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
function copyCode(target) {
    // target pode ser: (1) um id de elemento, (2) um elemento, (3) um texto.
    if (typeof navigator === 'undefined') {
        return false;
    }

    let textToCopy = '';

    if (typeof target === 'string') {
        // Tenta interpretar como id primeiro
        if (typeof document !== 'undefined') {
            const el = document.getElementById(target);
            if (el) {
                textToCopy = (el.innerText || el.textContent || '').trim();
            } else {
                textToCopy = target;
            }
        } else {
            textToCopy = target;
        }
    } else if (target && typeof target === 'object') {
        // Elemento DOM
        if (typeof target.innerText === 'string' || typeof target.textContent === 'string') {
            textToCopy = String(target.innerText || target.textContent || '').trim();
        }
    }

    if (!textToCopy) {
        return false;
    }

    // Preferência: Clipboard API
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        navigator.clipboard.writeText(textToCopy);
        return true;
    }

    // Fallback: textarea + execCommand
    if (typeof document === 'undefined') {
        return false;
    }

    const textarea = document.createElement('textarea');
    textarea.value = textToCopy;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();

    let ok = false;
    try {
        ok = document.execCommand('copy');
    } catch (e) {
        ok = false;
    }

    document.body.removeChild(textarea);
    return ok;
}

/**
 * Executa um trecho de código (uso educacional)
 * Retorna o resultado (string) ou a mensagem de erro.
 */
function runCode(code) {
    try {
        // Function() evita capturar escopo local e é mais previsível
        // eslint-disable-next-line no-new-func
        const fn = new Function(String(code));
        const result = fn();
        return result === undefined ? 'Código executado (sem retorno).' : String(result);
    } catch (err) {
        return (err && err.name ? err.name : 'Error') + ': ' + (err && err.message ? err.message : String(err));
    }
}

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

// ========================================
// CONTINUE.HTML DEMOS
// ========================================
function demo1() {
    let output = '';
    for (let i = 0; i < 10; i++) {
        if (i === 5) continue;
        output += "Número: " + i + "\n";
    }
    showResult('result1', output);
}

function demo2() {
    let output = '';
    for (let i = 0; i <= 10; i++) {
        if (i % 2 === 0) continue;
        output += "Número ímpar: " + i + "\n";
    }
    showResult('result2', output);
}

function demo3() {
    let output = 'Com Continue:\n';
    for (let i = 0; i < 5; i++) {
        if (i === 2) continue;
        output += i + "\n";
    }
    output += "\nCom Break:\n";
    for (let i = 0; i < 5; i++) {
        if (i === 2) break;
        output += i + "\n";
    }
    showResult('result3', output);
}

function demo4() {
    const numeros = [10, -5, 8, -3, 15, -1, 20];
    let output = '';
    for (let i = 0; i < numeros.length; i++) {
        if (numeros[i] < 0) {
            output += "⏭️  Pulando número negativo: " + numeros[i] + "\n";
            continue;
        }
        output += "✓ Processando: " + numeros[i] + "\n";
    }
    showResult('result4', output);
}

function demo5() {
    let output = '';
    let i = 0;
    while (i < 10) {
        i++;
        if (i % 3 === 0) continue;
        output += "Número: " + i + "\n";
    }
    showResult('result5', output);
}

function demo6() {
    const valores = [5, -2, 10, -8, 15, 3];
    let soma = 0;
    let output = '';
    for (let i = 0; i < valores.length; i++) {
        if (valores[i] < 0) {
            output += "Ignorando " + valores[i] + "\n";
            continue;
        }
        soma += valores[i];
        output += "Somando " + valores[i] + " (Total: " + soma + ")\n";
    }
    output += "\n✅ Soma final: " + soma;
    showResult('result6', output);
}

/**
 * Helper para exibir resultados de demos
 */
function showResult(elementId, text) {
    const resultDiv = document.getElementById(elementId);
    if (resultDiv) {
        const contentDiv = resultDiv.querySelector('div');
        if (contentDiv) {
            contentDiv.textContent = text;
        }
        resultDiv.classList.remove('hidden');
    }
}

// ============================================================================
// LOOPS.HTML - Funções de demonstração
// ============================================================================

function demoFor() {
    let output = '';
    for (let i = 0; i < 5; i++) {
        output += "Número: " + i + "\n";
    }
    const resultDiv = document.getElementById('result-for');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function demoWhile() {
    let output = '';
    let contador = 5;
    while (contador > 0) {
        output += "Contagem: " + contador + "\n";
        contador--;
    }
    output += "Fim!";
    const resultDiv = document.getElementById('result-while');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function demoDoWhile() {
    let output = '';
    let numero = 1;
    do {
        output += "Número: " + numero + "\n";
        numero++;
    } while (numero <= 3);
    const resultDiv = document.getElementById('result-dowhile');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function demoCompare() {
    let output = '';

    // For Loop
    for (let i = 1; i <= 3; i++) {
        output += "For: " + i + "\n";
    }
    output += "\n";

    // While Loop
    let j = 1;
    while (j <= 3) {
        output += "While: " + j + "\n";
        j++;
    }
    output += "\n";

    // Do-While Loop
    let k = 1;
    do {
        output += "Do-While: " + k + "\n";
        k++;
    } while (k <= 3);

    const resultDiv = document.getElementById('result-compare');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

// ============================================================================
// LOOPS_FOR.HTML - Funções de demonstração
// ============================================================================

function loopsFor_demo1() {
    let output = '';
    for (let i = 0; i < 5; i++) {
        output += "O número é " + i + "\n";
    }
    const resultDiv = document.getElementById('result1');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function loopsFor_demo2() {
    const frutas = ["Maçã", "Banana", "Laranja", "Uva"];
    let output = '';
    for (let i = 0; i < frutas.length; i++) {
        output += frutas[i] + "\n";
    }
    const resultDiv = document.getElementById('result2');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function loopsFor_demo3() {
    let output = '';
    for (let i = 5; i >= 1; i--) {
        output += "Contagem regressiva: " + i + "\n";
    }
    output += "🚀 Lançamento!";
    const resultDiv = document.getElementById('result3');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function loopsFor_demo4() {
    let output = '';
    for (let i = 0; i <= 10; i += 2) {
        output += "Número par: " + i + "\n";
    }
    const resultDiv = document.getElementById('result4');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function loopsFor_demo5() {
    let output = '';
    for (let i = 1; i <= 3; i++) {
        for (let j = 1; j <= 3; j++) {
            output += i + " x " + j + " = " + (i * j) + "\n";
        }
        output += "---\n";
    }
    const resultDiv = document.getElementById('result5');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function loopsFor_demo6() {
    let soma = 0;
    for (let i = 1; i <= 10; i++) {
        soma += i;
    }
    const output = "A soma de 1 a 10 é: " + soma;
    const resultDiv = document.getElementById('result6');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function loopsFor_demo7() {
    let i = 0;
    let output = '';
    for (; i < 3; i++) {
        output += "Valor de i: " + i + "\n";
    }
    const resultDiv = document.getElementById('result7');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

// ============================================================================
// LOOPS_WHILE.HTML - Funções de demonstração
// ============================================================================

function loopsWhile_demo1() {
    let output = '';
    let i = 0;
    while (i < 5) {
        output += "O número é " + i + "\n";
        i++;
    }
    const resultDiv = document.getElementById('result1');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function loopsWhile_demo2() {
    let output = '';
    let contador = 10;
    while (contador > 0) {
        output += "Faltam " + contador + " segundos\n";
        contador--;
    }
    output += "🎉 Tempo esgotado!";
    const resultDiv = document.getElementById('result2');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function loopsWhile_demo3() {
    let output = '';
    let i = 0;
    do {
        output += "O número é " + i + "\n";
        i++;
    } while (i < 5);
    const resultDiv = document.getElementById('result3');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function loopsWhile_demo4() {
    let output = '';

    // While Loop
    output += "--- While Loop ---\n";
    let x = 10;
    while (x < 5) {
        output += "While: " + x + "\n";
        x++;
    }
    if (x === 10) output += "(While não executou)\n";

    output += "\n--- Do-While Loop ---\n";
    // Do-While Loop
    let y = 10;
    do {
        output += "Do-While: " + y + "\n";
        y++;
    } while (y < 5);

    const resultDiv = document.getElementById('result4');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function loopsWhile_demo5() {
    let soma = 0;
    let numero = 1;
    while (numero <= 100) {
        soma += numero;
        numero++;
    }
    const output = "A soma de 1 a 100 é: " + soma;
    const resultDiv = document.getElementById('result5');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function loopsWhile_demo6() {
    const cores = ["Vermelho", "Verde", "Azul", "Amarelo"];
    let output = '';
    let i = 0;
    while (i < cores.length) {
        output += "Cor " + (i + 1) + ": " + cores[i] + "\n";
        i++;
    }
    const resultDiv = document.getElementById('result6');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

// ============================================================================
// BREAK.HTML - Funções de demonstração
// ============================================================================

function break_demo1() {
    let output = '';
    for (let i = 0; i < 10; i++) {
        if (i === 5) {
            break;
        }
        output += "Número: " + i + "\n";
    }
    const resultDiv = document.getElementById('result1');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function break_demo2() {
    let output = '';
    let i = 0;
    while (i < 10) {
        output += "Contando: " + i + "\n";
        i++;

        if (i === 7) {
            output += "🛑 Break ativado!\n";
            break;
        }
    }
    const resultDiv = document.getElementById('result2');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function break_demo3() {
    const frutas = ["Maçã", "Banana", "Laranja", "Uva", "Manga"];
    let procurar = "Laranja";
    let encontrado = false;
    let output = '';

    for (let i = 0; i < frutas.length; i++) {
        output += "Verificando: " + frutas[i] + "\n";

        if (frutas[i] === procurar) {
            output += "✅ Encontrado!\n";
            encontrado = true;
            break;
        }
    }

    const resultDiv = document.getElementById('result3');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function break_demo4() {
    let output = '';
    for (let i = 1; i <= 3; i++) {
        output += "Grupo " + i + "\n";

        for (let j = 1; j <= 5; j++) {
            if (j === 3) {
                output += "  Break no loop interno\n";
                break;
            }
            output += "  Item " + j + "\n";
        }
    }
    const resultDiv = document.getElementById('result4');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function break_demo5() {
    const numeros = [5, 10, -3, 20, 15];
    let todosPositivos = true;
    let output = '';

    for (let i = 0; i < numeros.length; i++) {
        if (numeros[i] < 0) {
            output += "❌ Número negativo encontrado: " + numeros[i] + "\n";
            todosPositivos = false;
            break;
        }
        output += "✓ " + numeros[i] + " é positivo\n";
    }

    if (todosPositivos) {
        output += "✅ Todos os números são positivos!";
    }

    const resultDiv = document.getElementById('result5');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

// ========================================
// NUMBERS.HTML DEMOS
// ========================================
function numbers_demo1() {
    let x = 0.1 + 0.2;
    showResult('result1', "0.1 + 0.2 = " + x);
}
function numbers_demo2() {
    let x = 10;
    let y = "20";
    let z = x + y;
    showResult('result2', "10 + '20' = " + z);
}
function numbers_demo3() {
    let x = 100 / "Apple";
    showResult('result3', "100 / 'Apple' = " + x);
}
function numbers_demo4() {
    let myNumber = 2;
    let txt = "";
    while (myNumber != Infinity) {
        myNumber = myNumber * myNumber;
        txt = txt + myNumber + "<br>";
    }
    showResult('result4', txt);
}
function numbers_demo5() {
    let x = 0xFF;
    showResult('result5', "0xFF = " + x);
}

// ========================================
// NUMBER_METHODS.HTML DEMOS
// ========================================
function numberMethods_demo1() {
    let x = 123;
    showResult('result1', x.toString() + "<br>" + (123).toString() + "<br>" + (100 + 23).toString());
}
function numberMethods_demo2() {
    let x = 9.656;
    showResult('result2', x.toFixed(0) + "<br>" + x.toFixed(2) + "<br>" + x.toFixed(4) + "<br>" + x.toFixed(6));
}
function numberMethods_demo3() {
    let x = 9.656;
    showResult('result3', x.toPrecision() + "<br>" + x.toPrecision(2) + "<br>" + x.toPrecision(4) + "<br>" + x.toPrecision(6));
}
function numberMethods_demo4() {
    showResult('result4', Number(true) + "<br>" + Number(false) + "<br>" + Number("10") + "<br>" + Number("  10") + "<br>" + Number("10  ") + "<br>" + Number(" 10  ") + "<br>" + Number("10.33") + "<br>" + Number("10,33") + "<br>" + Number("10 33") + "<br>" + Number("John"));
}
function numberMethods_demo5() {
    showResult('result5', parseInt("-10") + "<br>" + parseInt("-10.33") + "<br>" + parseInt("10") + "<br>" + parseInt("10.33") + "<br>" + parseInt("10 20 30") + "<br>" + parseInt("10 years") + "<br>" + parseInt("years 10"));
}
function numberMethods_demo6() {
    showResult('result6', Number.isInteger(10) + "<br>" + Number.isInteger(10.5));
}

// ========================================
// NUMBER_PROPERTIES.HTML DEMOS
// ========================================
function numberProperties_demo1() {
    let x = Number.EPSILON;
    showResult('result1', x);
}
function numberProperties_demo2() {
    showResult('result2', "MAX_VALUE: " + Number.MAX_VALUE + "<br>MIN_VALUE: " + Number.MIN_VALUE);
}
function numberProperties_demo3() {
    showResult('result3', "MAX_SAFE_INTEGER: " + Number.MAX_SAFE_INTEGER + "<br>MIN_SAFE_INTEGER: " + Number.MIN_SAFE_INTEGER);
}

// ========================================
// BITWISE.HTML DEMOS
// ========================================
function bitwise_demo1() {
    showResult('result1', "5 & 1 = " + (5 & 1));
}
function bitwise_demo2() {
    showResult('result2', "5 | 1 = " + (5 | 1));
}
function bitwise_demo3() {
    showResult('result3', "5 ^ 1 = " + (5 ^ 1));
}
function bitwise_demo4() {
    showResult('result4', "~5 = " + (~5));
}
function bitwise_demo5() {
    showResult('result5', "5 << 1 = " + (5 << 1) + "<br>5 >> 1 = " + (5 >> 1) + "<br>5 >>> 1 = " + (5 >>> 1));
}
function bitwise_demo6() {
    showResult('result6', dec2bin(-5));
}
function dec2bin(dec) {
    return (dec >>> 0).toString(2);
}

// ========================================
// BIGINT.HTML DEMOS
// ========================================
function bigint_demo1() {
    let x = 1234567890123456789012345n;
    let y = BigInt("1234567890123456789012345");
    showResult('result1', x + "<br>" + y);
}
function bigint_demo2() {
    let x = 9007199254740995n;
    let y = 9007199254740995n;
    let z = x * y;
    showResult('result2', z);
}
function bigint_demo3() {
    let x = 5n;
    let y = Number(x) / 2;
    showResult('result3', y);
}
function bigint_demo4() {
    showResult('result4', typeof 1234567890123456789012345n);
}

// ========================================
// FUNCTIONS.HTML DEMOS
// ========================================
function functions_demo1() {
    myFunction();
}
function myFunction() {
    showResult('result1', "Minha primeira função foi chamada!");
}

function functions_demo2() {
    let x = myFunctionProduct(4, 3);
    showResult('result2', "O produto de 4 e 3 é: " + x);
}
function myFunctionProduct(p1, p2) {
    return p1 * p2;
}

function functions_demo3() {
    let fahrenheit = 77;
    let celsius = toCelsius(fahrenheit);
    showResult('result3', fahrenheit + "°F é igual a " + celsius + "°C");
}
function toCelsius(fahrenheit) {
    return (5 / 9) * (fahrenheit - 32);
}

function functions_demo4() {
    let text = "A temperatura é " + toCelsius(77) + " Celsius";
    showResult('result4', text);
}

function functions_demo5() {
    let carName = "Volvo";
    let text = "Dentro da função: " + typeof carName + " " + carName;
    showResult('result5', text);
}

// ========================================
// EVENTS.HTML DEMOS
// ========================================
function events_demo1() {
    showResult('result1', Date());
}

// ========================================
// FUNCTIONS.HTML DEMOS
// ========================================
function functions_demo1() {
    function myFunction(p1, p2) {
        return p1 * p2;
    }
    const result = myFunction(4, 3);
    document.getElementById('demo1').innerHTML = "O resultado é: " + result;
}

function functions_demo2() {
    function toCelsius(fahrenheit) {
        return (5/9) * (fahrenheit - 32);
    }
    let value = toCelsius(77);
    document.getElementById('demo2').innerHTML = "77 graus Fahrenheit são " + value.toFixed(2) + " graus Celsius";
}

function functions_demo3() {
    function myFunction(a, b) {
        return a * b;
    }
    let x = myFunction(4, 3);
    document.getElementById('demo3').innerHTML = "O valor de x é: " + x;
}

function functions_demo4() {
    function toCelsius(fahrenheit) {
        return (5/9) * (fahrenheit - 32);
    }
    let text = "A temperatura é " + toCelsius(77).toFixed(2) + " Celsius";
    document.getElementById('demo4').innerHTML = text;
}

function functions_demo5() {
    function toCelsius(fahrenheit) {
        return (5/9) * (fahrenheit - 32);
    }
    let text = toCelsius;
    document.getElementById('demo5').innerHTML = "Função sem (): " + text;
}

function functions_demo6() {
    function toCelsius(fahrenheit) {
        return (5/9) * (fahrenheit - 32);
    }
    let x = toCelsius(77);
    let text = "A temperatura é " + x.toFixed(2) + " Celsius";
    document.getElementById('demo6').innerHTML = text;
}

function functions_demo7() {
    function toCelsius(fahrenheit) {
        return (5/9) * (fahrenheit - 32);
    }
    let text = "A temperatura é " + toCelsius(77).toFixed(2) + " Celsius";
    document.getElementById('demo7').innerHTML = text;
}

function functions_demo8() {
    function myFunction() {
        let carName = "Volvo";
        return "Dentro da função, carName é: " + carName;
    }
    try {
        document.getElementById('demo8').innerHTML = myFunction() + "<br>Fora da função, carName gera erro!";
    } catch(err) {
        document.getElementById('demo8').innerHTML = myFunction();
    }
}

// ========================================
// FUNCTION_PARAMETERS.HTML DEMOS
// ========================================
function functionParams_demo1() {
    function myFunction(x, y) {
        if (y === undefined) {
            y = 2;
        }
        return x * y;
    }
    document.getElementById('demo1').innerHTML = "Resultado com y undefined: " + myFunction(4) + "<br>Resultado com y definido: " + myFunction(4, 3);
}

function functionParams_demo2() {
    function myFunction(x, y = 10) {
        return x + y;
    }
    document.getElementById('demo2').innerHTML = "myFunction(5) = " + myFunction(5);
}

function functionParams_demo3() {
    function sum(...args) {
        let sum = 0;
        for (let arg of args) sum += arg;
        return sum;
    }
    let x = sum(4, 9, 16, 25, 29, 100, 66, 77);
    document.getElementById('demo3').innerHTML = "Soma de todos os argumentos: " + x;
}

function functionParams_demo4() {
    function findMax() {
        let max = -Infinity;
        for (let i = 0; i < arguments.length; i++) {
            if (arguments[i] > max) {
                max = arguments[i];
            }
        }
        return max;
    }
    let x = findMax(1, 123, 500, 115, 44, 88);
    document.getElementById('demo4').innerHTML = "O maior valor é: " + x;
}

function functionParams_demo5() {
    function sumAll() {
        let sum = 0;
        for (let i = 0; i < arguments.length; i++) {
            sum += arguments[i];
        }
        return sum;
    }
    let x = sumAll(1, 123, 500, 115, 44, 88);
    document.getElementById('demo5').innerHTML = "A soma de todos os valores é: " + x;
}

function functionParams_demo6() {
    function myFunction(x) {
        x = 10;
    }
    let y = 5;
    myFunction(y);
    document.getElementById('demo6').innerHTML = "Valor de y antes: 5<br>Chamou myFunction(y)<br>Valor de y depois: " + y + " (não mudou!)";
}

function functionParams_demo7() {
    function myFunction(obj) {
        obj.name = "BMW";
    }
    const myCar = {name: "Volvo"};
    document.getElementById('demo7').innerHTML = "Nome do carro antes: " + myCar.name;
    myFunction(myCar);
    document.getElementById('demo7').innerHTML += "<br>Nome do carro depois: " + myCar.name + " (mudou!)";
}

// ========================================
// FUNCTION_ARROW.HTML DEMOS
// ========================================
function arrowFunc_demo1() {
    let myFunction = (a, b) => a * b;
    document.getElementById('demo1').innerHTML = "myFunction(4, 5) = " + myFunction(4, 5);
}

function arrowFunc_demo2() {
    let hello = name => "Olá " + name;
    document.getElementById('demo2').innerHTML = hello("Mundo!");
}

function arrowFunc_demo3() {
    let multiply = (a, b) => a * b;
    document.getElementById('demo3').innerHTML = "multiply(7, 8) = " + multiply(7, 8);
}

function arrowFunc_demo4() {
    let myFunction = (a, b) => {
        let chuck = 42;
        return a * b * chuck;
    }
    document.getElementById('demo4').innerHTML = "myFunction(2, 3) = " + myFunction(2, 3);
}

function arrowFunc_demo5() {
    document.getElementById('demo5').innerHTML = "Com função regular, 'this' representa o objeto que chamou a função (window, document, button, etc.)";
}

function arrowFunc_demo6() {
    document.getElementById('demo6').innerHTML = "Com arrow function, 'this' representa o proprietário da função (objeto que definiu a arrow function)";
}

// ========================================
// OBJECTS.HTML DEMOS
// ========================================
function objects_demo1() {
    const person = {
        firstName: "John",
        lastName: "Doe",
        age: 50,
        eyeColor: "blue"
    };
    document.getElementById('demo1').innerHTML = person.firstName + " tem " + person.age + " anos.";
}

function objects_demo2() {
    const person = {
        firstName: "John",
        lastName: "Doe",
        age: 50,
        eyeColor: "blue"
    };
    document.getElementById('demo2').innerHTML = person.lastName;
}

function objects_demo3() {
    const person = {
        firstName: "John",
        lastName: "Doe",
        id: 5566,
        fullName: function() {
            return this.firstName + " " + this.lastName;
        }
    };
    document.getElementById('demo3').innerHTML = person.fullName();
}

// ========================================
// OBJECT_PROPERTIES.HTML DEMOS
// ========================================
function objectProperties_demo1() {
    const person = {
        firstname: "John",
        lastname: "Doe",
        age: 50,
        eyecolor: "blue"
    };
    document.getElementById('demo1').innerHTML = person.firstname + " is " + person.age + " years old.";
}

function objectProperties_demo2() {
    const person = {
        firstname: "John",
        lastname: "Doe",
        age: 50,
        eyecolor: "blue"
    };
    document.getElementById('demo2').innerHTML = person["firstname"] + " is " + person["age"] + " years old.";
}

function objectProperties_demo3() {
    const person = {
        firstname: "John",
        lastname: "Doe",
        age: 50,
        eyecolor: "blue"
    };
    person.nationality = "English";
    document.getElementById('demo3').innerHTML = person.firstname + " is " + person.nationality + ".";
}

function objectProperties_demo4() {
    const person = {
        firstName: "John",
        lastName: "Doe",
        age: 50,
        eyeColor: "blue"
    };
    delete person.age;
    document.getElementById('demo4').innerHTML = person.firstName + " is " + person.age + " years old.";
}

function objectProperties_demo5() {
    const myObj = {
        name: "John",
        age: 30,
        cars: {
            car1: "Ford",
            car2: "BMW",
            car3: "Fiat"
        }
    };
    document.getElementById('demo5').innerHTML = myObj.cars.car2;
}

// ========================================
// OBJECT_METHODS.HTML DEMOS
// ========================================
function objectMethods_demo1() {
    const person = {
        firstName: "John",
        lastName: "Doe",
        id: 5566,
        fullName: function() {
            return this.firstName + " " + this.lastName;
        }
    };
    document.getElementById('demo1').innerHTML = person.fullName();
}

function objectMethods_demo2() {
    const person = {
        firstName: "John",
        lastName: "Doe",
        id: 5566,
        fullName: function() {
            return this.firstName + " " + this.lastName;
        }
    };
    document.getElementById('demo2').innerHTML = person.fullName;
}

function objectMethods_demo3() {
    const person = {
        firstName: "John",
        lastName: "Doe",
        id: 5566
    };
    person.name = function() {
        return this.firstName + " " + this.lastName;
    };
    document.getElementById('demo3').innerHTML = "Meu pai é " + person.name();
}

function objectMethods_demo4() {
    let message = "Hello world!";
    let x = message.toUpperCase();
    document.getElementById('demo4').innerHTML = x;
}

// ========================================
// OBJECT_DISPLAY.HTML DEMOS
// ========================================
function objectDisplay_demo1() {
    const person = {
        name: "John",
        age: 30,
        city: "New York"
    };
    document.getElementById('demo1').innerHTML = person;
}

function objectDisplay_demo2() {
    const person = {
        name: "John",
        age: 30,
        city: "New York"
    };
    document.getElementById('demo2').innerHTML = person.name + "," + person.age + "," + person.city;
}

function objectDisplay_demo3() {
    const person = {
        name: "John",
        age: 30,
        city: "New York"
    };
    let txt = "";
    for (let x in person) {
        txt += person[x] + " ";
    }
    document.getElementById('demo3').innerHTML = txt;
}

function objectDisplay_demo4() {
    const person = {
        name: "John",
        age: 30,
        city: "New York"
    };
    const myArray = Object.values(person);
    document.getElementById('demo4').innerHTML = myArray;
}

function objectDisplay_demo5() {
    const person = {
        name: "John",
        age: 30,
        city: "New York"
    };
    let myString = JSON.stringify(person);
    document.getElementById('demo5').innerHTML = myString;
}

// ========================================
// DATES PAGE
// ========================================
function dates_demo1() {
    const d = new Date();
    document.getElementById('demo1').innerHTML = d;
}

function dates_demo2() {
    const d = new Date();
    document.getElementById('demo2').innerHTML = d;
}

function dates_demo3() {
    const d = new Date("October 13, 2014 11:13:00");
    document.getElementById('demo3').innerHTML = d;
}

function dates_demo4() {
    const d = new Date(2018, 11, 24, 10, 33, 30, 0);
    document.getElementById('demo4').innerHTML = d;
}

function dates_demo5() {
    const d = new Date(2018, 11, 24, 10, 33, 30);
    document.getElementById('demo5').innerHTML = d;
}

function dates_demo6() {
    const d = new Date(99, 11, 24);
    document.getElementById('demo6').innerHTML = d;
}

function dates_demo7() {
    const d = new Date(100000000000);
    document.getElementById('demo7').innerHTML = d;
}

// ========================================
// DATE FORMATS PAGE
// ========================================
function dateFormats_demo1() {
    const d = new Date("2015-03-25");
    document.getElementById('demo1').innerHTML = d;
}

function dateFormats_demo2() {
    const d = new Date("2015-03");
    document.getElementById('demo2').innerHTML = d;
}

function dateFormats_demo3() {
    const d = new Date("2015");
    document.getElementById('demo3').innerHTML = d;
}

function dateFormats_demo4() {
    const d = new Date("2015-03-25T12:00:00Z");
    document.getElementById('demo4').innerHTML = d;
}

function dateFormats_demo5() {
    const d = new Date("03/25/2015");
    document.getElementById('demo5').innerHTML = d;
}

function dateFormats_demo6() {
    const d = new Date("Mar 25 2015");
    document.getElementById('demo6').innerHTML = d;
}

// ========================================
// DATE GET METHODS PAGE
// ========================================
function dateGet_demo1() {
    const d = new Date();
    document.getElementById('demo1').innerHTML = d.getFullYear();
}

function dateGet_demo2() {
    const d = new Date();
    document.getElementById('demo2').innerHTML = d.getMonth();
}

function dateGet_demo3() {
    const d = new Date();
    const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    document.getElementById('demo3').innerHTML = months[d.getMonth()];
}

function dateGet_demo4() {
    const d = new Date();
    document.getElementById('demo4').innerHTML = d.getDate();
}

function dateGet_demo5() {
    const d = new Date();
    document.getElementById('demo5').innerHTML = d.getDay();
}

function dateGet_demo6() {
    const d = new Date();
    const days = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
    document.getElementById('demo6').innerHTML = days[d.getDay()];
}

function dateGet_demo7() {
    const d = new Date();
    document.getElementById('demo7').innerHTML = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
}

// ========================================
// DATE SET METHODS PAGE
// ========================================
function dateSet_demo1() {
    const d = new Date();
    d.setFullYear(2020);
    document.getElementById('demo1').innerHTML = d;
}

function dateSet_demo2() {
    const d = new Date();
    d.setFullYear(2020, 11, 3);
    document.getElementById('demo2').innerHTML = d;
}

function dateSet_demo3() {
    const d = new Date();
    d.setMonth(11);
    document.getElementById('demo3').innerHTML = d;
}

function dateSet_demo4() {
    const d = new Date();
    d.setDate(15);
    document.getElementById('demo4').innerHTML = d;
}

function dateSet_demo5() {
    const d = new Date();
    d.setDate(d.getDate() + 50);
    document.getElementById('demo5').innerHTML = d;
}

function dateSet_demo6() {
    const d = new Date();
    d.setHours(22);
    document.getElementById('demo6').innerHTML = d;
}

// ========================================
// CARROSSEL DE SLIDES
// ========================================
let currentSlide = 0;
let totalSlides = 15;
let autoPlayInterval = null;
let isPlaying = true;

function initCarousel() {
    const carouselTrack = document.getElementById('carouselTrack');
    const indicatorsContainer = document.getElementById('carouselIndicators');
    
    // Verifica se o carrossel existe na página
    if (!carouselTrack || !indicatorsContainer) return;
    
    // Criar indicadores (bolinhas)
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Ir para slide ${i + 1}`);
        dot.onclick = () => goToSlide(i);
        indicatorsContainer.appendChild(dot);
    }
    
    // Iniciar auto-play
    startAutoPlay();
}

function updateCarousel() {
    const track = document.getElementById('carouselTrack');
    const dots = document.querySelectorAll('.carousel-dot');
    const counter = document.getElementById('slideCounter');
    
    if (!track) return;
    
    // Mover o track
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Atualizar indicadores
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
    
    // Atualizar contador
    if (counter) {
        counter.textContent = `${currentSlide + 1} / ${totalSlides}`;
    }
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
    
    // Reiniciar auto-play se estiver ativo
    if (isPlaying) {
        stopAutoPlay();
        startAutoPlay();
    }
}

function startAutoPlay() {
    if (autoPlayInterval) return;
    autoPlayInterval = setInterval(nextSlide, 10000); // 10 segundos
    isPlaying = true;
    updatePlayPauseButton();
}

function stopAutoPlay() {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
    }
    isPlaying = false;
    updatePlayPauseButton();
}

function toggleAutoPlay() {
    if (isPlaying) {
        stopAutoPlay();
    } else {
        startAutoPlay();
    }
}

function updatePlayPauseButton() {
    const btn = document.getElementById('playPauseBtn');
    if (btn) {
        btn.innerHTML = isPlaying ? '⏸️ Pausar' : '▶️ Reproduzir';
    }
}

// ========================================
// ARRAYS.HTML DEMOS (Atualizados)
// ========================================
function arrays_demo1() {
    const cars = ["Saab", "Volvo", "BMW"];
    document.getElementById('demo1').innerHTML = cars;
}

function arrays_demo2() {
    const cars = ["Saab", "Volvo", "BMW"];
    document.getElementById('demo2').innerHTML = cars[0];
}

function arrays_demo3() {
    const cars = ["Saab", "Volvo", "BMW"];
    cars[0] = "Opel";
    document.getElementById('demo3').innerHTML = cars;
}

function arrays_demo4() {
    const fruits = ["Banana", "Laranja", "Maçã", "Manga"];
    document.getElementById('demo4').innerHTML = fruits.length;
}

function arrays_demo5() {
    const fruits = ["Banana", "Laranja", "Maçã", "Manga"];
    let fLen = fruits.length;
    let text = "<ul>";
    for (let i = 0; i < fLen; i++) {
        text += "<li>" + fruits[i] + "</li>";
    }
    text += "</ul>";
    document.getElementById('demo5').innerHTML = text;
}

function arrays_demo6() {
    const fruits = ["Banana", "Laranja", "Maçã"];
    fruits.push("Limão");
    document.getElementById('demo6').innerHTML = fruits;
}

function arrays_demo7() {
    const fruits = ["Banana", "Laranja", "Maçã"];
    fruits[fruits.length] = "Limão";
    document.getElementById('demo7').innerHTML = fruits;
}

function arrays_demo8() {
    const person = [];
    person[0] = "John";
    person[1] = "Doe";
    person[2] = 46;
    document.getElementById('demo8').innerHTML = person[0] + " " + person.length;
}

// ========================================
// ARRAY_METHODS.HTML DEMOS
// ========================================
function arrayMethods_demo1() {
    const fruits = ["Banana", "Laranja", "Maçã", "Manga"];
    document.getElementById('demo1').innerHTML = fruits.length;
}

function arrayMethods_demo2() {
    const fruits = ["Banana", "Laranja", "Maçã", "Manga"];
    document.getElementById('demo2').innerHTML = fruits.toString();
}

function arrayMethods_demo3() {
    const fruits = ["Banana", "Laranja", "Maçã", "Manga"];
    document.getElementById('demo3').innerHTML = fruits.at(2) + "<br>Ou com índice negativo: " + fruits.at(-1);
}

function arrayMethods_demo4() {
    const fruits = ["Banana", "Laranja", "Maçã", "Manga"];
    document.getElementById('demo4').innerHTML = fruits.join(" * ");
}

function arrayMethods_demo5() {
    const fruits = ["Banana", "Laranja", "Maçã", "Manga"];
    let fruit = fruits.pop();
    document.getElementById('demo5').innerHTML = "Removido: " + fruit + "<br>Array: " + fruits;
}

function arrayMethods_demo6() {
    const fruits = ["Banana", "Laranja", "Maçã", "Manga"];
    fruits.push("Kiwi");
    document.getElementById('demo6').innerHTML = fruits;
}

function arrayMethods_demo7() {
    const fruits = ["Banana", "Laranja", "Maçã", "Manga"];
    let fruit = fruits.shift();
    document.getElementById('demo7').innerHTML = "Removido: " + fruit + "<br>Array: " + fruits;
}

function arrayMethods_demo8() {
    const fruits = ["Banana", "Laranja", "Maçã", "Manga"];
    fruits.unshift("Limão");
    document.getElementById('demo8').innerHTML = fruits;
}

function arrayMethods_demo9() {
    const myGirls = ["Cecilie", "Lone"];
    const myBoys = ["Emil", "Tobias", "Linus"];
    const myChildren = myGirls.concat(myBoys);
    document.getElementById('demo9').innerHTML = myChildren;
}

function arrayMethods_demo10() {
    const fruits = ["Banana", "Laranja", "Maçã", "Manga"];
    fruits.splice(2, 0, "Limão", "Kiwi");
    document.getElementById('demo10').innerHTML = fruits;
}

function arrayMethods_demo11() {
    const fruits = ["Banana", "Laranja", "Limão", "Maçã", "Manga"];
    const citrus = fruits.slice(1, 3);
    document.getElementById('demo11').innerHTML = "Original: " + fruits + "<br>Slice: " + citrus;
}

function arrayMethods_demo12() {
    const myArr = [[1,2],[3,4],[5,6]];
    const newArr = myArr.flat();
    document.getElementById('demo12').innerHTML = newArr;
}

// ========================================
// ARRAY_SEARCH.HTML DEMOS
// ========================================
function arraySearch_demo1() {
    const fruits = ["Maçã", "Laranja", "Maçã", "Manga"];
    let position = fruits.indexOf("Maçã");
    document.getElementById('demo1').innerHTML = "Posição: " + position;
}

function arraySearch_demo2() {
    const fruits = ["Maçã", "Laranja", "Maçã", "Manga"];
    let position = fruits.lastIndexOf("Maçã");
    document.getElementById('demo2').innerHTML = "Última posição: " + position;
}

function arraySearch_demo3() {
    const fruits = ["Maçã", "Laranja", "Maçã", "Manga"];
    document.getElementById('demo3').innerHTML = fruits.includes("Manga");
}

function arraySearch_demo4() {
    const numbers = [4, 9, 16, 25, 29];
    let first = numbers.find(x => x > 18);
    document.getElementById('demo4').innerHTML = "Primeiro valor > 18: " + first;
}

function arraySearch_demo5() {
    const numbers = [4, 9, 16, 25, 29];
    let firstIndex = numbers.findIndex(x => x > 18);
    document.getElementById('demo5').innerHTML = "Índice do primeiro > 18: " + firstIndex;
}

function arraySearch_demo6() {
    const temp = [27, 28, 30, 40, 42, 35, 30];
    let high = temp.findLast(x => x > 35);
    document.getElementById('demo6').innerHTML = "Último valor > 35: " + high;
}

function arraySearch_demo7() {
    const temp = [27, 28, 30, 40, 42, 35, 30];
    let pos = temp.findLastIndex(x => x > 35);
    document.getElementById('demo7').innerHTML = "Índice do último > 35: " + pos;
}

// ========================================
// ARRAY_SORT.HTML DEMOS
// ========================================
function arraySort_demo1() {
    const fruits = ["Banana", "Laranja", "Maçã", "Manga"];
    fruits.sort();
    document.getElementById('demo1').innerHTML = fruits;
}

function arraySort_demo2() {
    const fruits = ["Banana", "Laranja", "Maçã", "Manga"];
    fruits.reverse();
    document.getElementById('demo2').innerHTML = fruits;
}

function arraySort_demo3() {
    const fruits = ["Banana", "Laranja", "Maçã", "Manga"];
    const sorted = fruits.toSorted();
    document.getElementById('demo3').innerHTML = "Original: " + fruits + "<br>Ordenado: " + sorted;
}

function arraySort_demo4() {
    const fruits = ["Banana", "Laranja", "Maçã", "Manga"];
    const reversed = fruits.toReversed();
    document.getElementById('demo4').innerHTML = "Original: " + fruits + "<br>Invertido: " + reversed;
}

function arraySort_demo5() {
    const points = [40, 100, 1, 5, 25, 10];
    points.sort(function(a, b){return a - b});
    document.getElementById('demo5').innerHTML = points;
}

function arraySort_demo6() {
    const points = [40, 100, 1, 5, 25, 10];
    points.sort(function(a, b){return b - a});
    document.getElementById('demo6').innerHTML = points;
}

function arraySort_demo7() {
    const points = [40, 100, 1, 5, 25, 10];
    points.sort(function(a, b){return a - b});
    document.getElementById('demo7').innerHTML = "Menor: " + points[0];
}

function arraySort_demo8() {
    const points = [40, 100, 1, 5, 25, 10];
    points.sort(function(a, b){return b - a});
    document.getElementById('demo8').innerHTML = "Maior: " + points[0];
}

function arraySort_demo9() {
    const points = [40, 100, 1, 5, 25, 10];
    points.sort(() => 0.5 - Math.random());
    document.getElementById('demo9').innerHTML = points;
}

// ========================================
// ARRAY_ITERATION.HTML DEMOS
// ========================================
function arrayIteration_demo1() {
    const numbers = [45, 4, 9, 16, 25];
    let txt = "";
    numbers.forEach(myFunction);
    function myFunction(value, index, array) {
        txt += value + "<br>";
    }
    document.getElementById('demo1').innerHTML = txt;
}

function arrayIteration_demo2() {
    const numbers1 = [45, 4, 9, 16, 25];
    const numbers2 = numbers1.map(myFunction);
    function myFunction(value, index, array) {
        return value * 2;
    }
    document.getElementById('demo2').innerHTML = numbers2;
}

function arrayIteration_demo3() {
    const myArr = [1, 2, 3, 4, 5, 6];
    const newArr = myArr.flatMap(x => [x, x * 10]);
    document.getElementById('demo3').innerHTML = newArr;
}

function arrayIteration_demo4() {
    const numbers = [45, 4, 9, 16, 25];
    const over18 = numbers.filter(myFunction);
    function myFunction(value, index, array) {
        return value > 18;
    }
    document.getElementById('demo4').innerHTML = over18;
}

function arrayIteration_demo5() {
    const numbers = [45, 4, 9, 16, 25];
    let sum = numbers.reduce(myFunction);
    function myFunction(total, value, index, array) {
        return total + value;
    }
    document.getElementById('demo5').innerHTML = "Soma: " + sum;
}

function arrayIteration_demo6() {
    const numbers = [45, 4, 9, 16, 25];
    let sum = numbers.reduceRight(myFunction);
    function myFunction(total, value, index, array) {
        return total + value;
    }
    document.getElementById('demo6').innerHTML = "Soma (direita para esquerda): " + sum;
}

function arrayIteration_demo7() {
    const numbers = [45, 4, 9, 16, 25];
    let allOver18 = numbers.every(myFunction);
    function myFunction(value, index, array) {
        return value > 18;
    }
    document.getElementById('demo7').innerHTML = "Todos > 18? " + allOver18;
}

function arrayIteration_demo8() {
    const numbers = [45, 4, 9, 16, 25];
    let someOver18 = numbers.some(myFunction);
    function myFunction(value, index, array) {
        return value > 18;
    }
    document.getElementById('demo8').innerHTML = "Algum > 18? " + someOver18;
}

function arrayIteration_demo9() {
    let myArr = Array.from("ABCDEFG");
    document.getElementById('demo9').innerHTML = myArr;
}

function arrayIteration_demo10() {
    const fruits = ["Banana", "Laranja", "Maçã", "Manga"];
    const keys = fruits.keys();
    let text = "";
    for (let x of keys) {
        text += x + "<br>";
    }
    document.getElementById('demo10').innerHTML = text;
}

function arrayIteration_demo11() {
    const fruits = ["Banana", "Laranja", "Maçã"];
    const f = fruits.entries();
    let text = "";
    for (let x of f) {
        text += x + "<br>";
    }
    document.getElementById('demo11').innerHTML = text;
}

function arrayIteration_demo12() {
    const months = ["Janeiro", "Fevereiro", "Março", "Abril"];
    const myMonths = months.with(2, "Março Atualizado");
    document.getElementById('demo12').innerHTML = "Original: " + months + "<br>Novo: " + myMonths;
}

// ========================================
// ARRAY_CONST.HTML DEMOS
// ========================================
function arrayConst_demo1() {
    const cars = ["Saab", "Volvo", "BMW"];
    document.getElementById('demo1').innerHTML = cars;
}

function arrayConst_demo2() {
    const cars = ["Saab", "Volvo", "BMW"];
    cars[0] = "Toyota";
    cars.push("Audi");
    document.getElementById('demo2').innerHTML = cars;
}

function arrayConst_demo3() {
    const cars = ["Saab", "Volvo", "BMW"];
    // cars = ["Toyota", "Volvo", "Audi"]; // Erro!
    document.getElementById('demo3').innerHTML = "Erro! Não é possível reatribuir um array const.";
}

function arrayConst_demo4() {
    const cars = ["Saab", "Volvo", "BMW"];
    // No mesmo escopo:
    // var cars = ["Toyota"];  // Erro
    // let cars = ["Toyota"];  // Erro
    // const cars = ["Toyota"]; // Erro
    document.getElementById('demo4').innerHTML = "Não é possível redeclarar no mesmo escopo!";
}

function arrayConst_demo5() {
    const cars = ["Saab", "Volvo", "BMW"]; // escopo global
    {
        const cars = ["Toyota", "Audi"]; // escopo de bloco - permitido
        document.getElementById('demo5').innerHTML = "No bloco: " + cars;
    }
    // Aqui cars ainda é ["Saab", "Volvo", "BMW"]
}

// ========================================
// ARRAY_REFERENCE.HTML DEMO
// ========================================
function arrayRef_demo1() {
    const fruits = ["Banana", "Laranja", "Maçã", "Manga"];
    let output = "";
    output += "Array: " + fruits.toString() + "<br>";
    output += "Length: " + fruits.length + "<br>";
    output += "at(1): " + fruits.at(1) + "<br>";
    output += "indexOf('Maçã'): " + fruits.indexOf("Maçã") + "<br>";
    output += "includes('Manga'): " + fruits.includes("Manga") + "<br>";
    output += "join(' - '): " + fruits.join(" - ") + "<br>";
    document.getElementById('demo1').innerHTML = output;
}

// ========================================
// TYPED-ARRAYS.HTML DEMOS
// ========================================
function typedArrays_demo1() {
    const myArr = new Uint8Array(5);
    let output = "Array criado: [" + myArr.toString() + "]\n";
    output += "Tipo: " + myArr.constructor.name + "\n";
    output += "Tamanho: " + myArr.length + " elementos\n";
    output += "Bytes por elemento: " + myArr.BYTES_PER_ELEMENT;
    const resultDiv = document.getElementById('result1');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function typedArrays_demo2() {
    const myArr = new Uint8Array([0, 1, 2, 3, 4]);
    let output = "Array criado: [" + myArr.toString() + "]\n";
    output += "Tipo: " + myArr.constructor.name + "\n";
    output += "Valores: " + Array.from(myArr).join(", ");
    const resultDiv = document.getElementById('result2');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function typedArrays_demo3() {
    const myArr = Uint8Array.of(0, 1, 2, 3, 4);
    let output = "Array criado com of(): [" + myArr.toString() + "]\n";
    output += "Tipo: " + myArr.constructor.name + "\n";
    output += "Tamanho: " + myArr.length + " elementos";
    const resultDiv = document.getElementById('result3');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function typedArrays_demo4() {
    const myArr = Uint8Array.from([0, 1, 2, 3, 4]);
    let output = "Array criado com from(): [" + myArr.toString() + "]\n";
    output += "Tipo: " + myArr.constructor.name + "\n";
    output += "Tamanho: " + myArr.length + " elementos";
    const resultDiv = document.getElementById('result4');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function typedArrays_demo5() {
    const signedArr = new Int8Array(10);
    const unsignedArr = new Uint8Array(10);
    const clampedArr = new Uint8ClampedArray(10);
    
    let output = "Int8Array (com sinal):\n";
    output += "  Intervalo: -128 a 127\n";
    output += "  Tamanho: " + signedArr.length + " elementos\n\n";
    
    output += "Uint8Array (sem sinal):\n";
    output += "  Intervalo: 0 a 255\n";
    output += "  Tamanho: " + unsignedArr.length + " elementos\n\n";
    
    output += "Uint8ClampedArray (clamped):\n";
    output += "  Intervalo: 0 a 255 (valores são 'clampados')\n";
    output += "  Tamanho: " + clampedArr.length + " elementos";
    
    const resultDiv = document.getElementById('result5');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function typedArrays_demo6() {
    const uint8 = new Uint8Array(1);
    const clamped = new Uint8ClampedArray(1);
    
    uint8[0] = 300;
    clamped[0] = 300;
    
    let output = "Atribuindo valor 300:\n\n";
    output += "Uint8Array[0] = 300\n";
    output += "Resultado: " + uint8[0] + " (300 & 255 = 44)\n\n";
    output += "Uint8ClampedArray[0] = 300\n";
    output += "Resultado: " + clamped[0] + " (clampado para 255)\n\n";
    
    uint8[0] = -10;
    clamped[0] = -10;
    
    output += "Atribuindo valor -10:\n\n";
    output += "Uint8Array[0] = -10\n";
    output += "Resultado: " + uint8[0] + " (-10 & 255 = 246)\n\n";
    output += "Uint8ClampedArray[0] = -10\n";
    output += "Resultado: " + clamped[0] + " (clampado para 0)";
    
    const resultDiv = document.getElementById('result6');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function typedArrays_demo7() {
    const int16 = new Int16Array([-32768, 0, 32767]);
    const uint16 = new Uint16Array([0, 32768, 65535]);
    const int32 = new Int32Array([-2147483648, 2147483647]);
    const uint32 = new Uint32Array([0, 4294967295]);
    
    let output = "Int16Array (2 bytes, com sinal):\n";
    output += "  Valores: [" + int16.toString() + "]\n\n";
    
    output += "Uint16Array (2 bytes, sem sinal):\n";
    output += "  Valores: [" + uint16.toString() + "]\n\n";
    
    output += "Int32Array (4 bytes, com sinal):\n";
    output += "  Valores: [" + int32.toString() + "]\n\n";
    
    output += "Uint32Array (4 bytes, sem sinal):\n";
    output += "  Valores: [" + uint32.toString() + "]";
    
    const resultDiv = document.getElementById('result7');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function typedArrays_demo8() {
    const float32 = new Float32Array([3.14, 2.718, 1.618]);
    const float64 = new Float64Array([3.141592653589793]);
    
    let output = "Float32Array (4 bytes, precisão normal):\n";
    output += "  Valores: [" + Array.from(float32).map(n => n.toFixed(6)).join(", ") + "]\n";
    output += "  Bytes por elemento: " + float32.BYTES_PER_ELEMENT + "\n\n";
    
    output += "Float64Array (8 bytes, precisão dupla):\n";
    output += "  Valores: [" + Array.from(float64).map(n => n.toFixed(15)).join(", ") + "]\n";
    output += "  Bytes por elemento: " + float64.BYTES_PER_ELEMENT + "\n\n";
    
    output += "📌 Float32 tem ~7 dígitos significativos\n";
    output += "📌 Float64 tem ~15 dígitos significativos";
    
    const resultDiv = document.getElementById('result8');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

// ========================================
// TYPED_METHODS.HTML DEMOS
// ========================================
function typedMethods_demo1() {
    const myArr = Int16Array.from("1234567890");
    let output = "Int16Array.from('1234567890'):\n\n";
    output += "Resultado: [" + myArr.toString() + "]\n\n";
    output += "Cada caractere é convertido para seu valor numérico:\n";
    output += "'1' → 1, '2' → 2, '3' → 3, etc.";
    const resultDiv = document.getElementById('result1');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function typedMethods_demo2() {
    const myArr = Int16Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]);
    let output = "Int16Array.from([1,2,3,4,5,6,7,8,9,0]):\n\n";
    output += "Resultado: [" + myArr.toString() + "]\n";
    output += "Tamanho: " + myArr.length + " elementos\n";
    output += "Bytes totais: " + myArr.byteLength;
    const resultDiv = document.getElementById('result2');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function typedMethods_demo3() {
    const myArr = Int16Array.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 0);
    let output = "Int16Array.of(1,2,3,4,5,6,7,8,9,0):\n\n";
    output += "Resultado: [" + myArr.toString() + "]\n";
    output += "Tamanho: " + myArr.length + " elementos\n";
    output += "Bytes por elemento: " + myArr.BYTES_PER_ELEMENT;
    const resultDiv = document.getElementById('result3');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function typedMethods_demo4() {
    const int8 = new Int8Array(5);
    const int32 = new Int32Array(5);
    const float64 = new Float64Array(5);
    
    let output = "myArr.constructor.name:\n\n";
    output += "Int8Array → " + int8.constructor.name + "\n";
    output += "Int32Array → " + int32.constructor.name + "\n";
    output += "Float64Array → " + float64.constructor.name;
    
    const resultDiv = document.getElementById('result4');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function typedMethods_demo5() {
    const int8 = new Int8Array(5);
    const int16 = new Int16Array(5);
    const int32 = new Int32Array(5);
    const float32 = new Float32Array(5);
    const float64 = new Float64Array(5);
    
    let output = "BYTES_PER_ELEMENT:\n\n";
    output += "Int8Array: " + int8.BYTES_PER_ELEMENT + " byte\n";
    output += "Int16Array: " + int16.BYTES_PER_ELEMENT + " bytes\n";
    output += "Int32Array: " + int32.BYTES_PER_ELEMENT + " bytes\n";
    output += "Float32Array: " + float32.BYTES_PER_ELEMENT + " bytes\n";
    output += "Float64Array: " + float64.BYTES_PER_ELEMENT + " bytes";
    
    const resultDiv = document.getElementById('result5');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function typedMethods_demo6() {
    const myArr = new Uint8Array(5);
    myArr.fill(200);
    
    let output = "const myArr = new Uint8Array(5);\n";
    output += "myArr.fill(200);\n\n";
    output += "Resultado: [" + myArr.toString() + "]\n";
    output += "Todos os 5 elementos preenchidos com 200";
    
    const resultDiv = document.getElementById('result6');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function typedMethods_demo7() {
    const myArr = new Uint8Array([1, 2, 3, 4, 5]);
    const original = myArr.toString();
    myArr.fill(200, 1, 4);
    
    let output = "const myArr = new Uint8Array([1, 2, 3, 4, 5]);\n";
    output += "myArr.fill(200, 1, 4);\n\n";
    output += "Array original: [" + original + "]\n";
    output += "Após fill(200, 1, 4): [" + myArr.toString() + "]\n\n";
    output += "Preenche índices 1 a 3 (4 não incluso) com 200";
    
    const resultDiv = document.getElementById('result7');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function typedMethods_demo8() {
    const myArr = new Uint8Array([5, 12, 8, 25, 44]);
    const found = myArr.find(x => x > 18);
    const foundIndex = myArr.findIndex(x => x > 18);
    
    let output = "const myArr = new Uint8Array([5, 12, 8, 25, 44]);\n\n";
    output += "myArr.find(x => x > 18):\n";
    output += "Resultado: " + found + " (primeiro valor > 18)\n\n";
    output += "myArr.findIndex(x => x > 18):\n";
    output += "Resultado: " + foundIndex + " (índice do valor 25)";
    
    const resultDiv = document.getElementById('result8');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function typedMethods_demo9() {
    const myArr = new Uint8Array([5, 12, 8, 25, 44]);
    const hasLarge = myArr.some(x => x > 18);
    const allLarge = myArr.every(x => x > 18);
    
    let output = "const myArr = new Uint8Array([5, 12, 8, 25, 44]);\n\n";
    output += "myArr.some(x => x > 18):\n";
    output += "Resultado: " + hasLarge + " (25 e 44 são > 18)\n\n";
    output += "myArr.every(x => x > 18):\n";
    output += "Resultado: " + allLarge + " (5, 12 e 8 são ≤ 18)";
    
    const resultDiv = document.getElementById('result9');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

// ========================================
// TYPED_REFERENCE.HTML DEMO
// ========================================
function typedRef_demo1() {
    const myArr = new Uint8Array([10, 20, 30, 40, 50]);
    
    let output = "const myArr = new Uint8Array([10, 20, 30, 40, 50]);\n\n";
    output += "Propriedades e Métodos:\n";
    output += "─────────────────────────\n";
    output += "toString(): [" + myArr.toString() + "]\n";
    output += "length: " + myArr.length + "\n";
    output += "byteLength: " + myArr.byteLength + " bytes\n";
    output += "BYTES_PER_ELEMENT: " + myArr.BYTES_PER_ELEMENT + "\n";
    output += "constructor.name: " + myArr.constructor.name + "\n";
    output += "at(2): " + myArr.at(2) + "\n";
    output += "at(-1): " + myArr.at(-1) + " (último elemento)\n";
    output += "includes(30): " + myArr.includes(30) + "\n";
    output += "indexOf(40): " + myArr.indexOf(40) + "\n";
    output += "join(' - '): " + myArr.join(' - ');
    
    const resultDiv = document.getElementById('result1');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

// ============================================
// ARRAY BUFFERS DEMOS
// ============================================

function arrayBuffers_demo1() {
    const buffer = new ArrayBuffer(16);
    let output = "ArrayBuffer criado com 16 bytes\n";
    output += "byteLength: " + buffer.byteLength;
    
    const resultDiv = document.getElementById('result1');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function arrayBuffers_demo2() {
    const buffer = new ArrayBuffer(16);
    const view = new DataView(buffer);
    view.setInt32(0, 123456);
    
    let output = "DataView criado\n";
    output += "Valor armazenado no byte 0: " + view.getInt32(0);
    
    const resultDiv = document.getElementById('result2');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function arrayBuffers_demo3() {
    const buffer = new ArrayBuffer(8);
    const view = new DataView(buffer);
    view.setFloat32(0, 3.14);
    view.setInt8(4, 42);
    
    let output = "Múltiplos tipos armazenados:\n";
    output += "Float32 no byte 0: " + view.getFloat32(0) + "\n";
    output += "Int8 no byte 4: " + view.getInt8(4);
    
    const resultDiv = document.getElementById('result3');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function arrayBuffers_demo4() {
    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);
    view.setUint8(0, 255);
    view.setUint8(1, 128);
    view.setUint8(2, 64);
    view.setUint8(3, 0);
    
    let output = "Bytes individuais:\n";
    output += "Byte 0: " + view.getUint8(0) + "\n";
    output += "Byte 1: " + view.getUint8(1) + "\n";
    output += "Byte 2: " + view.getUint8(2) + "\n";
    output += "Byte 3: " + view.getUint8(3);
    
    const resultDiv = document.getElementById('result4');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function arrayBuffers_demo5() {
    const buffer = new ArrayBuffer(8);
    const int16View = new Int16Array(buffer);
    const int32View = new Int32Array(buffer);
    
    int16View[0] = 10;
    int32View[1] = 20;
    
    let output = "Múltiplas views do mesmo buffer:\n";
    output += "Int16Array[0]: " + int16View[0] + "\n";
    output += "Int32Array[1]: " + int32View[1];
    
    const resultDiv = document.getElementById('result5');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function arrayBuffers_demo6() {
    const buffer = new ArrayBuffer(16);
    const sliced = buffer.slice(4, 12);
    
    let output = "Buffer original: " + buffer.byteLength + " bytes\n";
    output += "Buffer fatiado (4-12): " + sliced.byteLength + " bytes";
    
    const resultDiv = document.getElementById('result6');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function arrayBuffers_demo7() {
    const buffer = new ArrayBuffer(3);
    const view = new Uint8Array(buffer);
    view[0] = 255;
    view[1] = 0;
    view[2] = 128;
    
    let output = "Cor RGB armazenada:\n";
    output += "R: " + view[0] + "\n";
    output += "G: " + view[1] + "\n";
    output += "B: " + view[2] + "\n";
    output += "Cor: rgb(" + view[0] + "," + view[1] + "," + view[2] + ")";
    
    const resultDiv = document.getElementById('result7');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

// ============================================
// SETS DEMOS
// ============================================

function sets_demo1() {
    const mySet = new Set();
    mySet.add(1);
    mySet.add(2);
    mySet.add(3);
    
    let output = "Set criado com add():\n";
    output += "Valores: " + Array.from(mySet).join(", ");
    
    const resultDiv = document.getElementById('result1');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function sets_demo2() {
    const mySet = new Set([1, 2, 3, 4, 5]);
    
    let output = "Set criado de um array:\n";
    output += "Valores: " + Array.from(mySet).join(", ") + "\n";
    output += "Tamanho: " + mySet.size;
    
    const resultDiv = document.getElementById('result2');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function sets_demo3() {
    const mySet = new Set([1, 2, 3]);
    mySet.add(4);
    mySet.add(5);
    mySet.add(3);
    
    let output = "Adicionando valores (3 é duplicado):\n";
    output += "Valores: " + Array.from(mySet).join(", ") + "\n";
    output += "Tamanho: " + mySet.size;
    
    const resultDiv = document.getElementById('result3');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function sets_demo4() {
    const mySet = new Set([1, 2, 3, 4, 5]);
    
    let output = "Verificando existência:\n";
    output += "has(3): " + mySet.has(3) + "\n";
    output += "has(10): " + mySet.has(10);
    
    const resultDiv = document.getElementById('result4');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function sets_demo5() {
    const mySet = new Set(["Alice", "Bob", "Charlie"]);
    let output = "forEach() iterando:\n";
    mySet.forEach(value => {
        output += value + "\n";
    });
    
    const resultDiv = document.getElementById('result5');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function sets_demo6() {
    const mySet = new Set([10, 20, 30]);
    let output = "for...of iterando:\n";
    for (const value of mySet) {
        output += value + "\n";
    }
    
    const resultDiv = document.getElementById('result6');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function sets_demo7() {
    const mySet = new Set([1, 2, 3]);
    const iterator = mySet.values();
    
    let output = "Iterator values():\n";
    output += iterator.next().value + "\n";
    output += iterator.next().value + "\n";
    output += iterator.next().value;
    
    const resultDiv = document.getElementById('result7');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function sets_demo8() {
    const numbers = [1, 2, 2, 3, 3, 3, 4, 4, 5];
    const unique = [...new Set(numbers)];
    
    let output = "Array original:\n" + numbers.join(", ") + "\n\n";
    output += "Sem duplicatas:\n" + unique.join(", ");
    
    const resultDiv = document.getElementById('result8');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function sets_demo9() {
    const mySet = new Set();
    mySet.add(1);
    mySet.add("texto");
    mySet.add(true);
    mySet.add({name: "Alice"});
    
    let output = "Set com tipos diferentes:\n";
    output += "Número: 1\n";
    output += "String: 'texto'\n";
    output += "Boolean: true\n";
    output += "Objeto: {name: 'Alice'}\n";
    output += "Tamanho: " + mySet.size;
    
    const resultDiv = document.getElementById('result9');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

// ============================================
// SET METHODS DEMOS
// ============================================

function setMethods_demo1() {
    const mySet = new Set();
    mySet.add(1).add(2).add(3);
    
    let output = "Encadeamento de add():\n";
    output += "Valores: " + Array.from(mySet).join(", ");
    
    const resultDiv = document.getElementById('result1');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function setMethods_demo2() {
    const mySet = new Set([1, 2, 3, 4, 5]);
    mySet.delete(3);
    
    let output = "Removendo o valor 3:\n";
    output += "Valores: " + Array.from(mySet).join(", ") + "\n";
    output += "has(3): " + mySet.has(3);
    
    const resultDiv = document.getElementById('result2');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function setMethods_demo3() {
    const mySet = new Set([1, 2, 3, 4, 5]);
    
    let output = "Antes do clear():\n";
    output += "Tamanho: " + mySet.size + "\n\n";
    
    mySet.clear();
    
    output += "Depois do clear():\n";
    output += "Tamanho: " + mySet.size;
    
    const resultDiv = document.getElementById('result3');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function setMethods_demo4() {
    const mySet = new Set([1, 2, 3]);
    
    let output = "Verificando valores:\n";
    output += "has(2): " + mySet.has(2) + "\n";
    output += "has(10): " + mySet.has(10) + "\n";
    output += "Complexidade: O(1)";
    
    const resultDiv = document.getElementById('result4');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function setMethods_demo5() {
    const mySet = new Set(["a", "b", "c"]);
    const iterator = mySet.values();
    
    let output = "Iterator values():\n";
    output += iterator.next().value + "\n";
    output += iterator.next().value + "\n";
    output += iterator.next().value;
    
    const resultDiv = document.getElementById('result5');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function setMethods_demo6() {
    const mySet = new Set([10, 20, 30]);
    const keysIterator = mySet.keys();
    
    let output = "keys() (idêntico a values()):\n";
    output += keysIterator.next().value + "\n";
    output += keysIterator.next().value + "\n";
    output += keysIterator.next().value;
    
    const resultDiv = document.getElementById('result6');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function setMethods_demo7() {
    const mySet = new Set(["x", "y", "z"]);
    let output = "entries() [valor, valor]:\n";
    
    for (const [key, value] of mySet.entries()) {
        output += "[" + key + ", " + value + "]\n";
    }
    
    const resultDiv = document.getElementById('result7');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function setMethods_demo8() {
    const fruits = new Set(["Apple", "Banana", "Orange"]);
    let output = "forEach() com callback:\n";
    
    fruits.forEach((value1, value2, set) => {
        output += value1 + " (tamanho: " + set.size + ")\n";
    });
    
    const resultDiv = document.getElementById('result8');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

// ============================================
// SET LOGIC DEMOS
// ============================================

function union(setA, setB) {
    return new Set([...setA, ...setB]);
}

function intersection(setA, setB) {
    return new Set([...setA].filter(x => setB.has(x)));
}

function difference(setA, setB) {
    return new Set([...setA].filter(x => !setB.has(x)));
}

function symmetricDifference(setA, setB) {
    const diff1 = difference(setA, setB);
    const diff2 = difference(setB, setA);
    return union(diff1, diff2);
}

function isSubset(setA, setB) {
    for (const elem of setA) {
        if (!setB.has(elem)) {
            return false;
        }
    }
    return true;
}

function isSuperset(setA, setB) {
    return isSubset(setB, setA);
}

function isDisjoint(setA, setB) {
    for (const elem of setA) {
        if (setB.has(elem)) {
            return false;
        }
    }
    return true;
}

function setLogic_demo1() {
    const setA = new Set([1, 2, 3]);
    const setB = new Set([3, 4, 5]);
    const result = union(setA, setB);
    
    let output = "Set A: {" + Array.from(setA).join(", ") + "}\n";
    output += "Set B: {" + Array.from(setB).join(", ") + "}\n";
    output += "A ∪ B: {" + Array.from(result).join(", ") + "}";
    
    const resultDiv = document.getElementById('result1');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function setLogic_demo2() {
    const setA = new Set([1, 2, 3, 4]);
    const setB = new Set([3, 4, 5, 6]);
    const result = intersection(setA, setB);
    
    let output = "Set A: {" + Array.from(setA).join(", ") + "}\n";
    output += "Set B: {" + Array.from(setB).join(", ") + "}\n";
    output += "A ∩ B: {" + Array.from(result).join(", ") + "}";
    
    const resultDiv = document.getElementById('result2');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function setLogic_demo3() {
    const setA = new Set([1, 2, 3, 4]);
    const setB = new Set([3, 4, 5, 6]);
    const result = difference(setA, setB);
    
    let output = "Set A: {" + Array.from(setA).join(", ") + "}\n";
    output += "Set B: {" + Array.from(setB).join(", ") + "}\n";
    output += "A - B: {" + Array.from(result).join(", ") + "}";
    
    const resultDiv = document.getElementById('result3');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function setLogic_demo4() {
    const setA = new Set([1, 2, 3, 4]);
    const setB = new Set([3, 4, 5, 6]);
    const result = symmetricDifference(setA, setB);
    
    let output = "Set A: {" + Array.from(setA).join(", ") + "}\n";
    output += "Set B: {" + Array.from(setB).join(", ") + "}\n";
    output += "A ⊕ B: {" + Array.from(result).join(", ") + "}";
    
    const resultDiv = document.getElementById('result4');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function setLogic_demo5() {
    const setA = new Set([1, 2]);
    const setB = new Set([1, 2, 3, 4]);
    const result = isSubset(setA, setB);
    
    let output = "Set A: {" + Array.from(setA).join(", ") + "}\n";
    output += "Set B: {" + Array.from(setB).join(", ") + "}\n";
    output += "A ⊆ B: " + result;
    
    const resultDiv = document.getElementById('result5');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function setLogic_demo6() {
    const setA = new Set([1, 2, 3, 4]);
    const setB = new Set([1, 2]);
    const result = isSuperset(setA, setB);
    
    let output = "Set A: {" + Array.from(setA).join(", ") + "}\n";
    output += "Set B: {" + Array.from(setB).join(", ") + "}\n";
    output += "A ⊇ B: " + result;
    
    const resultDiv = document.getElementById('result6');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function setLogic_demo7() {
    const setA = new Set([1, 2]);
    const setB = new Set([3, 4]);
    const result = isDisjoint(setA, setB);
    
    let output = "Set A: {" + Array.from(setA).join(", ") + "}\n";
    output += "Set B: {" + Array.from(setB).join(", ") + "}\n";
    output += "Disjuntos: " + result;
    
    const resultDiv = document.getElementById('result7');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function setLogic_demo8() {
    const onlineUsers = new Set(["Alice", "Bob", "Charlie"]);
    const premiumUsers = new Set(["Bob", "Charlie", "David"]);
    
    const onlineAndPremium = intersection(onlineUsers, premiumUsers);
    const onlineOnly = difference(onlineUsers, premiumUsers);
    
    let output = "Usuários online E premium:\n";
    output += Array.from(onlineAndPremium).join(", ") + "\n\n";
    output += "Usuários online mas NÃO premium:\n";
    output += Array.from(onlineOnly).join(", ");
    
    const resultDiv = document.getElementById('result8');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

// ============================================
// WEAKSET DEMOS
// ============================================

function setWeak_demo1() {
    const weakSet = new WeakSet();
    const obj1 = { name: "Alice" };
    const obj2 = { name: "Bob" };
    
    weakSet.add(obj1);
    weakSet.add(obj2);
    
    let output = "WeakSet criado\n";
    output += "has(obj1): " + weakSet.has(obj1) + "\n";
    output += "has(obj2): " + weakSet.has(obj2);
    
    const resultDiv = document.getElementById('result1');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function setWeak_demo2() {
    const weakSet = new WeakSet();
    let output = "";
    
    try {
        weakSet.add({ id: 1 });
        weakSet.add([1, 2, 3]);
        output += "✅ Objetos adicionados com sucesso\n\n";
        
        weakSet.add(42);
    } catch (e) {
        output += "❌ Erro ao adicionar primitivo:\n";
        output += e.message;
    }
    
    const resultDiv = document.getElementById('result2');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function setWeak_demo3() {
    let weakSet = new WeakSet();
    let obj = { data: "importante" };
    
    weakSet.add(obj);
    
    let output = "Objeto adicionado ao WeakSet\n";
    output += "has(obj): " + weakSet.has(obj) + "\n\n";
    output += "Após obj = null:\n";
    output += "O objeto pode ser coletado pelo GC\n";
    output += "WeakSet NÃO mantém o objeto vivo";
    
    obj = null;
    
    const resultDiv = document.getElementById('result3');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function setWeak_demo4() {
    const ws = new WeakSet();
    const obj = { id: 1 };
    
    ws.add(obj);
    let output = "Métodos disponíveis:\n\n";
    output += "add(obj) ✅\n";
    output += "has(obj): " + ws.has(obj) + "\n";
    
    ws.delete(obj);
    output += "\nApós delete():\n";
    output += "has(obj): " + ws.has(obj) + "\n\n";
    output += "❌ Não possui: clear(), size, forEach()";
    
    const resultDiv = document.getElementById('result4');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function setWeak_demo5() {
    const processedElements = new WeakSet();
    
    function processElement(element) {
        if (processedElements.has(element)) {
            return "Já processado";
        }
        processedElements.add(element);
        return "Processando...";
    }
    
    const div = { tag: "div" };
    
    let output = "1ª tentativa: " + processElement(div) + "\n";
    output += "2ª tentativa: " + processElement(div);
    
    const resultDiv = document.getElementById('result5');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function setWeak_demo6() {
    let output = "Set vs WeakSet - Memória:\n\n";
    output += "❌ Set:\n";
    output += "- Mantém referências fortes\n";
    output += "- PODE causar vazamento\n\n";
    output += "✅ WeakSet:\n";
    output += "- Referências fracas\n";
    output += "- Permite garbage collection\n";
    output += "- NÃO causa vazamento";
    
    const resultDiv = document.getElementById('result6');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

// ============================================
// SET REFERENCE DEMOS
// ============================================

function setReference_demo1() {
    const set1 = new Set();
    const set2 = new Set([1, 2, 3]);
    const set3 = new Set("Hello");
    
    let output = "Set vazio: " + Array.from(set1).join(", ") + "\n";
    output += "Set de array: " + Array.from(set2).join(", ") + "\n";
    output += "Set de string: " + Array.from(set3).join(", ");
    
    const resultDiv = document.getElementById('result1');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function setReference_demo2() {
    const mySet = new Set([1, 2, 3, 4, 5]);
    
    let output = "Propriedade size:\n";
    output += "Tamanho do Set: " + mySet.size;
    
    const resultDiv = document.getElementById('result2');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function setReference_demo3() {
    const set = new Set();
    
    set.add(1).add(2).add(3);
    let output = "Após add(): " + Array.from(set).join(", ") + "\n";
    output += "has(2): " + set.has(2) + "\n";
    
    set.delete(2);
    output += "Após delete(2): " + Array.from(set).join(", ") + "\n";
    output += "size: " + set.size + "\n\n";
    
    set.clear();
    output += "Após clear(): size = " + set.size;
    
    const resultDiv = document.getElementById('result3');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function setReference_demo4() {
    const ws = new WeakSet();
    const obj = { name: "Alice" };
    
    ws.add(obj);
    let output = "WeakSet criado\n";
    output += "has(obj): " + ws.has(obj) + "\n\n";
    
    ws.delete(obj);
    output += "Após delete():\n";
    output += "has(obj): " + ws.has(obj);
    
    const resultDiv = document.getElementById('result4');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

function setReference_demo5() {
    const set = new Set([1, 2, 3]);
    
    let output = "CHEAT SHEET:\n\n";
    output += "new Set([1,2,3])\n";
    output += "set.add(4)\n";
    output += "set.has(2) → true\n";
    output += "set.delete(2)\n";
    output += "set.clear()\n";
    output += "set.size → " + set.size + "\n";
    output += "[...set] → array";
    
    const resultDiv = document.getElementById('result5');
    resultDiv.querySelector('div').textContent = output;
    resultDiv.classList.remove('hidden');
}

// ============================================
// MAPS DEMOS
// ============================================

function maps_demo1() {
    const usuarios = new Map();
    usuarios.set('admin', 'Jhonnatan');
    usuarios.set('editor', 'Ana');

    let output = "Map criado com 2 entradas\n\n";
    output += "admin → " + usuarios.get('admin') + "\n";
    output += "editor → " + usuarios.get('editor') + "\n\n";
    output += "size → " + usuarios.size;

    showResult('result1', output);
}

function maps_demo2() {
    const m = new Map();
    const objKey = { id: 1 };

    m.set(objKey, 'valor para objeto');
    m.set(10, 'dez');
    m.set(true, 'sim');

    let output = "Chaves de tipos diferentes:\n\n";
    output += "objKey → " + m.get(objKey) + "\n";
    output += "10 → " + m.get(10) + "\n";
    output += "true → " + m.get(true) + "\n\n";
    output += "size → " + m.size;

    showResult('result2', output);
}

function maps_demo3() {
    const precos = new Map([
        ['café', 8],
        ['pão', 2],
        ['leite', 6]
    ]);

    let output = "Iterando com entries():\n\n";
    for (const [produto, preco] of precos.entries()) {
        output += produto + " → R$ " + preco + "\n";
    }

    showResult('result3', output);
}

function maps_demo4() {
    const m = new Map([['a', 1], ['b', 2]]);
    const arr = Array.from(m);
    const m2 = new Map(arr);

    let output = "Map original: " + JSON.stringify(Array.from(m)) + "\n";
    output += "Array.from(map): " + JSON.stringify(arr) + "\n";
    output += "Map reconstruído: " + JSON.stringify(Array.from(m2));

    showResult('result4', output);
}

// ============================================
// MAP METHODS DEMOS
// ============================================

function mapMethods_demo1() {
    const m = new Map();
    m.set('a', 1).set('b', 2).set('c', 3);

    let output = "Encadeamento com set():\n";
    output += "a → " + m.get('a') + "\n";
    output += "b → " + m.get('b') + "\n";
    output += "c → " + m.get('c') + "\n\n";
    output += "size → " + m.size;

    showResult('result1', output);
}

function mapMethods_demo2() {
    const m = new Map([
        ['token', 'abc123'],
        ['role', 'admin']
    ]);

    let output = "has('token') → " + m.has('token') + "\n";
    output += "delete('token') → " + m.delete('token') + "\n";
    output += "has('token') → " + m.has('token') + "\n\n";
    output += "size → " + m.size;

    showResult('result2', output);
}

function mapMethods_demo3() {
    const m = new Map([
        ['x', 10],
        ['y', 20],
        ['z', 30]
    ]);

    const keys = Array.from(m.keys());
    const values = Array.from(m.values());
    const entries = Array.from(m.entries());

    let output = "keys(): " + JSON.stringify(keys) + "\n";
    output += "values(): " + JSON.stringify(values) + "\n";
    output += "entries(): " + JSON.stringify(entries);

    showResult('result3', output);
}

function mapMethods_demo4() {
    const m = new Map([
        ['primeiro', 1],
        ['segundo', 2],
        ['terceiro', 3]
    ]);

    let output = "forEach preserva a ordem de inserção:\n\n";
    m.forEach((value, key) => {
        output += key + " → " + value + "\n";
    });

    showResult('result4', output);
}

// ============================================
// WEAKMAP DEMOS
// ============================================

function weakMap_demo1() {
    const wm = new WeakMap();
    const user = { id: 1, name: 'Ana' };
    wm.set(user, { lastLogin: 'hoje', role: 'editor' });

    let output = "WeakMap criado\n\n";
    output += "has(user) → " + wm.has(user) + "\n";
    output += "get(user).role → " + wm.get(user).role;

    showResult('result1', output);
}

function weakMap_demo2() {
    const wm = new WeakMap();
    let output = "";

    try {
        wm.set(1, 'não pode');
    } catch (e) {
        output += "❌ Erro ao usar chave primitiva:\n";
        output += e.message;
    }

    showResult('result2', output);
}

function weakMap_demo3() {
    let wm = new WeakMap();
    let obj = { cacheKey: 'x' };

    wm.set(obj, { cachedAt: Date.now() });

    let output = "Dados associados a um objeto.\n\n";
    output += "Antes: has(obj) → " + wm.has(obj) + "\n\n";
    output += "Se obj ficar inacessível (ex.: obj = null),\n";
    output += "o garbage collector pode liberar a memória.\n";
    output += "WeakMap não mantém o objeto vivo.";

    obj = null;
    wm = null;

    showResult('result3', output);
}

function weakMap_demo4() {
    const priv = new WeakMap();

    function createUser(name) {
        const user = { name };
        priv.set(user, { passwordHash: '***', createdAt: new Date().toISOString() });
        return user;
    }

    const u = createUser('Carlos');
    const meta = priv.get(u);

    let output = "Caso de uso: metadados privados por objeto\n\n";
    output += "user.name → " + u.name + "\n";
    output += "createdAt (privado) → " + meta.createdAt;

    showResult('result4', output);
}

// ============================================
// MAP REFERENCE DEMOS
// ============================================

function mapReference_demo1() {
    const m = new Map([
        ['a', 1],
        ['b', 2]
    ]);

    let output = "new Map([['a',1],['b',2]])\n\n";
    output += "entries → " + JSON.stringify(Array.from(m.entries())) + "\n";
    output += "size → " + m.size;

    showResult('result1', output);
}

function mapReference_demo2() {
    const m = new Map();
    m.set('x', 10);
    m.set('y', 20);

    let output = "Após set('x',10) e set('y',20):\n";
    output += "size → " + m.size + "\n";
    output += "get('x') → " + m.get('x') + "\n";
    output += "has('z') → " + m.has('z') + "\n\n";
    output += "delete('x') → " + m.delete('x') + "\n";
    output += "size → " + m.size;

    showResult('result2', output);
}

function mapReference_demo3() {
    const wm = new WeakMap();
    const obj = { id: 7 };
    wm.set(obj, 'ok');

    let output = "WeakMap básico:\n\n";
    output += "has(obj) → " + wm.has(obj) + "\n";
    output += "get(obj) → " + wm.get(obj) + "\n";
    output += "delete(obj) → " + wm.delete(obj) + "\n";
    output += "has(obj) → " + wm.has(obj);

    showResult('result3', output);
}

// ============================================
// ITERATIONS DEMOS
// ============================================

function iterations_demo1() {
    const arr = ["a", "b", "c"];
    const str = "JS";

    let output = "for...of em Array:\n";
    for (const v of arr) {
        output += v + " ";
    }

    output += "\n\nfor...of em String:\n";
    for (const ch of str) {
        output += ch + " ";
    }

    showResult('result1', output.trim());
}

function iterations_demo2() {
    const m = new Map([
        ['nome', 'Ana'],
        ['idade', 22]
    ]);

    let output = "Iterando Map (entries):\n\n";
    for (const [k, v] of m) {
        output += k + " → " + v + "\n";
    }

    showResult('result2', output);
}

function iterations_demo3() {
    const range = {
        from: 1,
        to: 5,
        [Symbol.iterator]() {
            let current = this.from;
            const end = this.to;
            return {
                next() {
                    if (current <= end) {
                        return { value: current++, done: false };
                    }
                    return { value: undefined, done: true };
                }
            };
        }
    };

    let output = "Iterável custom (1..5):\n";
    for (const n of range) {
        output += n + " ";
    }

    showResult('result3', output.trim());
}

function iterations_demo4() {
    const arr = [10, 20, 30];
    const it = arr[Symbol.iterator]();

    let output = "Iterator manual com next():\n\n";
    let step = it.next();
    while (!step.done) {
        output += "value: " + step.value + "\n";
        step = it.next();
    }
    output += "done: true";

    showResult('result4', output);
}

// ============================================
// LOOPING DEMOS
// ============================================

function looping_demo1() {
    let output = "for (0..3): ";
    for (let i = 0; i <= 3; i++) {
        output += i + " ";
    }

    output += "\n\nwhile (i<=3): ";
    let j = 0;
    while (j <= 3) {
        output += j + " ";
        j++;
    }

    output += "\n\ndo...while (executa 1x): ";
    let k = 5;
    do {
        output += k + " ";
        k++;
    } while (k < 5);

    showResult('result1', output.trim());
}

function looping_demo2() {
    let output = "break e continue (1..10):\n\n";
    for (let i = 1; i <= 10; i++) {
        if (i % 2 === 0) {
            continue;
        }
        if (i > 7) {
            output += "(break em i>7)\n";
            break;
        }
        output += "i=" + i + " (ímpar)\n";
    }

    showResult('result2', output);
}

function looping_demo3() {
    const user = { nome: 'Ana', idade: 22, cidade: 'SP' };
    const arr = ['a', 'b', 'c'];

    let output = "for...in (objeto):\n";
    for (const key in user) {
        output += key + " → " + user[key] + "\n";
    }

    output += "\nfor...of (array):\n";
    for (const value of arr) {
        output += value + "\n";
    }

    showResult('result3', output);
}

function looping_demo4() {
    let output = "Mini tabuada (1..3):\n\n";
    for (let a = 1; a <= 3; a++) {
        for (let b = 1; b <= 3; b++) {
            output += a + "×" + b + "=" + (a * b) + "  ";
        }
        output += "\n";
    }

    showResult('result4', output);
}

// ============================================
// ITERABLES DEMOS
// ============================================

function iterables_demo1() {
    function isIterable(value) {
        return value != null && typeof value[Symbol.iterator] === 'function';
    }

    const samples = [
        { label: 'Array', value: [1, 2] },
        { label: 'String', value: 'JS' },
        { label: 'Map', value: new Map([[1, 'a']]) },
        { label: 'Set', value: new Set([1, 2]) },
        { label: 'Object', value: { a: 1 } },
        { label: 'Number', value: 10 },
        { label: 'null', value: null }
    ];

    let output = "Testando iterabilidade:\n\n";
    for (const s of samples) {
        output += s.label + " → " + isIterable(s.value) + "\n";
    }

    showResult('result1', output);
}

function iterables_demo2() {
    const str = "ABC";
    const arr = [10, 20, 30];
    const set = new Set(['x', 'y']);
    const map = new Map([['id', 1], ['ok', true]]);

    let output = "for...of em String: ";
    for (const ch of str) output += ch + " ";

    output += "\nfor...of em Array: ";
    for (const n of arr) output += n + " ";

    output += "\nfor...of em Set: ";
    for (const v of set) output += v + " ";

    output += "\n\nMap (entries):\n";
    for (const [k, v] of map) {
        output += k + " → " + v + "\n";
    }

    showResult('result2', output.trim());
}

function iterables_demo3() {
    const set = new Set([1, 2, 2, 3]);
    const arr1 = [...set];
    const arr2 = Array.from('JS');

    let output = "Spread em Set (remove duplicatas):\n";
    output += "Set: " + JSON.stringify(Array.from(set)) + "\n";
    output += "[...set]: " + JSON.stringify(arr1) + "\n\n";
    output += "Array.from('JS'): " + JSON.stringify(arr2);

    showResult('result3', output);
}

function iterables_demo4() {
    const bag = {
        items: ['café', 'pão', 'leite'],
        [Symbol.iterator]() {
            let i = 0;
            const list = this.items;
            return {
                next() {
                    if (i < list.length) {
                        return { value: list[i++], done: false };
                    }
                    return { value: undefined, done: true };
                }
            };
        }
    };

    let output = "Iterável customizado (bag):\n";
    for (const v of bag) {
        output += "- " + v + "\n";
    }

    showResult('result4', output);
}

// ============================================
// ITERATORS DEMOS
// ============================================

function iterators_demo1() {
    const arr = ['a', 'b', 'c'];
    const it = arr.values();

    let output = "arr.values() + next():\n\n";
    let step = it.next();
    while (!step.done) {
        output += JSON.stringify(step) + "\n";
        step = it.next();
    }
    output += JSON.stringify(step);

    showResult('result1', output);
}

function iterators_demo2() {
    const map = new Map([['x', 10], ['y', 20]]);
    const it = map.entries();

    let output = "map.entries() + next():\n\n";
    output += JSON.stringify(it.next()) + "\n";
    output += JSON.stringify(it.next()) + "\n";
    output += JSON.stringify(it.next());

    showResult('result2', output);
}

function iterators_demo3() {
    const counter = {
        current: 0,
        next() {
            this.current++;
            return { value: this.current, done: this.current >= 5 };
        }
    };

    let output = "Iterador simples (1..5):\n\n";
    let step = counter.next();
    while (!step.done) {
        output += "value: " + step.value + "\n";
        step = counter.next();
    }
    output += "done: true (último value: " + step.value + ")";

    showResult('result3', output);
}

function iterators_demo4() {
    const arr = [1];
    const it = arr[Symbol.iterator]();

    const first = it.next();
    const second = it.next();

    let output = "Consumindo um iterador até o fim:\n\n";
    output += "1ª chamada: " + JSON.stringify(first) + "\n";
    output += "2ª chamada: " + JSON.stringify(second);

    showResult('result4', output);
}

// ============================================
// GENERATORS DEMOS
// ============================================

function generators_demo1() {
    function* gen() {
        yield 1;
        yield 2;
        yield 3;
    }

    const g = gen();
    let output = "Generator básico:\n\n";
    output += JSON.stringify(g.next()) + "\n";
    output += JSON.stringify(g.next()) + "\n";
    output += JSON.stringify(g.next()) + "\n";
    output += JSON.stringify(g.next());

    showResult('result1', output);
}

function generators_demo2() {
    function* askName() {
        const name = yield "Qual é o seu nome?";
        yield "Olá, " + name + "!";
    }

    const g = askName();
    const q = g.next();
    const a = g.next('Jhonnatan');
    const end = g.next();

    let output = "next(value) envia dado para dentro do generator:\n\n";
    output += "1ª next(): " + JSON.stringify(q) + "\n";
    output += "2ª next('Jhonnatan'): " + JSON.stringify(a) + "\n";
    output += "3ª next(): " + JSON.stringify(end);

    showResult('result2', output);
}

function generators_demo3() {
    function* fib(limit) {
        let a = 0;
        let b = 1;
        while (a <= limit) {
            yield a;
            const next = a + b;
            a = b;
            b = next;
        }
    }

    const values = [];
    for (const n of fib(50)) {
        values.push(n);
    }

    let output = "Fibonacci até 50 (lazy):\n\n";
    output += values.join(", ");

    showResult('result3', output);
}

function generators_demo4() {
    function* mix() {
        yield* [1, 2];
        yield* "JS";
    }

    const out = [];
    for (const v of mix()) {
        out.push(v);
    }

    let output = "yield* delega para outro iterável:\n\n";
    output += out.map(v => JSON.stringify(v)).join(" ");

    showResult('result4', output);
}

// ============================================
// MATH DEMOS
// ============================================

function math_demo1() {
    const x = 4.7;
    const y = -4.7;

    let output = "Arredondamento:\n\n";
    output += "x = " + x + "\n";
    output += "round(x): " + Math.round(x) + "\n";
    output += "ceil(x):  " + Math.ceil(x) + "\n";
    output += "floor(x): " + Math.floor(x) + "\n";
    output += "trunc(x): " + Math.trunc(x) + "\n\n";
    output += "y = " + y + "\n";
    output += "round(y): " + Math.round(y) + "\n";
    output += "ceil(y):  " + Math.ceil(y) + "\n";
    output += "floor(y): " + Math.floor(y) + "\n";
    output += "trunc(y): " + Math.trunc(y);

    showResult('result1', output);
}

function math_demo2() {
    const a = 2;
    const b = 10;
    const n = 64;

    let output = "Potências e raízes:\n\n";
    output += "Math.pow(" + a + ", " + b + ") = " + Math.pow(a, b) + "\n";
    output += a + " ** " + b + " = " + (a ** b) + "\n\n";
    output += "Math.sqrt(" + n + ") = " + Math.sqrt(n) + "\n";
    output += "Math.cbrt(" + n + ") = " + Math.cbrt(n);

    showResult('result2', output);
}

function math_demo3() {
    const values = [3, -12, 7, 0, 19];
    const x = -42;

    let output = "Min/Max e valores absolutos:\n\n";
    output += "values = [" + values.join(", ") + "]\n";
    output += "min = " + Math.min(...values) + "\n";
    output += "max = " + Math.max(...values) + "\n\n";
    output += "x = " + x + "\n";
    output += "abs(x) = " + Math.abs(x) + "\n";
    output += "sign(x) = " + Math.sign(x);

    showResult('result3', output);
}

function math_demo4() {
    const deg = 45;
    const rad = (deg * Math.PI) / 180;
    const backToDeg = (rad * 180) / Math.PI;

    let output = "Constantes e conversão:\n\n";
    output += "PI = " + Math.PI + "\n";
    output += "E  = " + Math.E + "\n";
    output += "SQRT2 = " + Math.SQRT2 + "\n\n";
    output += deg + "° em radianos = " + rad + "\n";
    output += rad + " rad em graus ≈ " + backToDeg;

    showResult('result4', output);
}

// ============================================
// RANDOM DEMOS
// ============================================

function random_demo1() {
    const r = Math.random();
    let output = "Math.random() gera [0, 1):\n\n";
    output += "random = " + r;

    showResult('result1', output);
}

function random_demo2() {
    const r = Math.floor(Math.random() * 10);
    let output = "Inteiro de 0 a 9:\n\n";
    output += "Math.floor(Math.random() * 10) = " + r;

    showResult('result2', output);
}

function random_demo3() {
    function randInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const min = 10;
    const max = 20;
    const samples = [];
    for (let i = 0; i < 8; i++) {
        samples.push(randInt(min, max));
    }

    let output = "Inteiro no intervalo (inclusive):\n\n";
    output += "min = " + min + ", max = " + max + "\n";
    output += "amostras: " + samples.join(", ");

    showResult('result3', output);
}

function random_demo4() {
    const colors = ["azul", "verde", "roxo", "laranja", "vermelho"]; 
    const pick = colors[Math.floor(Math.random() * colors.length)];

    let output = "Escolher item aleatório:\n\n";
    output += "itens: [" + colors.join(", ") + "]\n";
    output += "sorteado: " + pick;

    showResult('result4', output);
}

// ============================================
// MATH REFERENCE DEMOS
// ============================================

function mathRef_demo1() {
    const constants = {
        PI: Math.PI,
        E: Math.E,
        SQRT2: Math.SQRT2,
        LN2: Math.LN2
    };

    let output = "Constantes selecionadas:\n\n";
    Object.keys(constants).forEach(k => {
        output += k + " = " + constants[k] + "\n";
    });

    showResult('result1', output.trim());
}

function mathRef_demo2() {
    const x = 12.345;
    const out = {
        trunc: Math.trunc(x),
        floor: Math.floor(x),
        round: Math.round(x),
        ceil: Math.ceil(x)
    };

    let output = "Comparando métodos de arredondamento:\n\n";
    output += "x = " + x + "\n";
    output += JSON.stringify(out, null, 2);

    showResult('result2', output);
}

function mathRef_demo3() {
    const values = [5, 9, -3, 18, 2];
    let output = "min/max com spread ( ...array ):\n\n";
    output += "values = [" + values.join(", ") + "]\n";
    output += "min = " + Math.min(...values) + "\n";
    output += "max = " + Math.max(...values);

    showResult('result3', output);
}

function mathRef_demo4() {
    const dx = 3;
    const dy = 4;
    const dist = Math.hypot(dx, dy);
    let output = "Math.hypot calcula √(dx² + dy²):\n\n";
    output += "dx = " + dx + ", dy = " + dy + "\n";
    output += "distância = " + dist;

    showResult('result4', output);
}

// ============================================
// REGEXP DEMOS
// ============================================

function regexp_demo1() {
    const text = "JavaScript é incrível!";
    const literal = /script/i;
    const ctor = new RegExp("script", "i");
    let output = "Literal vs RegExp() + test():\n\n";
    output += "texto: " + text + "\n\n";
    output += "literal /script/i -> " + literal.test(text) + "\n";
    output += "new RegExp(\"script\", \"i\") -> " + ctor.test(text);
    showResult('result1', output);
}

function regexp_demo2() {
    const text = "Emails: a@a.com, b@b.com, invalido@, c@c.com";
    const matches = text.match(/[\w.-]+@[\w.-]+\.[A-Za-z]{2,}/g) || [];
    let output = "match() para extrair ocorrências:\n\n";
    output += "texto: " + text + "\n\n";
    output += "encontrados: [" + matches.join(", ") + "]";
    showResult('result2', output);
}

function regexp_demo3() {
    const text = "Meu telefone é 11 91234-5678 e o seu é 21 99876-0000.";
    const masked = text.replace(/\b(\d{2})\s?(\d{4,5})-(\d{4})\b/g, "(xx) xxxxx-xxxx");
    let output = "replace() com regex:\n\n";
    output += "original: " + text + "\n";
    output += "mascarado: " + masked;
    showResult('result3', output);
}

function regexp_demo4() {
    const text = "Nome: Ana, Idade: 27";
    const re = /Nome:\s*(\w+),\s*Idade:\s*(\d+)/;
    const m = re.exec(text);
    let output = "exec() e grupos capturados:\n\n";
    output += "texto: " + text + "\n\n";
    if (!m) {
        output += "Sem match";
    } else {
        output += "match[0]: " + m[0] + "\n";
        output += "nome (grupo 1): " + m[1] + "\n";
        output += "idade (grupo 2): " + m[2];
    }
    showResult('result4', output);
}

// ============================================
// REGEXP FLAGS DEMOS
// ============================================

function regexpFlags_demo1() {
    const text = "a a a";
    const one = text.match(/a/);
    const all = text.match(/a/g);
    let output = "Sem g vs com g:\n\n";
    output += "texto: " + text + "\n";
    output += "match(/a/) -> " + JSON.stringify(one) + "\n";
    output += "match(/a/g) -> " + JSON.stringify(all);
    showResult('result1', output);
}

function regexpFlags_demo2() {
    const text = "JavaScript";
    let output = "Ignore case (i):\n\n";
    output += "texto: " + text + "\n";
    output += "/script/.test -> " + /script/.test(text) + "\n";
    output += "/script/i.test -> " + /script/i.test(text);
    showResult('result2', output);
}

function regexpFlags_demo3() {
    const text = "um\ndois\ntrês";
    const noM = text.match(/^\w+/g);
    const withM = text.match(/^\w+/gm);
    let output = "Multiline (m) com ^:\n\n";
    output += "texto:\n" + text + "\n\n";
    output += "match(/^\\w+/g) -> " + JSON.stringify(noM) + "\n";
    output += "match(/^\\w+/gm) -> " + JSON.stringify(withM);
    showResult('result3', output);
}

function regexpFlags_demo4() {
    const text = "a\nX";
    let output = "DotAll (s) com .:\n\n";
    output += "texto:\n" + text + "\n\n";
    try {
        output += "/a.X/.test -> " + /a.X/.test(text) + "\n";
        output += "/a.X/s.test -> " + /a.X/s.test(text);
    } catch (e) {
        output += "Seu navegador não suporta a flag 's'.";
    }
    showResult('result4', output);
}

// ============================================
// REGEXP CHARACTERS DEMOS
// ============================================

function regexpChars_demo1() {
    const text = "Pedido #123: 2 itens, total R$ 45";
    const nums = text.match(/\d+/g) || [];
    let output = "Extrair dígitos (\\d+):\n\n";
    output += "texto: " + text + "\n";
    output += "números: [" + nums.join(", ") + "]";
    showResult('result1', output);
}

function regexpChars_demo2() {
    const text = "palavra_1 palavra2 outra";
    const words = text.match(/\w+/g) || [];
    let output = "Palavras com \\w+:\n\n";
    output += "texto: " + text + "\n";
    output += "tokens: [" + words.join(", ") + "]";
    showResult('result2', output);
}

function regexpChars_demo3() {
    const text = "um   dois\ntrês\tquatro";
    const parts = text.trim().split(/\s+/);
    let output = "Dividir por espaços (\\s+):\n\n";
    output += "texto: " + JSON.stringify(text) + "\n";
    output += "partes: [" + parts.join(", ") + "]";
    showResult('result3', output);
}

function regexpChars_demo4() {
    const text = "CPF: 123.456.789-00";
    const onlyDigits = text.replace(/\D+/g, "");
    let output = "Remover não-dígitos (\\D+):\n\n";
    output += "original: " + text + "\n";
    output += "só dígitos: " + onlyDigits;
    showResult('result4', output);
}

// ============================================
// META CHARACTERS DEMOS
// ============================================

function regexpMeta_demo1() {
    const text = "hat hit hot hut";
    const m = text.match(/h.t/g) || [];
    let output = "Ponto (.) casa qualquer caractere:\n\n";
    output += "texto: " + text + "\n";
    output += "/h.t/g -> [" + m.join(", ") + "]";
    showResult('result1', output);
}

function regexpMeta_demo2() {
    const text = "abc\nabc";
    let output = "^ e $ (com e sem m):\n\n";
    output += "texto:\n" + text + "\n\n";
    output += "^abc$ (sem m) -> " + (/^abc$/.test(text)) + "\n";
    output += "^abc$ (com m) -> " + (/^abc$/m.test(text));
    showResult('result2', output);
}

function regexpMeta_demo3() {
    const text = "um dois-dos dois";
    const m = text.match(/\bdois\b/g) || [];
    let output = "Borda de palavra (\\b):\n\n";
    output += "texto: " + text + "\n";
    output += "match(/\\bdois\\b/g) -> [" + m.join(", ") + "]";
    showResult('result3', output);
}

function regexpMeta_demo4() {
    const text = "Versão 1.2.3 e 1x2x3";
    const dots = text.match(/\d\.\d\.\d/g) || [];
    let output = "Escapando metacaracteres (\\.):\n\n";
    output += "texto: " + text + "\n";
    output += "match(/\\d\\.\\d\\.\\d/g) -> [" + dots.join(", ") + "]";
    showResult('result4', output);
}

// ============================================
// ASSERTIONS DEMOS
// ============================================

function regexpAssertions_demo1() {
    const text = "abc";
    let output = "Âncoras ^ e $:\n\n";
    output += "texto: " + text + "\n";
    output += "/^abc$/.test -> " + (/^abc$/.test(text)) + "\n";
    output += "/^ab/.test -> " + (/^ab/.test(text)) + "\n";
    output += "/bc$/.test -> " + (/bc$/.test(text));
    showResult('result1', output);
}

function regexpAssertions_demo2() {
    const text = "a1\nb2\nc3";
    const noM = text.match(/^\w\d/g) || [];
    const withM = text.match(/^\w\d/gm) || [];
    let output = "Multiline com ^:\n\n";
    output += "texto:\n" + text + "\n\n";
    output += "match(/^\\w\\d/g) -> " + JSON.stringify(noM) + "\n";
    output += "match(/^\\w\\d/gm) -> " + JSON.stringify(withM);
    showResult('result2', output);
}

function regexpAssertions_demo3() {
    const text = "R$10 R$20kg R$30kg";
    const m = text.match(/R\$(\d+)(?=kg)/g) || [];
    let output = "Lookahead positivo (?=):\n\n";
    output += "texto: " + text + "\n";
    output += "match(/R\\$(\\d+)(?=kg)/g) -> [" + m.join(", ") + "]";
    showResult('result3', output);
}

function regexpAssertions_demo4() {
    const text = "cat car can cap";
    const m = text.match(/ca(?!t)\w/g) || [];
    let output = "Lookahead negativo (?!):\n\n";
    output += "texto: " + text + "\n";
    output += "match(/ca(?!t)\\w/g) -> [" + m.join(", ") + "]";
    showResult('result4', output);
}

// ============================================
// QUANTIFIERS DEMOS
// ============================================

function regexpQuant_demo1() {
    const text = "caaaat";
    const m = text.match(/a+/g) || [];
    let output = "+ (um ou mais):\n\n";
    output += "texto: " + text + "\n";
    output += "match(/a+/g) -> [" + m.join(", ") + "]";
    showResult('result1', output);
}

function regexpQuant_demo2() {
    const text = "color colour colouur";
    const m = text.match(/colou*r/g) || [];
    let output = "* (zero ou mais):\n\n";
    output += "texto: " + text + "\n";
    output += "match(/colou*r/g) -> [" + m.join(", ") + "]";
    showResult('result2', output);
}

function regexpQuant_demo3() {
    const text = "color colour";
    const m = text.match(/colou?r/g) || [];
    let output = "? (opcional):\n\n";
    output += "texto: " + text + "\n";
    output += "match(/colou?r/g) -> [" + m.join(", ") + "]";
    showResult('result3', output);
}

function regexpQuant_demo4() {
    const text = "111 22 3333 44444";
    const m = text.match(/\b\d{2,4}\b/g) || [];
    let output = "{n,m} (entre n e m):\n\n";
    output += "texto: " + text + "\n";
    output += "match(/\\b\\d{2,4}\\b/g) -> [" + m.join(", ") + "]";
    showResult('result4', output);
}

// ============================================
// PATTERNS DEMOS
// ============================================

function regexpPatterns_demo1() {
    const date = "2025-12-24";
    const re = /^\d{4}-\d{2}-\d{2}$/;
    let output = "Validar data simples (AAAA-MM-DD):\n\n";
    output += "data: " + date + "\n";
    output += "regex: " + re + "\n";
    output += "test -> " + re.test(date);
    showResult('result1', output);
}

function regexpPatterns_demo2() {
    const text = "foo bar baz";
    const m = text.match(/(foo|bar)/g) || [];
    let output = "Alternativas (foo|bar):\n\n";
    output += "texto: " + text + "\n";
    output += "match(/(foo|bar)/g) -> [" + m.join(", ") + "]";
    showResult('result2', output);
}

function regexpPatterns_demo3() {
    const text = "Tel: (11) 91234-5678";
    const re = /\((\d{2})\)\s?(\d{4,5})-(\d{4})/;
    const m = re.exec(text);
    let output = "Grupos capturados:\n\n";
    output += "texto: " + text + "\n\n";
    if (!m) {
        output += "Sem match";
    } else {
        output += "DDD: " + m[1] + "\n";
        output += "Prefixo: " + m[2] + "\n";
        output += "Sufixo: " + m[3];
    }
    showResult('result3', output);
}

function regexpPatterns_demo4() {
    const text = "ID: AB123, CD999, XX12";
    const m = text.match(/\b[A-Z]{2}\d{3}\b/g) || [];
    let output = "Combinação: letras + números:\n\n";
    output += "texto: " + text + "\n";
    output += "match(/\\b[A-Z]{2}\\d{3}\\b/g) -> [" + m.join(", ") + "]";
    showResult('result4', output);
}

// ============================================
// REGEXP OBJECTS DEMOS
// ============================================

function regexpObjects_demo1() {
    const re = /abc/gi;
    let output = "source e flags:\n\n";
    output += "regex: " + re + "\n";
    output += "source: " + re.source + "\n";
    output += "flags: " + re.flags;
    showResult('result1', output);
}

function regexpObjects_demo2() {
    const re = /\w+/g;
    const text = "um dois três";
    let output = "lastIndex com exec() e flag g:\n\n";
    output += "texto: " + text + "\n\n";
    let m;
    const found = [];
    while ((m = re.exec(text)) !== null) {
        found.push(m[0] + " (idx " + m.index + ")");
    }
    output += "encontrados: " + found.join(" | ") + "\n";
    output += "lastIndex final: " + re.lastIndex;
    showResult('result2', output);
}

function regexpObjects_demo3() {
    const re = /^abc/im;
    let output = "Propriedades booleanas:\n\n";
    output += "regex: " + re + "\n\n";
    output += "global: " + re.global + "\n";
    output += "ignoreCase: " + re.ignoreCase + "\n";
    output += "multiline: " + re.multiline;
    showResult('result3', output);
}

function regexpObjects_demo4() {
    const pattern = "\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}";
    const re = new RegExp(pattern);
    const text = "CPF: 123.456.789-00";
    let output = "Construindo com new RegExp():\n\n";
    output += "pattern string: " + pattern + "\n";
    output += "regex: " + re + "\n";
    output += "test em '" + text + "' -> " + re.test(text);
    showResult('result4', output);
}

// ============================================
// REGEXP METHODS DEMOS
// ============================================

function regexpMethods_demo1() {
    const text = "abc123";
    const re = /\d+/;
    let output = "test():\n\n";
    output += "texto: " + text + "\n";
    output += "regex: " + re + "\n";
    output += "test -> " + re.test(text);
    showResult('result1', output);
}

function regexpMethods_demo2() {
    const text = "x1 y22 z333";
    const re = /\d+/g;
    let output = "exec() em loop com /g:\n\n";
    let m;
    const hits = [];
    while ((m = re.exec(text)) !== null) {
        hits.push(m[0] + " (idx " + m.index + ")");
    }
    output += "texto: " + text + "\n";
    output += "hits: " + hits.join(" | ");
    showResult('result2', output);
}

function regexpMethods_demo3() {
    const text = "a1 a2 a3";
    const re = /a(\d)/g;
    let output = "match() vs matchAll():\n\n";
    output += "texto: " + text + "\n";
    output += "match -> " + JSON.stringify(text.match(re)) + "\n";
    if (typeof text.matchAll === 'function') {
        const all = Array.from(text.matchAll(re)).map(m => ({ full: m[0], group1: m[1], index: m.index }));
        output += "matchAll -> " + JSON.stringify(all, null, 2);
    } else {
        output += "matchAll não suportado neste ambiente.";
    }
    showResult('result3', output);
}

function regexpMethods_demo4() {
    const text = "2025-12-24";
    const replaced = text.replace(/(\d{4})-(\d{2})-(\d{2})/, "$3/$2/$1");
    let output = "replace() com grupos ($1..$n):\n\n";
    output += "original: " + text + "\n";
    output += "novo: " + replaced;
    showResult('result4', output);
}

// ========================================
// DATA TYPES DEMOS
// ========================================
function datatypes_demo1() {
    const name = "João";
    const age = 28;
    const isStudent = true;

    let output = "Tipos básicos:\n\n";
    output += "name = \"" + name + "\" (typeof: " + typeof name + ")\n";
    output += "age = " + age + " (typeof: " + typeof age + ")\n";
    output += "isStudent = " + isStudent + " (typeof: " + typeof isStudent + ")\n";
    showResult('result1', output);
}

function datatypes_demo2() {
    const arr = ["a", "b", "c"];
    const obj = { a: 1, b: 2 };

    let output = "Array vs Object:\n\n";
    output += "arr = " + JSON.stringify(arr) + "\n";
    output += "typeof arr -> " + typeof arr + "\n";
    output += "Array.isArray(arr) -> " + Array.isArray(arr) + "\n\n";
    output += "obj = " + JSON.stringify(obj) + "\n";
    output += "typeof obj -> " + typeof obj + "\n";
    output += "Array.isArray(obj) -> " + Array.isArray(obj);
    showResult('result2', output);
}

function datatypes_demo3() {
    let notDefined;
    const empty = null;

    let output = "null vs undefined:\n\n";
    output += "notDefined = " + notDefined + " (typeof: " + typeof notDefined + ")\n";
    output += "empty = " + empty + " (typeof: " + typeof empty + ")\n\n";
    output += "notDefined === undefined -> " + (notDefined === undefined) + "\n";
    output += "empty === null -> " + (empty === null) + "\n";
    output += "empty == undefined -> " + (empty == undefined) + "\n";
    output += "empty === undefined -> " + (empty === undefined);
    showResult('result3', output);
}

function datatypes_demo4() {
    const big = 9007199254740993n;
    const sym = Symbol('id');

    let output = "bigint e symbol (visão geral):\n\n";
    output += "big = " + big + " (typeof: " + typeof big + ")\n";
    output += "sym = Symbol('id') (typeof: " + typeof sym + ")\n\n";
    output += "Observação: BigInt não mistura com Number sem conversão.";
    showResult('result4', output);
}

// ========================================
// TYPEOF DEMOS
// ========================================
function typeof_demo1() {
    const values = [
        "texto",
        42,
        3.14,
        true,
        undefined
    ];

    let output = "typeof em valores comuns:\n\n";
    values.forEach((v, idx) => {
        output += "v" + idx + " = " + String(v) + " -> typeof: " + typeof v + "\n";
    });
    showResult('result1', output);
}

function typeof_demo2() {
    const n = null;
    const arr = [1, 2, 3];

    let output = "typeof null e arrays:\n\n";
    output += "null -> typeof: " + typeof n + " (pegadinha clássica)\n";
    output += "[1,2,3] -> typeof: " + typeof arr + "\n";
    output += "Array.isArray([1,2,3]) -> " + Array.isArray(arr);
    showResult('result2', output);
}

function typeof_demo3() {
    function sum(a, b) { return a + b; }
    const user = { name: "Ana" };

    let output = "funções e objetos:\n\n";
    output += "sum -> typeof: " + typeof sum + "\n";
    output += "user -> typeof: " + typeof user + "\n";
    output += "user.name -> typeof: " + typeof user.name;
    showResult('result3', output);
}

function typeof_demo4() {
    const value1 = ["x", "y"];
    const value2 = null;

    let output = "checagens úteis:\n\n";
    output += "value1 = [\"x\", \"y\"]\n";
    output += "typeof value1 -> " + typeof value1 + "\n";
    output += "Array.isArray(value1) -> " + Array.isArray(value1) + "\n\n";
    output += "value2 = null\n";
    output += "typeof value2 -> " + typeof value2 + "\n";
    output += "value2 === null -> " + (value2 === null);
    showResult('result4', output);
}

// ========================================
// TOSTRING DEMOS
// ========================================
function tostring_demo1() {
    const n = 255;
    let output = "Number.toString() (bases):\n\n";
    output += "n = " + n + "\n";
    output += "n.toString() -> " + n.toString() + "\n";
    output += "n.toString(2) -> " + n.toString(2) + " (bin)\n";
    output += "n.toString(16) -> " + n.toString(16) + " (hex)";
    showResult('result1', output);
}

function tostring_demo2() {
    const arr = ["maçã", "banana", "uva"];
    let output = "Array.toString() vs join():\n\n";
    output += "arr = " + JSON.stringify(arr) + "\n";
    output += "arr.toString() -> " + arr.toString() + "\n";
    output += "arr.join(' | ') -> " + arr.join(' | ');
    showResult('result2', output);
}

function tostring_demo3() {
    const d = new Date("2025-12-24T10:30:00Z");
    let output = "Date.toString() e ISO:\n\n";
    output += "d.toString() -> " + d.toString() + "\n";
    output += "d.toISOString() -> " + d.toISOString();
    showResult('result3', output);
}

function tostring_demo4() {
    const cases = [
        "abc",
        123,
        true,
        null,
        undefined,
        [1, 2],
        { a: 1 },
        function () { }
    ];

    let output = "Object.prototype.toString.call():\n\n";
    cases.forEach(v => {
        output += String(Object.prototype.toString.call(v)) + "\n";
    });
    showResult('result4', output);
}

// ========================================
// TYPE CONVERSION DEMOS
// ========================================
function typeConversion_demo1() {
    const a = "10";
    const b = "10.5";
    const c = 99;

    let output = "Number() e String():\n\n";
    output += "Number(\"10\") -> " + Number(a) + "\n";
    output += "Number(\"10.5\") -> " + Number(b) + "\n";
    output += "String(99) -> \"" + String(c) + "\"\n";
    output += "(99).toString() -> \"" + (c).toString() + "\"";
    showResult('result1', output);
}

function typeConversion_demo2() {
    const values = [0, 1, "", "0", "false", null, undefined, [], {}, NaN];
    let output = "Boolean() e truthy/falsy:\n\n";
    values.forEach(v => {
        output += String(v) + " -> Boolean: " + Boolean(v) + "\n";
    });
    showResult('result2', output);
}

function typeConversion_demo3() {
    const x = "10px";
    const y = "08";
    const z = "3.14";

    let output = "parseInt/parseFloat e armadilhas:\n\n";
    output += "parseInt(\"10px\") -> " + parseInt(x, 10) + "\n";
    output += "parseInt(\"08\", 10) -> " + parseInt(y, 10) + "\n";
    output += "parseFloat(\"3.14\") -> " + parseFloat(z) + "\n";
    output += "Number(\"10px\") -> " + Number(x);
    showResult('result3', output);
}

function typeConversion_demo4() {
    let output = "coerção implícita (com cuidado):\n\n";
    output += "'5' + 2 -> " + ('5' + 2) + " (concatena)\n";
    output += "'5' - 2 -> " + ('5' - 2) + " (vira number)\n";
    output += "'5' * '2' -> " + ('5' * '2') + "\n";
    output += "[] + {} -> " + ([] + {}) + "\n";
    output += "{} + [] -> (depende do contexto; evite)";
    showResult('result4', output);
}

// ========================================
// ERRORS (INTRO) DEMOS
// ========================================
function errors_demo1() {
    let output = "try/catch básico:\n\n";

    try {
        // Variável inexistente (gera ReferenceError)
        // eslint-disable-next-line no-undef
        const x = naoExiste + 1;
        output += "Resultado: " + x;
    } catch (err) {
        output += "Capturado: " + err.name + "\n";
        output += "Mensagem: " + err.message;
    }

    showResult('result1', output);
}

function errors_demo2() {
    let output = "throw (lançando um erro manualmente):\n\n";

    try {
        const idade = -2;
        if (idade < 0) {
            throw new RangeError("Idade não pode ser negativa");
        }
        output += "Idade OK: " + idade;
    } catch (err) {
        output += "Capturado: " + err.name + "\n";
        output += "Mensagem: " + err.message;
    }

    showResult('result2', output);
}

function errors_demo3() {
    let output = "TypeError comum (chamar método que não existe):\n\n";

    try {
        const n = 10;
        // toUpperCase não existe em number
        // @ts-ignore
        const v = n.toUpperCase();
        output += String(v);
    } catch (err) {
        output += "Capturado: " + err.name + "\n";
        output += "Mensagem: " + err.message;
    }

    showResult('result3', output);
}

function errors_demo4() {
    const input = "";
    let output = "Mensagem amigável para o usuário:\n\n";

    try {
        if (!input) {
            throw new Error("Campo obrigatório vazio");
        }
        output += "OK";
    } catch (err) {
        output += "Ops! Algo deu errado. Verifique o valor informado e tente novamente.";
    }

    showResult('result4', output);
}

// ========================================
// SILENT ERRORS DEMOS
// ========================================
function errorsSilent_demo1() {
    let output = "Variável sem declaração (modo não-strict):\n\n";

    // Em scripts não-modulares, sem "use strict", isso cria (ou sobrescreve) uma global.
    try {
        // Limpar se já existir
        if (typeof window !== 'undefined') {
            // @ts-ignore
            delete window.semDeclarar;
        }

        // eslint-disable-next-line no-undef
        semDeclarar = 123;

        output += "Atribuí sem declarar: semDeclarar = 123\n";
        output += "typeof semDeclarar -> " + typeof semDeclarar + "\n";
        // @ts-ignore
        output += "window.semDeclarar -> " + (typeof window !== 'undefined' ? window.semDeclarar : '(sem window)') + "\n\n";
        output += "Isso é perigoso: pode poluir o escopo global.";
    } catch (err) {
        output += "Neste ambiente, isso falhou: " + err.name + " - " + err.message;
    }

    showResult('result1', output);
}

function errorsSilent_demo2() {
    let output = "\"use strict\" transformando em erro:\n\n";

    try {
        (function () {
            'use strict';
            // Em strict mode, atribuir sem declarar vira ReferenceError
            // eslint-disable-next-line no-undef
            strictVar = 1;
        })();
        output += "Não deveria chegar aqui.";
    } catch (err) {
        output += "Capturado: " + err.name + "\n";
        output += "Mensagem: " + err.message + "\n\n";
        output += "Dica: use strict mode + let/const para evitar globais acidentais.";
    }

    showResult('result2', output);
}

function errorsSilent_demo3() {
    let output = "Tentativa de escrever em propriedade read-only:\n\n";

    const obj = {};
    Object.defineProperty(obj, 'id', {
        value: 10,
        writable: false,
        enumerable: true
    });

    output += "obj.id (antes) -> " + obj.id + "\n";
    obj.id = 99; // em modo não-strict, falha silenciosamente
    output += "obj.id (depois, não-strict) -> " + obj.id + " (não mudou)\n\n";

    try {
        (function () {
            'use strict';
            obj.id = 123; // em strict mode, deve lançar TypeError
        })();
        output += "(strict) não lançou (pode variar por ambiente)\n";
    } catch (err) {
        output += "(strict) capturado: " + err.name + "\n";
    }

    showResult('result3', output);
}

function errorsSilent_demo4() {
    let output = "Octal / parsing confuso (exemplo didático):\n\n";

    const s1 = "010";
    const s2 = "08";

    output += "parseInt('010') -> " + parseInt(s1) + "\n";
    output += "parseInt('010', 10) -> " + parseInt(s1, 10) + "\n\n";
    output += "parseInt('08') -> " + parseInt(s2) + "\n";
    output += "parseInt('08', 10) -> " + parseInt(s2, 10) + "\n\n";
    output += "Dica: sempre informe a base (radix) no parseInt.";

    showResult('result4', output);
}

// ========================================
// ERROR STATEMENTS DEMOS
// ========================================
function errorStatements_demo1() {
    let output = "try/catch com ReferenceError:\n\n";

    try {
        // eslint-disable-next-line no-undef
        const x = variavelInexistente + 1;
        output += "x -> " + x;
    } catch (err) {
        output += "Capturado: " + err.name + "\n";
        output += "Mensagem: " + err.message;
    }

    showResult('result1', output);
}

function errorStatements_demo2() {
    let output = "throw com validação de entrada:\n\n";
    const valor = "";

    try {
        if (valor === "") {
            throw "Valor vazio";
        }
        output += "OK";
    } catch (err) {
        output += "Erro: " + String(err);
    }

    showResult('result2', output);
}

function errorStatements_demo3() {
    let output = "finally sempre executa:\n\n";

    try {
        output += "Entrou no try\n";
        JSON.parse("{quebrado}");
        output += "(essa linha não roda)\n";
    } catch (err) {
        output += "Entrou no catch: " + err.name + "\n";
    } finally {
        output += "Entrou no finally: sempre executa";
    }

    showResult('result3', output);
}

function errorStatements_demo4() {
    let output = "Tratando erros por tipo (instanceof):\n\n";

    function doWork(kind) {
        if (kind === 'type') throw new TypeError('Tipo inválido');
        if (kind === 'range') throw new RangeError('Fora do intervalo');
        throw new Error('Erro genérico');
    }

    ['type', 'range', 'generic'].forEach(kind => {
        try {
            doWork(kind);
        } catch (err) {
            if (err instanceof TypeError) {
                output += kind + " -> TypeError: " + err.message + "\n";
            } else if (err instanceof RangeError) {
                output += kind + " -> RangeError: " + err.message + "\n";
            } else {
                output += kind + " -> Error: " + err.message + "\n";
            }
        }
    });

    showResult('result4', output);
}

// ========================================
// ERROR OBJECT DEMOS
// ========================================
function errorObject_demo1() {
    let output = "Error: name/message/stack:\n\n";
    const err = new Error("Algo deu errado");
    output += "name: " + err.name + "\n";
    output += "message: " + err.message + "\n";
    output += "stack existe? " + Boolean(err.stack);
    showResult('result1', output);
}

function errorObject_demo2() {
    let output = "TypeError comum:\n\n";

    try {
        const n = 10;
        output += "n = 10\n";
        output += "Tentando n.toUpperCase()...\n\n";

        // toUpperCase não existe em number
        // @ts-ignore
        n.toUpperCase();
    } catch (err) {
        output += "Capturado: " + err.name + "\n";
        output += "Mensagem: " + err.message;
    }

    showResult('result2', output);
}

function errorObject_demo3() {
    let output = "RangeError (exemplo com toFixed):\n\n";

    try {
        const n = 1.2345;
        output += "n = " + n + "\n";
        // toFixed aceita geralmente de 0 a 100
        output += "n.toFixed(200) -> " + n.toFixed(200);
    } catch (err) {
        output += "Capturado: " + err.name + "\n";
        output += "Mensagem: " + err.message;
    }

    showResult('result3', output);
}

function errorObject_demo4() {
    let output = "Lendo name/message e stack (quando disponível):\n\n";

    try {
        JSON.parse("{quebrado}");
    } catch (err) {
        output += "name: " + err.name + "\n";
        output += "message: " + err.message + "\n\n";
        output += "stack existe? " + Boolean(err.stack) + "\n";
        if (err.stack) {
            const firstLines = String(err.stack).split('\n').slice(0, 3).join('\n');
            output += "\nstack (primeiras linhas):\n" + firstLines;
        }
    }

    showResult('result4', output);
}

// ========================================
// DEBUGGING DEMOS
// ========================================
function debugging_demo1() {
    let output = "console.log (visualize o fluxo):\n\n";
    const values = [1, 2, 3];
    output += "values = " + JSON.stringify(values) + "\n";
    output += "Abra o DevTools (F12) e veja logs no Console.";
    console.log("[debugging_demo1] values:", values);
    showResult('result1', output);
}

function debugging_demo2() {
    let output = "console.table (útil para tabelas):\n\n";
    const users = [
        { id: 1, nome: "Ana" },
        { id: 2, nome: "Bruno" },
        { id: 3, nome: "Carla" }
    ];
    output += "Abra o DevTools e veja console.table(users).";
    console.table(users);
    showResult('result2', output);
}

function debugging_demo3() {
    let output = "Encontrando NaN e valores inválidos:\n\n";
    const input = "12a";
    const parsed = Number(input);
    output += "input = '12a'\n";
    output += "Number(input) -> " + parsed + "\n";
    output += "Number.isNaN(parsed) -> " + Number.isNaN(parsed) + "\n\n";
    output += "Dica: valide com Number.isNaN antes de usar.";
    showResult('result3', output);
}

function debugging_demo4() {
    let output = "Usando a palavra-chave debugger:\n\n";
    output += "Quando você tiver o DevTools aberto, a linha 'debugger;' pausa a execução.";
    output += "\n\nDica: use breakpoints quando possível.";

    // Se o DevTools estiver aberto, isso pausa a execução
    // debugger;

    showResult('result4', output);
}

// ============================================================================
// EVENTS (Basic) - Funções de demonstração
// ============================================================================

function _events_getState() {
    if (typeof globalThis === 'undefined') {
        return {};
    }
    if (!globalThis.__jsTutorialEventsState) {
        globalThis.__jsTutorialEventsState = {};
    }
    return globalThis.__jsTutorialEventsState;
}

function _events_isBrowser() {
    return typeof document !== 'undefined' && typeof window !== 'undefined';
}

function events_demo1() {
    if (!_events_isBrowser()) {
        return 'Demo disponível apenas no navegador.';
    }

    const state = _events_getState();
    if (state.events_demo1_armed) {
        showResult('result1', 'Já está armado. Clique em qualquer lugar da página para capturar o próximo clique.');
        return;
    }
    state.events_demo1_armed = true;

    showResult('result1', 'Clique em qualquer lugar da página (captura apenas 1 vez).');

    const handler = (e) => {
        state.events_demo1_armed = false;
        const target = e && e.target ? e.target : null;
        const tag = target && target.tagName ? target.tagName.toLowerCase() : '(desconhecido)';
        const id = target && target.id ? '#' + target.id : '';
        const cls = target && target.className ? '.' + String(target.className).trim().split(/\s+/).slice(0, 2).join('.') : '';
        showResult('result1', `Evento: ${e.type}\nTarget: ${tag}${id}${cls}\nHorário: ${new Date().toLocaleTimeString()}`);
        document.removeEventListener('click', handler);
    };

    document.addEventListener('click', handler, { once: true });

    setTimeout(() => {
        if (state.events_demo1_armed) {
            state.events_demo1_armed = false;
            try {
                document.removeEventListener('click', handler);
            } catch (err) {
                // ignore
            }
            showResult('result1', 'Tempo esgotado (10s). Rode a demo de novo para armar.');
        }
    }, 10000);
}

function events_demo2() {
    if (!_events_isBrowser()) {
        return 'Demo disponível apenas no navegador.';
    }

    showResult('result2', 'Clique em algum elemento da página para ver event.type e event.target.');

    const handler = (e) => {
        const target = e && e.target ? e.target : null;
        const currentTarget = e && e.currentTarget ? e.currentTarget : null;
        const text = [
            `type: ${e.type}`,
            `target: ${target && target.tagName ? target.tagName.toLowerCase() : '(n/a)'}`,
            `target.id: ${target && target.id ? target.id : '(vazio)'}`,
            `currentTarget: ${currentTarget && currentTarget.tagName ? currentTarget.tagName.toLowerCase() : '(document)'}`
        ].join('\n');
        showResult('result2', text);
    };

    document.addEventListener('click', handler, { once: true });
}

function events_demo3() {
    if (!_events_isBrowser()) {
        return 'Demo disponível apenas no navegador.';
    }

    const state = _events_getState();
    const resultDiv = document.getElementById('result3');
    if (!resultDiv) {
        return;
    }

    const parent = resultDiv.parentElement;
    if (!parent) {
        return;
    }

    let container = document.getElementById('stopPropContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'stopPropContainer';
        container.className = 'mt-4';

        const outer = document.createElement('div');
        outer.id = 'stopPropOuter';
        outer.className = 'p-4 rounded border border-dashed border-gray-300 bg-gray-50';
        outer.textContent = 'Caixa EXTERNA (clique aqui)';

        const inner = document.createElement('div');
        inner.id = 'stopPropInner';
        inner.className = 'mt-3 p-4 rounded border border-gray-300 bg-white';
        inner.textContent = 'Caixa INTERNA (clique aqui - usa stopPropagation)';

        outer.appendChild(inner);
        container.appendChild(outer);
        parent.insertBefore(container, resultDiv);
    }

    const outerEl = document.getElementById('stopPropOuter');
    const innerEl = document.getElementById('stopPropInner');
    if (!outerEl || !innerEl) {
        return;
    }

    const log = [];
    const push = (msg) => {
        log.push(msg);
        showResult('result3', log.join('\n'));
    };

    // Limpa listeners anteriores (se existirem)
    if (state.events_demo3_cleanup) {
        state.events_demo3_cleanup();
        state.events_demo3_cleanup = null;
    }

    push('Ativo por 10s. Clique na caixa externa e na interna.');

    const onOuter = () => push('Outer click');
    const onInner = (e) => {
        push('Inner click -> stopPropagation()');
        e.stopPropagation();
    };
    const onDoc = () => push('Document click');

    outerEl.addEventListener('click', onOuter);
    innerEl.addEventListener('click', onInner);
    document.addEventListener('click', onDoc);

    const cleanup = () => {
        try {
            outerEl.removeEventListener('click', onOuter);
            innerEl.removeEventListener('click', onInner);
            document.removeEventListener('click', onDoc);
        } catch (err) {
            // ignore
        }
    };

    state.events_demo3_cleanup = cleanup;

    setTimeout(() => {
        if (state.events_demo3_cleanup === cleanup) {
            cleanup();
            state.events_demo3_cleanup = null;
            push('Encerrado. Rode a demo novamente para reativar.');
        }
    }, 10000);
}

function events_demo4() {
    if (!_events_isBrowser()) {
        return 'Demo disponível apenas no navegador.';
    }

    const state = _events_getState();
    if (state.events_demo4_cleanup) {
        state.events_demo4_cleanup();
        state.events_demo4_cleanup = null;
    }

    let count = 0;
    showResult('result4', 'Clique em qualquer lugar da página. Após 3 cliques, o listener será removido.');

    const handler = () => {
        count++;
        if (count >= 3) {
            document.removeEventListener('click', handler);
            state.events_demo4_cleanup = null;
            showResult('result4', `Cliques capturados: ${count}\nListener removido com removeEventListener().`);
            return;
        }
        showResult('result4', `Cliques capturados: ${count}\n(mais ${3 - count} para remover)`);
    };

    document.addEventListener('click', handler);
    state.events_demo4_cleanup = () => {
        try {
            document.removeEventListener('click', handler);
        } catch (err) {
            // ignore
        }
    };

    setTimeout(() => {
        if (state.events_demo4_cleanup) {
            state.events_demo4_cleanup();
            state.events_demo4_cleanup = null;
            showResult('result4', 'Encerrado (10s). Rode a demo novamente para reativar.');
        }
    }, 10000);
}

function eventsMouse_demo1() {
    if (!_events_isBrowser()) {
        return 'Demo disponível apenas no navegador.';
    }

    const area = document.getElementById('mouseArea1');
    if (!area) {
        showResult('result1', 'Elemento #mouseArea1 não encontrado.');
        return;
    }

    const state = _events_getState();
    if (state.eventsMouse_demo1_cleanup) {
        state.eventsMouse_demo1_cleanup();
        state.eventsMouse_demo1_cleanup = null;
    }

    let clicks = 0;
    let dblClicks = 0;
    const update = () => showResult('result1', `click: ${clicks}\ndblclick: ${dblClicks}`);

    const onClick = () => {
        clicks++;
        update();
    };
    const onDbl = () => {
        dblClicks++;
        update();
    };

    area.addEventListener('click', onClick);
    area.addEventListener('dblclick', onDbl);
    showResult('result1', 'Listeners ativos por 10s. Clique e dê duplo clique na área.');

    const cleanup = () => {
        try {
            area.removeEventListener('click', onClick);
            area.removeEventListener('dblclick', onDbl);
        } catch (err) {
            // ignore
        }
    };
    state.eventsMouse_demo1_cleanup = cleanup;

    setTimeout(() => {
        if (state.eventsMouse_demo1_cleanup === cleanup) {
            cleanup();
            state.eventsMouse_demo1_cleanup = null;
        }
    }, 10000);
}

function eventsMouse_demo2() {
    if (!_events_isBrowser()) {
        return 'Demo disponível apenas no navegador.';
    }

    const area = document.getElementById('mouseArea2');
    if (!area) {
        showResult('result2', 'Elemento #mouseArea2 não encontrado.');
        return;
    }

    const state = _events_getState();
    if (state.eventsMouse_demo2_cleanup) {
        state.eventsMouse_demo2_cleanup();
        state.eventsMouse_demo2_cleanup = null;
    }

    const onEnter = () => showResult('result2', 'mouseenter: o mouse entrou na área');
    const onLeave = () => showResult('result2', 'mouseleave: o mouse saiu da área');

    area.addEventListener('mouseenter', onEnter);
    area.addEventListener('mouseleave', onLeave);
    showResult('result2', 'Ativo por 10s. Passe o mouse sobre a área.');

    const cleanup = () => {
        try {
            area.removeEventListener('mouseenter', onEnter);
            area.removeEventListener('mouseleave', onLeave);
        } catch (err) {
            // ignore
        }
    };
    state.eventsMouse_demo2_cleanup = cleanup;

    setTimeout(() => {
        if (state.eventsMouse_demo2_cleanup === cleanup) {
            cleanup();
            state.eventsMouse_demo2_cleanup = null;
        }
    }, 10000);
}

function eventsMouse_demo3() {
    if (!_events_isBrowser()) {
        return 'Demo disponível apenas no navegador.';
    }

    const area = document.getElementById('mouseArea3');
    if (!area) {
        showResult('result3', 'Elemento #mouseArea3 não encontrado.');
        return;
    }

    const state = _events_getState();
    if (state.eventsMouse_demo3_cleanup) {
        state.eventsMouse_demo3_cleanup();
        state.eventsMouse_demo3_cleanup = null;
    }

    let last = null;
    let moves = 0;
    let ticking = false;

    const onMove = (e) => {
        last = e;
        moves++;
        if (ticking) return;
        ticking = true;
        setTimeout(() => {
            ticking = false;
            if (!last) return;
            const rect = area.getBoundingClientRect();
            const x = Math.round(last.clientX - rect.left);
            const y = Math.round(last.clientY - rect.top);
            showResult('result3', `mousemove capturado por 3s\nmovimentos: ${moves}\nx: ${x}, y: ${y}`);
        }, 120);
    };

    area.addEventListener('mousemove', onMove);
    showResult('result3', 'Mova o mouse na área (captura por 3 segundos).');

    const cleanup = () => {
        try {
            area.removeEventListener('mousemove', onMove);
        } catch (err) {
            // ignore
        }
    };
    state.eventsMouse_demo3_cleanup = cleanup;

    setTimeout(() => {
        if (state.eventsMouse_demo3_cleanup === cleanup) {
            cleanup();
            state.eventsMouse_demo3_cleanup = null;
            showResult('result3', `Encerrado. Total de movimentos: ${moves}`);
        }
    }, 3000);
}

function eventsMouse_demo4() {
    if (!_events_isBrowser()) {
        return 'Demo disponível apenas no navegador.';
    }

    const area = document.getElementById('mouseArea4');
    if (!area) {
        showResult('result4', 'Elemento #mouseArea4 não encontrado.');
        return;
    }

    const state = _events_getState();
    if (state.eventsMouse_demo4_cleanup) {
        state.eventsMouse_demo4_cleanup();
        state.eventsMouse_demo4_cleanup = null;
    }

    const onCtx = (e) => {
        e.preventDefault();
        showResult('result4', `contextmenu bloqueado com preventDefault()\nHorário: ${new Date().toLocaleTimeString()}`);
    };

    area.addEventListener('contextmenu', onCtx);
    showResult('result4', 'Ativo por 10s. Clique com o botão direito na área.');

    const cleanup = () => {
        try {
            area.removeEventListener('contextmenu', onCtx);
        } catch (err) {
            // ignore
        }
    };
    state.eventsMouse_demo4_cleanup = cleanup;

    setTimeout(() => {
        if (state.eventsMouse_demo4_cleanup === cleanup) {
            cleanup();
            state.eventsMouse_demo4_cleanup = null;
        }
    }, 10000);
}

function eventsKeyboard_demo1() {
    if (!_events_isBrowser()) {
        return 'Demo disponível apenas no navegador.';
    }

    showResult('result1', 'Pressione qualquer tecla (captura apenas 1 vez, por até 10s).');

    const handler = (e) => {
        showResult('result1', `type: ${e.type}\nkey: ${e.key}\ncode: ${e.code}\nctrl: ${!!e.ctrlKey}  alt: ${!!e.altKey}  shift: ${!!e.shiftKey}`);
    };

    window.addEventListener('keydown', handler, { once: true });

    setTimeout(() => {
        try {
            window.removeEventListener('keydown', handler);
        } catch (err) {
            // ignore
        }
    }, 10000);
}

function eventsKeyboard_demo2() {
    if (!_events_isBrowser()) {
        return 'Demo disponível apenas no navegador.';
    }

    const state = _events_getState();
    if (state.eventsKeyboard_demo2_cleanup) {
        state.eventsKeyboard_demo2_cleanup();
        state.eventsKeyboard_demo2_cleanup = null;
    }

    showResult('result2', 'Ativo por 10s. Teste atalhos: Ctrl+K, Ctrl+S, Alt+Enter, Shift+?');

    const handler = (e) => {
        const key = String(e.key || '').toLowerCase();
        const combo = [
            e.ctrlKey ? 'Ctrl' : null,
            e.altKey ? 'Alt' : null,
            e.shiftKey ? 'Shift' : null,
            key
        ].filter(Boolean).join('+');

        if ((e.ctrlKey && key === 'k') || (e.ctrlKey && key === 's') || (e.altKey && key === 'enter') || (e.shiftKey && key === '?')) {
            e.preventDefault();
            showResult('result2', `Atalho detectado: ${combo}\npreventDefault() chamado.`);
        }
    };

    window.addEventListener('keydown', handler);

    const cleanup = () => {
        try {
            window.removeEventListener('keydown', handler);
        } catch (err) {
            // ignore
        }
    };
    state.eventsKeyboard_demo2_cleanup = cleanup;

    setTimeout(() => {
        if (state.eventsKeyboard_demo2_cleanup === cleanup) {
            cleanup();
            state.eventsKeyboard_demo2_cleanup = null;
            showResult('result2', 'Encerrado (10s).');
        }
    }, 10000);
}

function eventsKeyboard_demo3() {
    if (!_events_isBrowser()) {
        return 'Demo disponível apenas no navegador.';
    }

    const input = document.getElementById('keyboardInput');
    if (!input) {
        showResult('result3', 'Elemento #keyboardInput não encontrado.');
        return;
    }

    const state = _events_getState();
    if (state.eventsKeyboard_demo3_cleanup) {
        state.eventsKeyboard_demo3_cleanup();
        state.eventsKeyboard_demo3_cleanup = null;
    }

    showResult('result3', 'Ativo por 5s. Digite no campo para capturar keyup.');

    const handler = (e) => {
        showResult('result3', `keyup: ${e.key}\nvalor: ${input.value}`);
    };

    input.addEventListener('keyup', handler);
    input.focus();

    const cleanup = () => {
        try {
            input.removeEventListener('keyup', handler);
        } catch (err) {
            // ignore
        }
    };
    state.eventsKeyboard_demo3_cleanup = cleanup;

    setTimeout(() => {
        if (state.eventsKeyboard_demo3_cleanup === cleanup) {
            cleanup();
            state.eventsKeyboard_demo3_cleanup = null;
            showResult('result3', 'Encerrado (5s).');
        }
    }, 5000);
}

function eventsKeyboard_demo4() {
    if (!_events_isBrowser()) {
        return 'Demo disponível apenas no navegador.';
    }

    const input = document.getElementById('keyboardInput2');
    if (!input) {
        showResult('result4', 'Elemento #keyboardInput2 não encontrado.');
        return;
    }

    const state = _events_getState();
    if (state.eventsKeyboard_demo4_cleanup) {
        state.eventsKeyboard_demo4_cleanup();
        state.eventsKeyboard_demo4_cleanup = null;
    }

    showResult('result4', 'Ativo por 5s. Pressione Enter no campo (será bloqueado).');

    const handler = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            showResult('result4', 'Enter bloqueado com preventDefault().');
        }
    };

    input.addEventListener('keydown', handler);
    input.focus();

    const cleanup = () => {
        try {
            input.removeEventListener('keydown', handler);
        } catch (err) {
            // ignore
        }
    };
    state.eventsKeyboard_demo4_cleanup = cleanup;

    setTimeout(() => {
        if (state.eventsKeyboard_demo4_cleanup === cleanup) {
            cleanup();
            state.eventsKeyboard_demo4_cleanup = null;
            showResult('result4', 'Encerrado (5s).');
        }
    }, 5000);
}

function eventsLoad_demo1() {
    if (!_events_isBrowser()) {
        return 'Demo disponível apenas no navegador.';
    }

    const lines = [];
    lines.push('DOMContentLoaded: dispara quando o DOM está pronto (HTML parseado).');
    lines.push('load: dispara quando a página e recursos (imagens/CSS) terminaram de carregar.');
    lines.push('');
    lines.push(`document.readyState: ${document.readyState}`);
    lines.push('Obs: ao clicar nesse botão, a página já carregou; aqui é só explicação.');
    showResult('result1', lines.join('\n'));
}

function eventsLoad_demo2() {
    if (!_events_isBrowser()) {
        return 'Demo disponível apenas no navegador.';
    }

    showResult('result2', 'Criando uma imagem via JS e aguardando o evento load...');
    const img = new Image();
    img.onload = () => {
        showResult('result2', 'Evento load disparou: imagem carregada com sucesso.');
    };
    img.onerror = () => {
        showResult('result2', 'Erro inesperado ao carregar imagem (onerror).');
    };
    img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
}

function eventsLoad_demo3() {
    if (!_events_isBrowser()) {
        return 'Demo disponível apenas no navegador.';
    }

    showResult('result3', 'Criando uma imagem com src inválido e aguardando o evento error...');
    const img = new Image();
    img.onload = () => {
        showResult('result3', 'Imagem carregou (inesperado).');
    };
    img.onerror = () => {
        showResult('result3', 'Evento error disparou: falha ao carregar a imagem.');
    };
    img.src = 'does-not-exist-image-' + Date.now() + '.png';
}

function eventsLoad_demo4() {
    if (!_events_isBrowser()) {
        return 'Demo disponível apenas no navegador.';
    }

    const state = _events_getState();
    if (state.eventsLoad_demo4_cleanup) {
        state.eventsLoad_demo4_cleanup();
        state.eventsLoad_demo4_cleanup = null;
    }

    showResult('result4', 'Ativo por 10s. Tente recarregar (F5) ou fechar a aba para ver o beforeunload.');

    const handler = (e) => {
        e.preventDefault();
        e.returnValue = '';
        return '';
    };

    window.addEventListener('beforeunload', handler);

    const cleanup = () => {
        try {
            window.removeEventListener('beforeunload', handler);
        } catch (err) {
            // ignore
        }
    };
    state.eventsLoad_demo4_cleanup = cleanup;

    setTimeout(() => {
        if (state.eventsLoad_demo4_cleanup === cleanup) {
            cleanup();
            state.eventsLoad_demo4_cleanup = null;
            showResult('result4', 'beforeunload removido (10s).');
        }
    }, 10000);
}

function eventsTiming_demo1() {
    if (!_events_isBrowser()) {
        return 'Demo disponível apenas no navegador.';
    }

    showResult('result1', 'Agendado: vai executar em 1 segundo (setTimeout).');
    setTimeout(() => {
        showResult('result1', `Executou! Horário: ${new Date().toLocaleTimeString()}`);
    }, 1000);
}

function eventsTiming_demo2() {
    if (!_events_isBrowser()) {
        return 'Demo disponível apenas no navegador.';
    }

    showResult('result2', 'Criando um setTimeout de 2s e cancelando em 500ms (clearTimeout).');
    const id = setTimeout(() => {
        showResult('result2', 'Timeout executou (não deveria).');
    }, 2000);

    setTimeout(() => {
        clearTimeout(id);
        showResult('result2', 'Timeout cancelado com clearTimeout(id).');
    }, 500);
}

function eventsTiming_demo3() {
    if (!_events_isBrowser()) {
        return 'Demo disponível apenas no navegador.';
    }

    const state = _events_getState();
    if (state.eventsTiming_intervalId) {
        clearInterval(state.eventsTiming_intervalId);
        state.eventsTiming_intervalId = null;
    }

    let count = 0;
    showResult('result3', 'Iniciando contador (setInterval) a cada 500ms...');

    const id = setInterval(() => {
        count++;
        showResult('result3', `contador: ${count}`);
        if (count >= 10) {
            clearInterval(id);
            if (state.eventsTiming_intervalId === id) {
                state.eventsTiming_intervalId = null;
            }
        }
    }, 500);

    state.eventsTiming_intervalId = id;
}

function eventsTiming_demo4() {
    if (!_events_isBrowser()) {
        return 'Demo disponível apenas no navegador.';
    }

    const state = _events_getState();
    if (!state.eventsTiming_intervalId) {
        showResult('result4', 'Nenhum setInterval ativo. Rode a Demo 3 primeiro.');
        return;
    }

    clearInterval(state.eventsTiming_intervalId);
    state.eventsTiming_intervalId = null;
    showResult('result4', 'Interval parado com clearInterval().');
}

function eventsMgmt_demo1() {
    if (!_events_isBrowser()) {
        return 'Demo disponível apenas no navegador.';
    }

    const state = _events_getState();
    if (state.eventsMgmt_demo1_handler) {
        showResult('result1', 'Handler já estava configurado (evitando duplicar). Clique na página para testar.');
        return;
    }

    let count = 0;
    const handler = () => {
        count++;
        showResult('result1', `Clique capturado pelo handler único: ${count}`);
    };

    state.eventsMgmt_demo1_handler = handler;
    document.addEventListener('click', handler);
    showResult('result1', 'Handler configurado 1 vez. Clique em qualquer lugar para ver o contador.');

    setTimeout(() => {
        if (state.eventsMgmt_demo1_handler === handler) {
            document.removeEventListener('click', handler);
            state.eventsMgmt_demo1_handler = null;
        }
    }, 10000);
}

function eventsMgmt_demo2() {
    if (!_events_isBrowser()) {
        return 'Demo disponível apenas no navegador.';
    }

    const grid = document.getElementById('delegateGrid');
    if (!grid) {
        showResult('result2', 'Elemento #delegateGrid não encontrado.');
        return;
    }

    const state = _events_getState();
    if (state.eventsMgmt_demo2_cleanup) {
        state.eventsMgmt_demo2_cleanup();
        state.eventsMgmt_demo2_cleanup = null;
    }

    showResult('result2', 'Delegação ativa por 10s. Clique em algum item.');

    const handler = (e) => {
        const btn = e.target && e.target.closest ? e.target.closest('button[data-item]') : null;
        if (!btn || !grid.contains(btn)) return;
        showResult('result2', `Clicou no Item ${btn.getAttribute('data-item')} (via delegação).`);
    };

    grid.addEventListener('click', handler);

    const cleanup = () => {
        try {
            grid.removeEventListener('click', handler);
        } catch (err) {
            // ignore
        }
    };
    state.eventsMgmt_demo2_cleanup = cleanup;

    setTimeout(() => {
        if (state.eventsMgmt_demo2_cleanup === cleanup) {
            cleanup();
            state.eventsMgmt_demo2_cleanup = null;
        }
    }, 10000);
}

function eventsMgmt_demo3() {
    const lines = [];
    lines.push('addEventListener(type, handler, options)');
    lines.push('');
    lines.push('options comuns:');
    lines.push('- once: executa 1 vez e remove automaticamente');
    lines.push('- passive: diz ao browser que você não chamará preventDefault() (melhora performance em scroll)');
    lines.push('- capture: controla fase de captura/bubbling');
    lines.push('');
    lines.push('Use once quando faz sentido e limpe listeners quando não precisar mais.');
    if (_events_isBrowser()) {
        showResult('result3', lines.join('\n'));
    }
    return lines.join('\n');
}

function eventsMgmt_demo4() {
    if (!_events_isBrowser()) {
        return 'Demo disponível apenas no navegador.';
    }

    const grid = document.getElementById('delegateGrid');
    if (!grid) {
        showResult('result4', 'Elemento #delegateGrid não encontrado.');
        return;
    }

    const state = _events_getState();
    if (state.eventsMgmt_demo4_cleanup) {
        state.eventsMgmt_demo4_cleanup();
        state.eventsMgmt_demo4_cleanup = null;
    }

    let clicks = 0;
    showResult('result4', 'Ativo por 10s. Clique nos itens; após 3 cliques o listener será removido.');

    const handler = (e) => {
        const btn = e.target && e.target.closest ? e.target.closest('button[data-item]') : null;
        if (!btn || !grid.contains(btn)) return;
        clicks++;
        if (clicks >= 3) {
            grid.removeEventListener('click', handler);
            state.eventsMgmt_demo4_cleanup = null;
            showResult('result4', 'Listener removido do grid após 3 cliques.');
            return;
        }
        showResult('result4', `Clique #${clicks} capturado (ainda ativo).`);
    };

    grid.addEventListener('click', handler);

    const cleanup = () => {
        try {
            grid.removeEventListener('click', handler);
        } catch (err) {
            // ignore
        }
    };
    state.eventsMgmt_demo4_cleanup = cleanup;

    setTimeout(() => {
        if (state.eventsMgmt_demo4_cleanup === cleanup) {
            cleanup();
            state.eventsMgmt_demo4_cleanup = null;
        }
    }, 10000);
}

// ============================================================================
// CONVENTIONS (Basic) - Funções de demonstração
// ============================================================================

function conventions_demo1() {
    // Demonstra strict mode vs modo "solto" usando Function()
    let output = '"use strict" ajuda a evitar alguns bugs (ex: variáveis globais acidentais).\n\n';

    try {
        // Sem strict: criar variável sem declarar (em browsers não-strict) pode "funcionar" e vazar global.
        // Em alguns ambientes modernos isso pode se comportar diferente, então mostramos como conceito.
        // eslint-disable-next-line no-new-func
        const sloppy = new Function('xNaoDeclarada = 1; return xNaoDeclarada;');
        const sloppyResult = sloppy();
        output += 'Sem strict: xNaoDeclarada = 1 -> ' + sloppyResult + '\n';
    } catch (err) {
        output += 'Sem strict: erro -> ' + err.name + ': ' + err.message + '\n';
    }

    try {
        // eslint-disable-next-line no-new-func
        const strictFn = new Function("'use strict'; xNaoDeclarada = 1; return xNaoDeclarada;");
        const strictResult = strictFn();
        output += 'Com strict: xNaoDeclarada = 1 -> ' + strictResult + '\n';
    } catch (err) {
        output += 'Com strict: erro -> ' + err.name + ': ' + err.message + '\n';
    }

    output += '\nDica: use strict (ou módulos) + declare com const/let.';
    showResult('result1', output);
}

function conventions_demo2() {
    const lines = [];
    lines.push('Padrões comuns de nome:');
    lines.push('- camelCase: variáveis, funções (ex: userName, calculateTotal)');
    lines.push('- PascalCase: classes/constructors (ex: UserService)');
    lines.push('- UPPER_SNAKE_CASE: constantes (ex: MAX_RETRIES)');
    lines.push('');
    const MAX_RETRIES = 3;
    function calculateTotal(items) {
        return items.reduce((sum, n) => sum + n, 0);
    }
    class UserService {
        constructor(name) {
            this.name = name;
        }
    }
    const total = calculateTotal([10, 20, 5]);
    const service = new UserService('Ana');
    lines.push('Exemplo rápido:');
    lines.push('MAX_RETRIES = ' + MAX_RETRIES);
    lines.push('calculateTotal([10,20,5]) = ' + total);
    lines.push('new UserService("Ana").name = ' + service.name);
    showResult('result2', lines.join('\n'));
}

function conventions_demo3() {
    const snippet = [
        'Exemplo (organização):',
        '',
        '// ✅ bom: nomes claros + funções pequenas',
        'function isAdult(age) {',
        '  return age >= 18;',
        '}',
        '',
        'function formatUser(name, age) {',
        '  return name + " (" + age + ")";',
        '}',
        '',
        '// ✅ bom: early return',
        'function canEnter(age) {',
        '  if (!Number.isFinite(age)) return false;',
        '  return isAdult(age);',
        '}'
    ].join('\n');
    showResult('result3', snippet);
}

function conventions_demo4() {
    const lines = [];
    lines.push('Checklist rápido de consistência:');
    lines.push('- Indentação consistente (2 ou 4 espaços)');
    lines.push('- Aspas consistentes ("" ou \'\')');
    lines.push('- Sempre use ; ou nunca use (mas seja consistente)');
    lines.push('- Prefira const/let em vez de var');
    lines.push('- Funções pequenas e nomes descritivos');
    lines.push('- Evite duplicação (DRY)');
    showResult('result4', lines.join('\n'));
}

function bestPractices_demo1() {
    const a = '10';
    const b = 10;
    let output = 'Comparação estrita evita coerção surpresa:\n\n';
    output += "'10' == 10  -> " + (a == b) + '\n';
    output += "'10' === 10 -> " + (a === b) + '\n\n';
    output += 'Dica: use === (e !==) como padrão.';
    showResult('result1', output);
}

function bestPractices_demo2() {
    const inputs = ['12', '12a', '', '  ', '0', '3.14'];
    let output = 'Validando conversão numérica:\n\n';
    inputs.forEach((v) => {
        const n = Number(v);
        output += `input="${v}" -> Number()=${n} | isNaN=${Number.isNaN(n)}\n`;
    });
    output += '\nDica: valide com Number.isNaN / Number.isFinite antes de usar.';
    showResult('result2', output);
}

function bestPractices_demo3() {
    let output = 'let/const respeitam escopo de bloco:\n\n';
    let x = 1;
    output += 'Antes do bloco: x=' + x + '\n';
    {
        const x = 2;
        output += 'Dentro do bloco: const x=' + x + '\n';
    }
    output += 'Depois do bloco: x=' + x + '\n\n';
    output += 'Dica: use const por padrão; use let quando precisar reatribuir.';
    showResult('result3', output);
}

function bestPractices_demo4() {
    function greet(name = 'visitante') {
        const safe = String(name).trim();
        return safe ? 'Olá, ' + safe + '!' : 'Olá, visitante!';
    }
    let output = 'Defaults + funções previsíveis:\n\n';
    output += 'greet() -> ' + greet() + '\n';
    output += 'greet("  ") -> ' + greet('  ') + '\n';
    output += 'greet("Ana") -> ' + greet('Ana') + '\n';
    showResult('result4', output);
}

function mistakes_demo1() {
    const a = 0.1 + 0.2;
    let output = 'Ponto flutuante (IEEE 754):\n\n';
    output += '0.1 + 0.2 = ' + a + '\n';
    output += '0.1 + 0.2 === 0.3 -> ' + (a === 0.3) + '\n\n';
    output += 'Correção comum: arredondar (ex: Math.round(x*100)/100).\n';
    output += 'Arredondado (2 casas): ' + (Math.round(a * 100) / 100);
    showResult('result1', output);
}

function mistakes_demo2() {
    const x = NaN;
    let output = 'NaN é um valor especial:\n\n';
    output += 'NaN === NaN -> ' + (x === NaN) + '\n';
    output += 'Number.isNaN(NaN) -> ' + Number.isNaN(x) + '\n';
    output += 'isNaN("12a") -> ' + isNaN('12a') + ' (coerção!)\n';
    output += 'Number.isNaN(Number("12a")) -> ' + Number.isNaN(Number('12a')) + '\n\n';
    output += 'Dica: prefira Number.isNaN.';
    showResult('result2', output);
}

function mistakes_demo3() {
    function badReturn() {
        return
        {
            ok: true
        };
    }

    function goodReturn() {
        return {
            ok: true
        };
    }

    let output = 'ASI (Automatic Semicolon Insertion) pode surpreender:\n\n';
    output += 'badReturn() -> ' + JSON.stringify(badReturn()) + '\n';
    output += 'goodReturn() -> ' + JSON.stringify(goodReturn()) + '\n\n';
    output += 'Dica: evite quebra de linha logo após return.';
    showResult('result3', output);
}

function mistakes_demo4() {
    let output = 'Variável global acidental (exemplo):\n\n';

    try {
        // eslint-disable-next-line no-new-func
        const sloppy = new Function('xGlobal = 123; return xGlobal;');
        output += 'Sem strict: xGlobal=123 -> ' + sloppy() + ' (pode vazar global)\n';
    } catch (err) {
        output += 'Sem strict: erro -> ' + err.name + ': ' + err.message + '\n';
    }

    try {
        // eslint-disable-next-line no-new-func
        const strictFn = new Function("'use strict'; xGlobal = 123; return xGlobal;");
        output += 'Com strict: xGlobal=123 -> ' + strictFn() + '\n';
    } catch (err) {
        output += 'Com strict: erro -> ' + err.name + ': ' + err.message + '\n';
    }

    output += '\nDica: sempre declare com const/let e prefira módulos (ESM).';
    showResult('result4', output);
}

function performance_demo1() {
    const now = (typeof performance !== 'undefined' && performance.now) ? () => performance.now() : () => Date.now();
    const loops = 200000;

    // Simulação: em vez de realmente acessar DOM milhares de vezes, comparamos custo de acessar uma variável repetidamente.
    const obj = { value: 1 };

    let t0 = now();
    let sum1 = 0;
    for (let i = 0; i < loops; i++) {
        sum1 += obj.value;
    }
    let t1 = now();

    const cached = obj.value;
    let sum2 = 0;
    let t2 = now();
    for (let i = 0; i < loops; i++) {
        sum2 += cached;
    }
    let t3 = now();

    const output = [
        'Simulação de cache (ideia: evitar lookup repetido):',
        '',
        `loops: ${loops}`,
        `lookup repetido: ${(t1 - t0).toFixed(2)}ms (sum=${sum1})`,
        `cache em variável: ${(t3 - t2).toFixed(2)}ms (sum=${sum2})`,
        '',
        'Dica: cache DOM/valores dentro de loops e evite trabalho repetido.'
    ].join('\n');

    showResult('result1', output);
}

function performance_demo2() {
    if (typeof document === 'undefined') {
        return 'Demo disponível apenas no navegador.';
    }

    const input = document.getElementById('perfInput');
    if (!input) {
        showResult('result2', 'Elemento #perfInput não encontrado.');
        return;
    }

    const state = (typeof globalThis !== 'undefined') ? (globalThis.__jsTutorialPerfState ||= {}) : {};
    if (state.cleanup) {
        state.cleanup();
        state.cleanup = null;
    }

    let fired = 0;
    const handler = debounce(() => {
        fired++;
        showResult('result2', `Debounced fired: ${fired}\nValor atual: ${input.value}`);
    }, 300);

    const onInput = () => handler();
    input.addEventListener('input', onInput);
    input.focus();
    showResult('result2', 'Ativo por 5s. Digite para ver o debounce (300ms).');

    const cleanup = () => {
        try {
            input.removeEventListener('input', onInput);
        } catch (err) {
            // ignore
        }
    };
    state.cleanup = cleanup;

    setTimeout(() => {
        if (state.cleanup === cleanup) {
            cleanup();
            state.cleanup = null;
            showResult('result2', 'Encerrado (5s).');
        }
    }, 5000);
}

function performance_demo3() {
    const now = (typeof performance !== 'undefined' && performance.now) ? () => performance.now() : () => Date.now();
    const n = 40000;

    let t0 = now();
    let s = '';
    for (let i = 0; i < n; i++) {
        s += 'a';
    }
    let t1 = now();

    let t2 = now();
    const parts = [];
    for (let i = 0; i < n; i++) {
        parts.push('a');
    }
    const joined = parts.join('');
    let t3 = now();

    const output = [
        'Concat vs Join (micro-benchmark):',
        '',
        `n = ${n}`,
        `concat: ${(t1 - t0).toFixed(2)}ms (len=${s.length})`,
        `join:   ${(t3 - t2).toFixed(2)}ms (len=${joined.length})`,
        '',
        'Obs: resultados variam por engine; use quando fizer sentido.'
    ].join('\n');

    showResult('result3', output);
}

function performance_demo4() {
    const tips = [];
    tips.push('Dicas rápidas:');
    tips.push('- Evite work pesado em eventos (scroll/mousemove) -> use debounce/throttle');
    tips.push('- Prefira algoritmos melhores (O(n) vs O(n²)) antes de micro-otimizar');
    tips.push('- Evite layout thrashing (ler/alterar DOM intercalado)');
    tips.push('- Use requestAnimationFrame para animações');
    tips.push('- Meça antes: performance.now(), DevTools Performance');
    showResult('result4', tips.join('\n'));
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        highlightActivePage,
        toggleSidebar,
        copyCode,
        runCode,
        formatDate,
        debounce,
        demo1,
        demo2,
        demo3,
        demo4,
        demo5,
        demo6,
        showResult,
        typedArrays_demo1,
        typedArrays_demo2,
        typedArrays_demo3,
        typedArrays_demo4,
        typedArrays_demo5,
        typedArrays_demo6,
        typedArrays_demo7,
        typedArrays_demo8,
        typedMethods_demo1,
        typedMethods_demo2,
        typedMethods_demo3,
        typedMethods_demo4,
        typedMethods_demo5,
        typedMethods_demo6,
        typedMethods_demo7,
        typedMethods_demo8,
        typedMethods_demo9,
        typedRef_demo1,
        regexp_demo1,
        regexp_demo2,
        regexp_demo3,
        regexp_demo4,
        regexpFlags_demo1,
        regexpFlags_demo2,
        regexpFlags_demo3,
        regexpFlags_demo4,
        regexpChars_demo1,
        regexpChars_demo2,
        regexpChars_demo3,
        regexpChars_demo4,
        regexpMeta_demo1,
        regexpMeta_demo2,
        regexpMeta_demo3,
        regexpMeta_demo4,
        regexpAssertions_demo1,
        regexpAssertions_demo2,
        regexpAssertions_demo3,
        regexpAssertions_demo4,
        regexpQuant_demo1,
        regexpQuant_demo2,
        regexpQuant_demo3,
        regexpQuant_demo4,
        regexpPatterns_demo1,
        regexpPatterns_demo2,
        regexpPatterns_demo3,
        regexpPatterns_demo4,
        regexpObjects_demo1,
        regexpObjects_demo2,
        regexpObjects_demo3,
        regexpObjects_demo4,
        regexpMethods_demo1,
        regexpMethods_demo2,
        regexpMethods_demo3,
        regexpMethods_demo4,
        datatypes_demo1,
        datatypes_demo2,
        datatypes_demo3,
        datatypes_demo4,
        typeof_demo1,
        typeof_demo2,
        typeof_demo3,
        typeof_demo4,
        tostring_demo1,
        tostring_demo2,
        tostring_demo3,
        tostring_demo4,
        typeConversion_demo1,
        typeConversion_demo2,
        typeConversion_demo3,
        typeConversion_demo4,
        errors_demo1,
        errors_demo2,
        errors_demo3,
        errors_demo4,
        errorsSilent_demo1,
        errorsSilent_demo2,
        errorsSilent_demo3,
        errorsSilent_demo4,
        errorStatements_demo1,
        errorStatements_demo2,
        errorStatements_demo3,
        errorStatements_demo4,
        errorObject_demo1,
        errorObject_demo2,
        errorObject_demo3,
        errorObject_demo4,
        debugging_demo1,
        debugging_demo2,
        debugging_demo3,
        debugging_demo4,
        events_demo1,
        events_demo2,
        events_demo3,
        events_demo4,
        eventsMouse_demo1,
        eventsMouse_demo2,
        eventsMouse_demo3,
        eventsMouse_demo4,
        eventsKeyboard_demo1,
        eventsKeyboard_demo2,
        eventsKeyboard_demo3,
        eventsKeyboard_demo4,
        eventsLoad_demo1,
        eventsLoad_demo2,
        eventsLoad_demo3,
        eventsLoad_demo4,
        eventsTiming_demo1,
        eventsTiming_demo2,
        eventsTiming_demo3,
        eventsTiming_demo4,
        eventsMgmt_demo1,
        eventsMgmt_demo2,
        eventsMgmt_demo3,
        eventsMgmt_demo4,
        conventions_demo1,
        conventions_demo2,
        conventions_demo3,
        conventions_demo4,
        bestPractices_demo1,
        bestPractices_demo2,
        bestPractices_demo3,
        bestPractices_demo4,
        mistakes_demo1,
        mistakes_demo2,
        mistakes_demo3,
        mistakes_demo4,
        performance_demo1,
        performance_demo2,
        performance_demo3,
        performance_demo4
    };
}