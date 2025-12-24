# Changelog - Site JavaScript Tutorial

## [2025-12-24] - RegExp (Basic)

### ✨ Novas Páginas (8)
- basic/regexp_flags.html (Novo)
- basic/regexp_characters.html (Novo)
- basic/regexp_meta_characters.html (Novo)
- basic/regexp_assertions.html (Novo)
- basic/regexp_quantifiers.html (Novo)
- basic/regexp_patterns.html (Novo)
- basic/regexp_objects.html (Novo)
- basic/regexp_methods.html (Novo)

### ♻️ Página Reescrita (1)
- basic/regexp.html (Reescrito) - migrado do placeholder legado para o padrão Tailwind + demos

### 🏠 index.html
- Cards adicionados logo após "RegExp": Flags, Characters, Meta Characters, Assertions, Quantifiers, Patterns, Objects, Methods

### 📦 JavaScript (script.js)
- Novas demos externas:
  - RegExp: regexp_demo1-4
  - RegExp Flags: regexpFlags_demo1-4
  - RegExp Characters: regexpChars_demo1-4
  - RegExp Meta Characters: regexpMeta_demo1-4
  - RegExp Assertions: regexpAssertions_demo1-4
  - RegExp Quantifiers: regexpQuant_demo1-4
  - RegExp Patterns: regexpPatterns_demo1-4
  - RegExp Objects: regexpObjects_demo1-4
  - RegExp Methods: regexpMethods_demo1-4

### 🧭 Sidebars
- Sidebars das páginas da trilha (Maps → Math) atualizadas para incluir: RegExp e subpáginas

## [2025-12-24] - Math, Random & Math Reference (Basic)

### ✨ Novas Páginas (2)
- basic/random.html (Novo)
- basic/math_reference.html (Novo)

### ♻️ Página Reescrita (1)
- basic/math.html (Reescrito) - migrado do placeholder legado para o padrão Tailwind + demos

### 🏠 index.html
- Cards adicionados logo após "Math": Random, Math Reference

### 📦 JavaScript (script.js)
- Novas demos externas:
  - Math: math_demo1-4
  - Random: random_demo1-4
  - Math Reference: mathRef_demo1-4

### 🔗 Navegação (Bottom Navigation)
- Sequência atualizada: Map Reference → Iterations → Looping → Iterables → Iterators → Generators → Math → Random → Math Reference → RegExp

### 🧭 Sidebars
- Sidebars das páginas da trilha (Maps → Math) atualizadas para incluir: Random e Math Reference

## [2025-12-16] - Maps & Iterations (Basic) adicionados

### ✨ Novas Páginas (5)
- basic/maps.html (Reescrito)
- basic/map_methods.html (Novo)
- basic/map_weak.html (Novo)
- basic/map_reference.html (Novo)
- basic/iterations.html (Novo)

### 🏠 index.html
- Cards adicionados após "Maps" e antes de "Math": Map Methods, WeakMap, Map Reference, Iterations

### 📦 JavaScript (script.js)
- Novas demos externas:
  - Maps: maps_demo1-4
  - Map Methods: mapMethods_demo1-4
  - WeakMap: weakMap_demo1-4
  - Map Reference: mapReference_demo1-3
  - Iterations: iterations_demo1-4

### 🔗 Navegação (Bottom Navigation)
- Sequência atualizada: Set Reference → Maps → Map Methods → WeakMap → Map Reference → Iterations → Math

## [2025-12-11] - Sets & Array Buffers Section Completa

### ✨ Novas Páginas (6 páginas, ~2200 linhas, 43 exemplos)

#### basic/array_buffers.html (Novo)
- **Conteúdo completo** sobre ArrayBuffer e DataView para manipulação de dados binários
- **7 exemplos interativos** funcionais:
  - Demo 1: Criação de ArrayBuffer de 16 bytes
  - Demo 2: DataView básico com setInt32/getInt32
  - Demo 3: Múltiplos tipos de dados (Float32, Int8)
  - Demo 4: Manipulação de bytes individuais
  - Demo 5: ArrayBuffer com Typed Array views
  - Demo 6: Método slice() para copiar buffers
  - Demo 7: Caso prático - Armazenar cor RGB
- **Tabela de métodos DataView** (8 get/set methods)
- **Grade de casos de uso**: WebGL, File APIs, Web Audio, WebSockets
- **Navegação**: typed_reference.html ← → sets.html

#### basic/sets.html (Reescrito)
- **Introdução completa** a JavaScript Sets (ES6)
- **9 exemplos interativos** sobre Sets:
  - Demo 1: Criar Set vazio com add()
  - Demo 2: Criar Set de array
  - Demo 3: Adicionar valores (duplicatas ignoradas)
  - Demo 4: Método has() para verificar existência
  - Demo 5: forEach() para iterar
  - Demo 6: for...of para loops
  - Demo 7: Iterator values()
  - Demo 8: Remover duplicatas de array
  - Demo 9: Set com tipos diferentes
- **Tabela Set vs Array** (6 características)
- **Tabela de métodos essenciais** (8 métodos)
- **Navegação**: array_buffers.html ← → set_methods.html

#### basic/set_methods.html (Novo)
- **Tutorial detalhado** sobre métodos de Set
- **8 exemplos práticos**:
  - Demo 1: Encadeamento com add()
  - Demo 2: delete() removendo elementos
  - Demo 3: clear() limpando Set
  - Demo 4: has() verificação O(1)
  - Demo 5: values() iterator
  - Demo 6: keys() (idêntico a values)
  - Demo 7: entries() pares [valor, valor]
  - Demo 8: forEach() com callback
- **Tabela de referência de métodos** (8 métodos com descrições e retornos)
- **Explicação da propriedade size**
- **Navegação**: sets.html ← → set_logic.html

#### basic/set_logic.html (Novo)
- **Operações lógicas de conjuntos** com diagramas visuais
- **8 exemplos de operações**:
  - Demo 1: União (∪) com spread operator
  - Demo 2: Interseção (∩) com filter+has
  - Demo 3: Diferença (-) elementos em A mas não em B
  - Demo 4: Diferença simétrica (⊕)
  - Demo 5: Subconjunto (⊆) verificação
  - Demo 6: Superconjunto (⊇) verificação
  - Demo 7: Conjuntos disjuntos (∅)
  - Demo 8: Caso prático - Usuários online/premium
- **Diagramas de Venn ASCII** para cada operação
- **Tabela resumo** com símbolos matemáticos e resultados
- **Navegação**: set_methods.html ← → set_weak.html

#### basic/set_weak.html (Novo)
- **Tutorial completo sobre WeakSets**
- **6 exemplos práticos**:
  - Demo 1: Criação básica de WeakSet
  - Demo 2: Restrição apenas objetos (erro com primitivos)
  - Demo 3: Garbage collection demonstration
  - Demo 4: Métodos disponíveis (add, has, delete)
  - Demo 5: Rastreamento de elementos processados
  - Demo 6: Set vs WeakSet gerenciamento de memória
- **Tabela comparativa WeakSet vs Set** (6 características)
- **Grade de casos de uso**: quando usar e não usar
- **Navegação**: set_logic.html ← → set_reference.html

#### basic/set_reference.html (Novo)
- **Referência completa** de Set e WeakSet
- **5 exemplos de referência**:
  - Demo 1: Construtor Set (vazio, array, string)
  - Demo 2: Propriedade size
  - Demo 3: Todos os métodos em ação
  - Demo 4: WeakSet básico
  - Demo 5: Cheat sheet rápido
- **Tabela de propriedades do Set** (size)
- **Tabela de métodos Set** (8 métodos com descrições completas)
- **Tabela de métodos WeakSet** (3 métodos)
- **Tabela Set vs WeakSet** comparação completa (8 features)
- **Navegação**: set_weak.html ← → maps.html

### 🎨 Recursos Visuais
- **Diagramas de Venn** para operações de conjuntos (união, interseção, diferença, diferença simétrica)
- **Gradientes únicos por página**:
  - Array Buffers: red-pink
  - Sets: blue-indigo
  - Set Methods: purple-pink
  - Set Logic: green-teal
  - WeakSets: orange-amber
  - Set Reference: teal-cyan
- **Tabelas de compatibilidade** consistentes para todos os navegadores
- **Ícones** específicos: 🔢 Array Buffers, 🔗 Sets, ⚙️ Set Methods, 🔄 Set Logic, ♻️ WeakSets, 📖 Set Reference

### 📦 JavaScript (script.js)
- **43 novas funções demo** adicionadas:
  - arrayBuffers_demo1-7 (ArrayBuffer, DataView, RGB colors)
  - sets_demo1-9 (criação, iteração, deduplicação)
  - setMethods_demo1-8 (add, delete, has, clear, forEach)
  - setLogic_demo1-8 (união, interseção, diferença, subset)
  - setWeak_demo1-6 (WeakSet, garbage collection, tracking)
  - setReference_demo1-5 (construtor, API completa)
- **Funções auxiliares** para operações de conjuntos: union(), intersection(), difference(), symmetricDifference(), isSubset(), isSuperset(), isDisjoint()

### 🏠 index.html
- **6 novos cards** adicionados ao grid:
  - 🔢 Array Buffers (border-red-500)
  - 🔗 Sets (border-blue-500, reposicionado)
  - ⚙️ Set Methods (border-purple-500)
  - 🔄 Set Logic (border-green-500)
  - ♻️ WeakSets (border-orange-500)
  - 📖 Set Reference (border-teal-500)

### 📚 Documentação
- **plan-conditionalPages.prompt.md** atualizado com Phase 11: Sets & Buffers Section
- **README.md** atualizado:
  - Seção "Sets & Array Buffers (6 páginas)" adicionada
  - Status: 58 de 58 páginas implementadas
  - Tabela de cards atualizada com 6 novos emojis
- **CHANGELOG.md** atualizado com esta entrada completa

### 🎯 Benefícios
- **ES6 Sets Coverage**: Cobertura completa de Sets para coleções de valores únicos
- **Binary Data Manipulation**: ArrayBuffer e DataView para trabalhar com dados binários
- **Set Operations**: Implementações de operações de teoria dos conjuntos (união, interseção, diferença)
- **Memory Management**: WeakSets para rastreamento de objetos sem vazamento de memória
- **Visual Learning**: Diagramas de Venn facilitam compreensão de operações lógicas
- **Performance**: Explicação de complexidade O(1) para has() em Sets

### 🔗 Links das Páginas
- [basic/array_buffers.html](basic/array_buffers.html)
- [basic/sets.html](basic/sets.html)
- [basic/set_methods.html](basic/set_methods.html)
- [basic/set_logic.html](basic/set_logic.html)
- [basic/set_weak.html](basic/set_weak.html)
- [basic/set_reference.html](basic/set_reference.html)

---

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
