/**
 * Demos da sessão Advanced > Functions
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

    function advFunctions_demo1() {
        const lines = [];
        lines.push('Funções em JavaScript (Advanced)');
        lines.push('');
        lines.push('- Funções são valores (first-class).');
        lines.push('- Podem ser passadas como argumento e retornadas.');
        lines.push('- Podem fechar sobre variáveis (closures).');
        return safeShowResult('result1', lines.join('\n'));
    }

    function advFunctions_demo2() {
        const lines = [];
        lines.push('Closure (função que “lembra” do ambiente):');
        lines.push('');

        function makeCounter() {
            let count = 0;
            return function () {
                count += 1;
                return count;
            };
        }

        const counterA = makeCounter();
        const counterB = makeCounter();

        lines.push('counterA(): ' + counterA());
        lines.push('counterA(): ' + counterA());
        lines.push('counterB(): ' + counterB());
        lines.push('counterA(): ' + counterA());
        lines.push('');
        lines.push('Cada counter tem seu próprio estado interno.');

        return safeShowResult('result2', lines.join('\n'));
    }

    function advFunctions_demo3() {
        const lines = [];
        lines.push('Higher-order function (recebe função):');
        lines.push('');

        function applyTwice(value, fn) {
            return fn(fn(value));
        }

        const result = applyTwice(3, (n) => n + 2);
        lines.push('applyTwice(3, n => n + 2) = ' + result);
        lines.push('');
        lines.push('Dica: isso é a base de callbacks, map/filter/reduce e middlewares.');

        return safeShowResult('result3', lines.join('\n'));
    }

    function advFunctions_demo4() {
        const lines = [];
        lines.push('this / bind (noções rápidas):');
        lines.push('');

        const person = {
            name: 'Jhonnatan',
            say: function (prefix) {
                return prefix + ' ' + this.name;
            }
        };

        const loose = person.say;
        const bound = person.say.bind(person);

        lines.push('person.say("Olá") = ' + person.say('Olá'));
        lines.push('loose.call({name:"Outro"}, "Oi") = ' + loose.call({ name: 'Outro' }, 'Oi'));
        lines.push('bound("Hey") = ' + bound('Hey'));
        lines.push('');
        lines.push('Em geral: entenda como this é definido (call/apply/bind / método / arrow).');

        return safeShowResult('result4', lines.join('\n'));
    }

    return {
        advFunctions_demo1,
        advFunctions_demo2,
        advFunctions_demo3,
        advFunctions_demo4
    };
});
