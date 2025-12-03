# Changelog - Site JavaScript Tutorial

## [2025-12-02] - Typed Arrays Section Completa

### ✨ Novas Páginas

#### basic/typed-arrays.html (Reescrito)
- **Conteúdo completo** sobre Typed Arrays do JavaScript (ES6)
- **8 exemplos interativos** funcionais:
  - Demo 1: Criação básica de Uint8Array
  - Demo 2: Acessando valores com índices
  - Demo 3: Int8Array com números negativos
  - Demo 4: Clamped Array (valores 0-255)
  - Demo 5: Float32Array para decimais
  - Demo 6: Float64Array (maior precisão)
  - Demo 7: Comparação de tamanhos (BYTES_PER_ELEMENT)
  - Demo 8: Modificando valores em Typed Arrays
- **Tabela comparativa** de tipos: Int8Array, Uint8Array, Float32Array, etc.
- **Navegação** corrigida: array_const.html ← → typed_methods.html

#### basic/typed_methods.html (Novo)
- **9 exemplos interativos** sobre métodos de Typed Arrays:
  - Demo 1: TypedArray.from() criando de arrays
  - Demo 2: TypedArray.of() criando de valores
  - Demo 3: constructor.name identificando tipo
  - Demo 4: BYTES_PER_ELEMENT verificando tamanho
  - Demo 5: Método fill() preenchendo valores
  - Demo 6: Método find() buscando elementos
  - Demo 7: Método some() testando condições
  - Demo 8: Método findIndex() localizando posição
  - Demo 9: Combinando múltiplos métodos
- **Navegação**: typed-arrays.html ← → typed_reference.html

#### basic/typed_reference.html (Novo)
- **Tabela de 12 tipos** de Typed Arrays:
  - Int8Array, Uint8Array, Uint8ClampedArray
  - Int16Array, Uint16Array
  - Int32Array, Uint32Array
  - BigInt64Array, BigUint64Array
  - Float16Array, Float32Array, Float64Array
- **Tabela de 30+ métodos** com descrições em português
- **1 exemplo interativo** demonstrando todos os tipos
- **Suporte de browsers** documentado (Chrome 7+, Firefox 4+, Safari 5.1+, Edge 12+)
- **Navegação**: typed_methods.html ← → sets.html

### 📝 Atualizações de Código

#### js/script.js
**18 novas funções adicionadas:**

```javascript
// Typed Arrays (8 funções)
typedArrays_demo1() - Uint8Array básico
typedArrays_demo2() - Acesso por índice
typedArrays_demo3() - Int8Array negativo
typedArrays_demo4() - Uint8ClampedArray
typedArrays_demo5() - Float32Array
typedArrays_demo6() - Float64Array
typedArrays_demo7() - Comparação de tamanhos
typedArrays_demo8() - Modificando valores

// Typed Methods (9 funções)
typedMethods_demo1() - from()
typedMethods_demo2() - of()
typedMethods_demo3() - constructor.name
typedMethods_demo4() - BYTES_PER_ELEMENT
typedMethods_demo5() - fill()
typedMethods_demo6() - find()
typedMethods_demo7() - some()
typedMethods_demo8() - findIndex()
typedMethods_demo9() - Combinando métodos

// Typed Reference (1 função)
typedRef_demo1() - Demonstração geral
```

**Total de linhas adicionadas:** ~200 linhas

#### index.html
**2 novos cards adicionados:**
- 📊 Typed Methods - `border-purple-500`
- 📖 Typed Reference - `border-blue-500`

**Total de cards:** 54 (era 52)

### 🎨 Design Consistente

- **Gradiente header**: `from-blue-600 via-indigo-600 to-purple-600`
- **Sidebar responsiva** com menu hamburger
- **Breadcrumbs** em todas as páginas
- **Botões de navegação** padronizados
- **Cores de sintaxe** para código:
  - `purple-400` - keywords (const, let)
  - `yellow-300` - funções
  - `green-400` - strings
  - `blue-400` - propriedades
  - `pink-400` - números

### 📊 Resumo de Mudanças

**Arquivos Modificados:** 4
1. `basic/typed-arrays.html` - Reescrito completamente (~400 linhas)
2. `basic/typed_methods.html` - Criado (~380 linhas)
3. `basic/typed_reference.html` - Criado (~350 linhas)
4. `js/script.js` - +18 funções (~200 linhas)
5. `index.html` - +2 cards

**Linhas Totais:**
- Adicionadas: ~1330 linhas
- Funções novas: 18
- Exemplos interativos: 18

### 🎯 Benefícios

1. **Cobertura ES6**: Typed Arrays agora documentados completamente
2. **Referência**: Tabelas completas para consulta rápida
3. **Interatividade**: Todos os exemplos são executáveis
4. **Consistência**: Seguindo padrão visual de todas as outras páginas
5. **Navegação**: Links Previous/Next funcionais

---

## [2025-11-17] - Correções e Melhorias Loops Section

### 🔧 Correções Críticas

#### switch.html
- **FIXED**: String literal não terminada (linha 243)
  - Problema: Aspas duplas dentro de onclick causavam erro de sintaxe
  - Solução: Substituídas por `&quot;` (HTML entity)
- **FIXED**: Redeclaração de variável 'd' (linhas 144 e 182)
  - Problema: `let d` declarado múltiplas vezes em inline onclick handlers
  - Solução: Trocado para `var d` e `var day` para evitar conflito de escopo

#### continue.html
- **FIXED**: Botões de navegação inconsistentes
  - Problema: Usava links azuis com SVG icons (diferente do padrão)
  - Solução: Implementado padrão booleans.html:
    - Botão "Anterior": `bg-gray-200` com seta ←
    - Botão "Próximo": gradiente `from-blue-600 to-indigo-600` com seta →
  - Mudanças visuais:
    - `pt-6` → `pt-8` (padding superior aumentado)
    - Removidos componentes SVG complexos
    - Adicionadas transições hover consistentes

- **FIXED**: JavaScript inline removido
  - Problema: 100+ linhas de JS inline (funções demo1-demo6)
  - Violava documentação: "External script: `../js/script.js` only"
  - Solução: Movido todo código para `js/script.js`

### ✨ Novas Features

#### js/script.js
Adicionadas 6 funções demo para continue.html:
- `demo1()` - Continue básico (pula número 5)
- `demo2()` - Números ímpares (pula pares)
- `demo3()` - Continue vs Break comparison
- `demo4()` - Filtro de array (pula negativos)
- `demo5()` - Continue em while loop
- `demo6()` - Soma seletiva com continue

**Helper function adicionada:**
```javascript
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
```

### 🎨 Melhorias de UI

#### index.html - Emojis nos Cards
Todos os 22 cards básicos agora têm emojis consistentes:

**Fundamentos:**
- 📚 Tutorial
- 👋 Introduction
- 📍 Where To
- 📤 Output
- 📝 Syntax
- 📦 Variables

**Operadores:**
- 🔢 Operators
- ➕ Arithmetic
- = Assignment
- ⚖️ Comparisons

**Condicionais:**
- 🔀 If Conditions
- ❓ If
- ↔️ If Else
- ❔ Ternary
- 🔀 Switch
- ✅ Booleans
- 🧠 Logical

**Loops:**
- 🔁 JS Loops *(já existente)*
- ➰ JS For Loop *(já existente)*
- 🔄 JS While Loop *(já existente)*
- 🛑 JS Break *(já existente)*
- ⏭️ JS Continue *(já existente)*

**Outros:**
- 🔤 Strings
- 🔢 Numbers
- ⚙️ Functions
- ⚡ Events

### 📝 Documentação Atualizada

#### .github/prompts/plan-conditionalPages.prompt.md
**Seção Dependencies atualizada:**
```markdown
### Dependencies
- Tailwind CSS CDN: `https://cdn.tailwindcss.com`
- External script: `../js/script.js` (initMobileMenu + demo functions for interactive examples)
- **No inline JavaScript** in HTML pages - all demos use functions from script.js
- All interactive examples call external functions (demo1-demo6, showResult helper)
```

### 🧪 Validação

#### Erros Corrigidos
- ✅ switch.html: 0 erros críticos (era 3)
- ✅ continue.html: 0 erros críticos (apenas warnings de CSS duplicado - esperado)
- ✅ Todas as páginas de loops funcionais

#### Warnings CSS (Tailwind - Esperado)
- Conflitos de gradiente (from-purple-500 vs from-pink-500)
- Propriedades duplicadas em diferentes contextos (hover, estados)
- **Status**: Normal - Tailwind permite múltiplas classes para responsividade

### 📊 Resumo de Mudanças

**Arquivos Modificados:** 5
1. `basic/switch.html` - 2 correções de sintaxe
2. `basic/continue.html` - Botões navegação + JS removido
3. `js/script.js` - 6 funções + 1 helper adicionadas
4. `index.html` - 17 emojis adicionados aos cards
5. `.github/prompts/plan-conditionalPages.prompt.md` - Documentação atualizada

**Linhas Alteradas:**
- Removidas: ~100 (JS inline de continue.html)
- Adicionadas: ~95 (script.js) + 22 (index.html emojis)
- Modificadas: ~15 (correções de sintaxe e navegação)

### 🎯 Benefícios

1. **Manutenibilidade**: Todo JS agora centralizado em script.js
2. **Consistência**: Todos os botões de navegação seguem mesmo padrão
3. **UX**: Emojis melhoram identificação visual dos cards
4. **Qualidade**: 0 erros de sintaxe bloqueando execução
5. **Documentação**: Plan atualizado previne erros futuros

### 🚀 Próximos Passos

- [ ] Implementar páginas Strings section (próxima seção conforme plano)
- [ ] Adicionar mesmas funções demo para outras páginas de loops (loops.html, loops_for.html, etc.)
- [ ] Revisar outras páginas para garantir padrão de botões consistente
- [ ] Considerar criar componente reutilizável para botões de navegação

---

**Desenvolvido por Jhonnatan Luiz**  
**Data:** 17 de Novembro de 2025
