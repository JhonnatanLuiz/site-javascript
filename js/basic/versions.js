/**
 * Demos da sessão Basic > Versions
 * - No browser: expõe funções no window para uso via onclick
 * - No Node: exporta as funções via module.exports (sem acessar DOM no topo)
 */

(function (root, factory) {
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory();
    } else {
        const api = factory();
        Object.keys(api).forEach((k) => {
            root[k] = api[k];
        });
    }
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this), function () {
    function safeShowResult(elementId, text) {
        if (typeof showResult === 'function') {
            showResult(elementId, text);
            return;
        }
        return text;
    }

    function versions_demo1() {
        const lines = [];
        lines.push('O que são “Versions” no JavaScript?');
        lines.push('');
        lines.push('- JavaScript é a linguagem.');
        lines.push('- ECMAScript (ES) é o padrão que define a linguagem.');
        lines.push('- Desde 2016, versões são lançadas anualmente (ES2016, ES2017, ...).');
        lines.push('');
        lines.push('Dica: foque em conceitos e use “feature detection”.');
        return safeShowResult('result1', lines.join('\n'));
    }

    function versions_demo2() {
        const lines = [];
        lines.push('Como ler nomes de versões:');
        lines.push('');
        lines.push('- ES6 == ES2015 (mesma grande atualização).');
        lines.push('- ES2020, ES2021, ... seguem o ano.');
        lines.push('');
        lines.push('Na prática, você programa para o ambiente (browser/Node) e verifica suporte.');
        return safeShowResult('result2', lines.join('\n'));
    }

    function versions_demo3() {
        const currentYear = new Date().getFullYear();
        const lines = [];
        lines.push('Exemplo: “feature detection” (detectar recurso):');
        lines.push('');
        lines.push(`Ano atual no seu sistema: ${currentYear}`);
        lines.push(`Promise disponível? ${typeof Promise !== 'undefined'}`);
        lines.push(`fetch disponível? ${typeof fetch !== 'undefined'}`);
        lines.push(`BigInt disponível? ${typeof BigInt !== 'undefined'}`);
        lines.push('');
        lines.push('Se o recurso não existe, você pode usar fallback/polyfill/transpilação.');
        return safeShowResult('result3', lines.join('\n'));
    }

    function versions_demo4() {
        const lines = [];
        lines.push('Dica de compatibilidade:');
        lines.push('');
        lines.push('- Evite “detectar navegador” por userAgent quando possível.');
        lines.push('- Prefira detectar recursos (ex.: `if (window.Promise) { ... }`).');
        lines.push('- Se precisar suportar ambientes antigos, considere transpilar (Babel/TS) e/ou polyfills.');
        return safeShowResult('result4', lines.join('\n'));
    }

    function versionsYear_demo1(year) {
        const y = Number(year);
        const lines = [];
        lines.push(`JavaScript ${y}`);
        lines.push('');
        lines.push('Use esta página como ponto de estudo:');
        lines.push('- Leia o resumo da versão');
        lines.push('- Teste recursos com exemplos');
        lines.push('- Compare com a versão anterior');
        return safeShowResult('result1', lines.join('\n'));
    }

    function versionsYear_demo2(year) {
        const y = Number(year);
        const lines = [];
        lines.push(`Feature detection (exemplos) - JS ${y}`);
        lines.push('');
        lines.push(`Array.prototype.includes disponível? ${typeof Array.prototype.includes === 'function'}`);
        lines.push(`Object.entries disponível? ${typeof Object.entries === 'function'}`);
        lines.push(`Intl disponível? ${typeof Intl !== 'undefined'}`);
        return safeShowResult('result2', lines.join('\n'));
    }

    function versionsYear_demo3(year) {
        const y = Number(year);
        const lines = [];
        lines.push(`Exemplo rápido (sempre funciona): JS ${y}`);
        lines.push('');
        const nums = [1, 2, 3, 4, 5];
        const doubled = nums.map((n) => n * 2);
        lines.push(`Original: ${JSON.stringify(nums)}`);
        lines.push(`Dobrado: ${JSON.stringify(doubled)}`);
        lines.push('');
        lines.push('Mesmo que a sintaxe mude entre versões, os fundamentos continuam.');
        return safeShowResult('result3', lines.join('\n'));
    }

    function versionsYear_demo4(year) {
        const y = Number(year);
        const lines = [];
        lines.push(`Dica prática - JS ${y}`);
        lines.push('');
        lines.push('- Se você está aprendendo: entenda o conceito antes de decorar features.');
        lines.push('- Se você está trabalhando: valide suporte no ambiente alvo.');
        lines.push('- Se precisar: transpile e adicione polyfills com cuidado.');
        return safeShowResult('result4', lines.join('\n'));
    }

    function versionsTopic_demo1(topic) {
        const t = String(topic || '').toUpperCase();
        const lines = [];
        lines.push(`Tema: ${t}`);
        lines.push('');

        if (t === 'ES6') {
            lines.push('ES6 (ES2015) trouxe grandes mudanças: classes, módulos, let/const, arrow functions, etc.');
        } else if (t === 'ES5') {
            lines.push('ES5 consolidou a base moderna: strict mode, JSON, métodos de Array, etc.');
        } else if (t === 'ES3') {
            lines.push('ES3 é legado; aparece quando falamos de compatibilidade com navegadores antigos.');
        } else if (t === 'IE_EDGE') {
            lines.push('Compatibilidade de navegador: IE é legado; Edge moderno é baseado em Chromium.');
        } else if (t === 'HISTORY') {
            lines.push('História: JavaScript evolui via ECMAScript e hoje tem versões anuais.');
        } else {
            lines.push('Resumo do tema indisponível.');
        }

        return safeShowResult('result1', lines.join('\n'));
    }

    function versionsTopic_demo2(topic) {
        const t = String(topic || '').toUpperCase();
        const lines = [];
        lines.push('Exemplo de checagem de suporte:');
        lines.push('');

        if (t === 'ES6') {
            let hasLetConst = false;
            try {
                // eslint-disable-next-line no-new-func
                new Function('let x = 1; const y = 2; return x + y;');
                hasLetConst = true;
            } catch (e) {
                hasLetConst = false;
            }

            lines.push(`let/const disponíveis? ${hasLetConst}`);
            lines.push(`Promise disponível? ${typeof Promise !== 'undefined'}`);
        } else if (t === 'ES5') {
            lines.push(`JSON disponível? ${typeof JSON !== 'undefined'}`);
            lines.push(`Array.isArray disponível? ${typeof Array.isArray === 'function'}`);
        } else if (t === 'ES3') {
            lines.push('Em geral, ES3 não tem JSON e vários métodos modernos de Array.');
            lines.push(`JSON disponível agora? ${typeof JSON !== 'undefined'}`);
        } else if (t === 'IE_EDGE') {
            lines.push(`UserAgent disponível? ${typeof navigator !== 'undefined'}`);
            if (typeof navigator !== 'undefined') {
                lines.push(`UA: ${navigator.userAgent}`);
            }
        } else {
            lines.push(`Promise disponível? ${typeof Promise !== 'undefined'}`);
            lines.push(`fetch disponível? ${typeof fetch !== 'undefined'}`);
        }

        return safeShowResult('result2', lines.join('\n'));
    }

    function versionsTopic_demo3(topic) {
        const t = String(topic || '').toUpperCase();
        const lines = [];
        lines.push('Exemplo rápido:');
        lines.push('');

        if (t === 'ES6') {
            const name = 'Mundo';
            const greet = (n) => `Olá, ${n}!`;
            lines.push(greet(name));
            lines.push('Exemplo: arrow function + template literal.');
        } else if (t === 'ES5') {
            const obj = { ok: true, value: 42 };
            lines.push('JSON.stringify: ' + JSON.stringify(obj));
            lines.push('Exemplo: JSON é parte do ES5 (muito usado).');
        } else if (t === 'ES3') {
            const s = 'javascript';
            lines.push('toUpperCase: ' + s.toUpperCase());
            lines.push('Exemplo: operações básicas continuam iguais.');
        } else if (t === 'IE_EDGE') {
            const supports = {
                promise: typeof Promise !== 'undefined',
                fetch: typeof fetch !== 'undefined'
            };
            lines.push('Suporte (estimativa): ' + JSON.stringify(supports));
        } else {
            lines.push('Versões evoluem, mas: variáveis, funções, objetos e arrays são fundamentos.');
        }

        return safeShowResult('result3', lines.join('\n'));
    }

    function versionsTopic_demo4(topic) {
        const t = String(topic || '').toUpperCase();
        const lines = [];
        lines.push('Dica final:');
        lines.push('');

        if (t === 'IE_EDGE') {
            lines.push('- Se você ainda precisa suportar IE: limite features e use transpile/polyfills.');
            lines.push('- Teste em ambiente real (ou em ferramentas/VMs).');
        } else if (t === 'ES3') {
            lines.push('- ES3 é principalmente contexto histórico/legado.');
            lines.push('- Em projetos atuais, mire em ambientes modernos e compile quando necessário.');
        } else {
            lines.push('- Prefira “feature detection” a “browser sniffing”.');
            lines.push('- Use recursos modernos quando o ambiente suportar.');
        }

        return safeShowResult('result4', lines.join('\n'));
    }

    return {
        versions_demo1,
        versions_demo2,
        versions_demo3,
        versions_demo4,
        versionsYear_demo1,
        versionsYear_demo2,
        versionsYear_demo3,
        versionsYear_demo4,
        versionsTopic_demo1,
        versionsTopic_demo2,
        versionsTopic_demo3,
        versionsTopic_demo4
    };
});
