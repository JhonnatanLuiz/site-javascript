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
// ARRAYS.HTML DEMOS
// ========================================
function arrays_demo1() {
    const cars = ["Saab", "Volvo", "BMW"];
    showResult('result1', cars);
}

function arrays_demo2() {
    const cars = ["Saab", "Volvo", "BMW"];
    showResult('result2', cars[0]);
}

function arrays_demo3() {
    const cars = ["Saab", "Volvo", "BMW"];
    cars[0] = "Opel";
    showResult('result3', cars);
}

function arrays_demo4() {
    const cars = ["Saab", "Volvo", "BMW"];
    showResult('result4', cars.toString());
}

function arrays_demo5() {
    const cars = ["Saab", "Volvo", "BMW"];
    showResult('result5', typeof cars);
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
        showResult
    };
}