/**
 * JavaScript para o Site JavaScript Tutorial
 * Funcionalidades gerais do site
 */

// ========================================
// NAVEGAÇÃO RESPONSIVA
// ========================================
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
        typedRef_demo1
    };
}