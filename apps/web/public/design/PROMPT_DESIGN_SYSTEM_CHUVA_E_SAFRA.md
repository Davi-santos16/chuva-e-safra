# PROMPT — ADAPTAÇÃO DO TEMPLATE AO DESIGN SYSTEM CHUVA & SAFRA

## Papel

Atue como um **Product Designer Sênior e Front-end Engineer especializado em design systems, acessibilidade, Tailwind CSS, componentes reutilizáveis e dashboards SaaS**.

Sua tarefa é adaptar visualmente o template existente para a identidade oficial da plataforma **Chuva & Safra**, um sistema cearense que relaciona chuva, produção agrícola, produtividade, culturas, safras, propriedades e territórios para apoiar produtores rurais, técnicos de cooperativas, gestores públicos e administradores.

O produto deve transmitir **tecnologia, confiança institucional, clareza de dados e proximidade com o produtor rural**. A ideia-guia da marca é:

> A chuva encontra o território e faz a safra avançar.

## Regra principal: adaptar, não reconstruir

O template já existe e deve ser tratado como base funcional. Antes de editar qualquer arquivo, faça uma auditoria rápida da estrutura atual e identifique:

- stack, versão do Tailwind e biblioteca de componentes utilizadas;
- arquivos globais de CSS e configuração de tema;
- variáveis CSS e tokens já existentes;
- componentes compartilhados;
- cores hardcoded em classes, CSS, SVGs e gráficos;
- estrutura do layout, rotas e responsividade atual;
- implementação de modo claro e escuro, caso exista.

Depois da auditoria, aplique o design system descrito abaixo sem quebrar o template.

### Preserve obrigatoriamente

- Todas as páginas e rotas existentes.
- A estrutura, o conteúdo, os textos e a hierarquia de informação.
- Todas as funcionalidades, eventos, estados e interações.
- Componentes, formulários, tabelas, gráficos e navegação.
- Responsividade existente.
- Dependências e stack atuais.
- APIs públicas dos componentes e nomes de propriedades.

### Não faça

- Não crie backend, banco de dados, API ou autenticação.
- Não remova páginas, seções ou componentes.
- Não reescreva o projeto do zero.
- Não troque a stack nem instale outra biblioteca de UI sem necessidade real.
- Não altere regras de negócio, dados, textos ou fluxos.
- Não substitua componentes funcionais apenas por preferência estética.
- Não aplique cores isoladamente em dezenas de arquivos quando puder usar tokens globais.
- Não use estilos genéricos de fintech, banco, e-commerce ou painel inteiramente verde.
- Não use neon, glassmorphism excessivo, 3D, brilho forte ou gradientes chamativos.
- Não use emojis como ícones de interface.

O objetivo desta tarefa é **mudar a camada visual e consolidar um design system consistente**, mantendo o comportamento atual do template.

---

## 1. Essência visual da marca

A identidade deve equilibrar quatro conceitos:

1. **Chuva:** água, clima, previsão e acompanhamento.
2. **Safra:** cultivo, produtividade, resiliência e resultado.
3. **Território:** o Ceará representado com respeito e sem estereótipos.
4. **Tecnologia:** dados claros, interfaces acessíveis e decisões acionáveis.

Personalidade visual:

- precisa;
- próxima;
- confiável;
- institucional sem ser fria;
- moderna sem parecer futurista;
- regional sem ser caricata;
- orientada por dados;
- acolhedora para usuários com diferentes níveis de familiaridade digital.

Use o **azul como cor principal da experiência**, representando chuva, confiança e tecnologia. Use o verde para produção, safra, crescimento e aprovação. O dourado deve ser um acento controlado para atenção e colheita. Não transforme toda a interface em uma “agtech verde”.

---

## 2. Marca e logos

Use exclusivamente os arquivos oficiais anexados:

- logo horizontal para fundo claro;
- logo horizontal para fundo escuro;
- símbolo isolado da gota;
- demais variações oficiais, quando fornecidas.

O símbolo combina gota, campo, broto e sulco dourado. Não recrie, redesenhe ou substitua esses elementos por ícones genéricos.

### Aplicação

- Use a logo horizontal adequada no header, login, landing page e sidebar expandida.
- Use o símbolo isolado no favicon, sidebar recolhida, avatar institucional e espaços compactos.
- Use a versão correta para o fundo claro ou escuro.
- Largura mínima da logo horizontal no digital: `140px`.
- Tamanho mínimo do símbolo: `24px`.
- Preserve uma área livre ao redor da marca equivalente, no mínimo, à altura da haste do broto.

### Proibições

- Não distorcer, achatar, esticar ou rotacionar.
- Não recolorir partes da marca.
- Não aplicar filtros CSS para “adaptar” a logo ao modo escuro.
- Não aplicar sombra, brilho, contorno ou gradiente.
- Não inserir a marca sobre fundos de baixo contraste ou visualmente confusos.
- Não escrever “Chuva & Safra” com uma fonte qualquer ao lado de uma gota genérica.
- Se algum arquivo oficial não estiver disponível, não invente uma substituição; mantenha o espaço preparado e informe qual asset está faltando.

---

## 3. Paleta oficial

Estas cores são obrigatórias e devem ser centralizadas em tokens:

| Token da marca | Valor | Uso principal |
|---|---:|---|
| Azul Chuva | `#0B6E99` | ação primária, marca, links, chuva, informação |
| Azul Açude | `#084C68` | hover, sidebar, fundos profundos e elementos institucionais |
| Verde Safra | `#2E7D4F` | produção, sucesso, aprovação e confirmação |
| Verde Broto | `#75B84B` | crescimento, destaques e séries secundárias de gráficos |
| Dourado Colheita | `#D8A024` | atenção, acento, colheita e dados que exigem conferência |
| Areia Ceará | `#F3E8D2` | fundos editoriais, blocos acolhedores e destaques suaves |
| Bruma | `#F7FBFA` | fundo principal do sistema no modo claro |
| Tinta | `#153B46` | texto principal e fundos escuros |

Contrastes já definidos pela marca:

- Azul Chuva sobre branco: `5,67:1`.
- Verde Safra sobre branco: `5,05:1`.
- Dourado Colheita com Tinta: `5,14:1`.

### Cores auxiliares de interface

As cores abaixo não substituem a paleta da marca. Elas existem somente para estados semânticos e neutros necessários ao produto:

| Token funcional | Valor | Uso |
|---|---:|---|
| Superfície clara | `#FFFFFF` | cards, popovers e modais no tema claro |
| Azul suave | `#E7F3F7` | seleção, informação discreta e fundos de hover |
| Verde suave | `#E8F3EC` | fundos de sucesso e aprovação |
| Dourado suave | `#FBF3DE` | fundos de atenção |
| Vermelho de estado | `#C84A4A` | erro, recusa e ação destrutiva |
| Vermelho suave | `#FBEAEA` | fundo de mensagens destrutivas |
| Laranja de correção | `#D97706` | correção solicitada e alerta intermediário |
| Borda clara | `#D6E4E1` | separadores e contornos no tema claro |
| Texto secundário | `#577078` | descrições, metadados e labels secundárias |
| Fundo escuro | `#0B2F3A` | background principal no tema escuro |
| Superfície escura | `#123E49` | cards e áreas elevadas no tema escuro |
| Borda escura | `#2B5962` | separadores no tema escuro |
| Texto escuro secundário | `#B8CCCA` | texto secundário no tema escuro |

Não crie novas cores arbitrárias quando um token existente resolver o caso. Tons derivados podem ser usados somente para hover, alpha, gráfico e acessibilidade, sempre preservando a relação perceptiva com a cor oficial.

---

## 4. Tokens semânticos

Mapeie a paleta para os tokens nativos do projeto. Se o template usar shadcn/ui, CSS variables ou Tailwind, atualize a fonte global dos tokens em vez de espalhar valores pelos componentes.

### Tema claro

```css
:root {
  --background: #F7FBFA;
  --foreground: #153B46;

  --card: #FFFFFF;
  --card-foreground: #153B46;
  --popover: #FFFFFF;
  --popover-foreground: #153B46;

  --primary: #0B6E99;
  --primary-foreground: #FFFFFF;
  --primary-hover: #084C68;

  --secondary: #E7F3F7;
  --secondary-foreground: #084C68;
  --muted: #EAF2EF;
  --muted-foreground: #577078;

  --accent: #F3E8D2;
  --accent-foreground: #153B46;

  --success: #2E7D4F;
  --success-foreground: #FFFFFF;
  --success-soft: #E8F3EC;

  --warning: #D8A024;
  --warning-foreground: #153B46;
  --warning-soft: #FBF3DE;

  --destructive: #C84A4A;
  --destructive-foreground: #FFFFFF;
  --destructive-soft: #FBEAEA;

  --border: #D6E4E1;
  --input: #C7D9D4;
  --ring: #0B6E99;

  --sidebar: #084C68;
  --sidebar-foreground: #F7FBFA;
  --sidebar-active: #0B6E99;
  --sidebar-active-foreground: #FFFFFF;
}
```

### Tema escuro

```css
.dark {
  --background: #0B2F3A;
  --foreground: #F7FBFA;

  --card: #123E49;
  --card-foreground: #F7FBFA;
  --popover: #123E49;
  --popover-foreground: #F7FBFA;

  --primary: #0B6E99;
  --primary-foreground: #FFFFFF;
  --primary-hover: #1582AF;

  --secondary: #174B57;
  --secondary-foreground: #F7FBFA;
  --muted: #153B46;
  --muted-foreground: #B8CCCA;

  --accent: #5E4A1C;
  --accent-foreground: #F7FBFA;

  --success: #75B84B;
  --success-foreground: #0B2F3A;
  --success-soft: #1C4B39;

  --warning: #D8A024;
  --warning-foreground: #153B46;
  --warning-soft: #4F421F;

  --destructive: #E06B6B;
  --destructive-foreground: #0B2F3A;
  --destructive-soft: #542F34;

  --border: #2B5962;
  --input: #37666E;
  --ring: #75BFE0;

  --sidebar: #082A34;
  --sidebar-foreground: #F7FBFA;
  --sidebar-active: #0B6E99;
  --sidebar-active-foreground: #FFFFFF;
}
```

Se o sistema atual exigir HSL, RGB ou outro formato, converta os valores corretamente sem alterar a aparência. Preserve os nomes de variáveis que os componentes atuais já consomem; faça o mapeamento, não uma migração desnecessária.

### Regra semântica

- Azul = ação principal, link, chuva e informação.
- Verde = produção, confirmação e aprovação.
- Dourado = atenção e conferência.
- Laranja = correção solicitada ou alerta intermediário.
- Vermelho = recusa, erro ou destruição.
- Cinza/tons neutros = conteúdo inativo, metadados e divisores.

Todo estado deve usar **cor + texto + ícone**, nunca somente cor.

---

## 5. Tipografia

Use as fontes oficiais:

- **Sora** para títulos, headings e números de destaque.
- **Inter** para textos, navegação, formulários, tabelas, labels e botões.

Carregue somente os pesos utilizados:

- Sora: `600` e `700`.
- Inter: `400`, `500` e `600`.

Não use Manrope, Poppins ou fonte genérica como substituta quando Sora e Inter puderem ser carregadas.

### Escala tipográfica

| Estilo | Fonte | Desktop | Mobile | Peso | Line-height |
|---|---|---:|---:|---:|---:|
| Display | Sora | 48px | 36px | 700 | 1.1 |
| H1 | Sora | 40px | 32px | 700 | 1.15 |
| H2 | Sora | 32px | 28px | 700 | 1.2 |
| H3 | Sora | 24px | 22px | 600 | 1.3 |
| H4 | Sora | 20px | 18px | 600 | 1.35 |
| KPI grande | Sora | 32px | 28px | 700 | 1.1 |
| Body grande | Inter | 18px | 17px | 400 | 1.6 |
| Body | Inter | 16px | 16px | 400 | 1.55 |
| Body pequeno | Inter | 14px | 14px | 400 | 1.5 |
| Label | Inter | 14px | 14px | 600 | 1.4 |
| Caption | Inter | 12px | 12px | 500 | 1.4 |
| Botão | Inter | 14–16px | 14–16px | 600 | 1.2 |

Evite textos abaixo de `12px`. Use `font-variant-numeric: tabular-nums` em KPIs, tabelas e séries numéricas quando isso melhorar o alinhamento.

---

## 6. Espaçamento, grid e dimensões

Use uma escala baseada em múltiplos de 4:

```text
4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80 e 96px
```

Diretrizes:

- Container público: largura máxima entre `1200px` e `1280px`.
- Área autenticada: respeitar o grid e a largura atual do template.
- Padding padrão de página: `32px` no desktop, `24px` no tablet e `16px` no mobile.
- Gap padrão entre cards: `24px` no desktop e `16px` no mobile.
- Altura mínima de botões e campos: `44px`.
- Áreas clicáveis: no mínimo `44 × 44px` quando possível.
- Cards devem ter respiro suficiente, sem perder a densidade necessária para dashboards.

Breakpoints devem seguir os já configurados no template. Não crie uma segunda estratégia de responsividade. Como referência de QA, verifique `375px`, `430px`, `768px`, `1280px` e `1440px`.

---

## 7. Bordas, raios e sombras

### Raios

```css
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-xl: 20px;
--radius-full: 9999px;
```

- Campos e botões: `10–12px`.
- Cards e painéis: `12–16px`.
- Modais e drawers: `16–20px`.
- Badges e avatares: raio total quando fizer sentido.

### Bordas

- Use borda de `1px` com o token `border` para separar superfícies.
- Não desenhe contornos pesados em todos os elementos.
- Cards interativos podem ganhar borda Azul Chuva no hover/focus.

### Sombras

Use sombras suaves e discretas. A separação deve depender primeiro de superfície e borda, não de sombra forte.

```css
--shadow-sm: 0 1px 2px rgb(21 59 70 / 0.06);
--shadow-md: 0 8px 24px rgb(21 59 70 / 0.08);
--shadow-lg: 0 18px 48px rgb(8 76 104 / 0.12);
```

No tema escuro, reduza sombras e use bordas/superfícies para mostrar elevação.

---

## 8. Componentes

Adapte os componentes existentes para estas regras. Não duplique componentes que já fazem parte do template.

### Botões

- **Primário:** fundo Azul Chuva, texto branco, hover Azul Açude.
- **Secundário:** fundo Azul suave, texto Azul Açude, hover um tom mais intenso.
- **Outline:** fundo transparente, borda Azul Chuva, texto Azul Chuva.
- **Ghost:** fundo transparente; hover Azul suave no claro e superfície elevada no escuro.
- **Sucesso/aprovação:** Verde Safra, apenas quando a semântica justificar.
- **Destrutivo/recusa:** vermelho funcional, nunca Azul ou Verde.
- **Link:** Azul Chuva, sublinhado no hover e foco claramente visível.
- Estados obrigatórios: default, hover, active, focus-visible, disabled e loading.

Não use dourado como botão primário. Não pinte todos os CTAs de verde.

### Campos e formulários

- Label permanente acima do campo; placeholder não substitui label.
- Fundo branco no claro e superfície escura no dark.
- Borda neutra no repouso.
- Focus: ring Azul Chuva de `2px` com offset visível.
- Erro: borda vermelha, ícone e mensagem textual próxima ao campo.
- Sucesso: indicador discreto em Verde Safra.
- Disabled: contraste legível, cursor e opacidade coerentes.
- Preserve máscaras, validações e interações existentes.

### Cards

- Superfície branca no tema claro e superfície escura no dark.
- Borda fina, raio de `16px` e sombra discreta.
- Hierarquia: título, valor/conteúdo, contexto e ação.
- KPIs: número em Sora Bold, label em Inter e variação com ícone + texto.
- Evite uma cor forte como fundo de todos os cards.
- Use cards coloridos apenas para destaques realmente importantes.

### Navegação, sidebar e topbar

- Sidebar preferencialmente em Azul Açude ou no fundo profundo definido pelo tema.
- Item ativo com Azul Chuva, contraste alto, ícone e rótulo.
- Hover discreto e consistente.
- Sidebar recolhida deve usar o símbolo oficial da gota.
- Topbar deve ser limpa, com separação por borda e hierarquia clara.
- Breadcrumbs usam texto secundário e destacam a página atual em Tinta/foreground.

### Tabelas

- Cabeçalho com fundo neutro sutil, Inter SemiBold e contraste adequado.
- Linhas separadas por borda leve; zebra striping somente se o template já utilizar e melhorar a leitura.
- Hover de linha em Azul suave com intensidade baixa.
- Números alinhados de forma consistente e com unidades visíveis.
- Ações de linha devem permanecer acessíveis por teclado.
- Preserve scroll horizontal responsivo e paginação existentes.

### Badges e status

- `PENDENTE`: Dourado Colheita + ícone de relógio + texto.
- `EM ANÁLISE`: Azul Chuva + ícone informativo + texto.
- `APROVADO` ou `ATIVO`: Verde Safra + ícone de confirmação + texto.
- `RECUSADO`: Vermelho funcional + ícone de recusa + texto.
- `CORREÇÃO SOLICITADA`: Laranja funcional + ícone de atenção + texto.
- `INATIVO`: neutro + texto.

Use fundos suaves e texto/ícone em tonalidade de alto contraste. Não use badge apenas como círculo colorido.

### Alertas, toasts e feedback

- Informação: Azul Chuva.
- Sucesso: Verde Safra.
- Atenção: Dourado Colheita com texto Tinta.
- Erro: Vermelho funcional.
- Todos devem ter ícone, título curto, mensagem e ação de fechar quando aplicável.

### Modais, drawers, dropdowns e popovers

- Superfície sólida e legível; nada de transparência excessiva.
- Título e descrição claros.
- Overlay discreto.
- Foco deve ficar preso no componente e retornar ao elemento de origem ao fechar.
- Ações primária e secundária devem ter hierarquia evidente.

### Tabs, accordion e paginação

- Estado ativo em Azul Chuva, com texto e indicador visual.
- Hover e foco devem ser diferentes do ativo.
- Não depender apenas de uma linha fina e pouco contrastante.

### Estados de tela

Padronize:

- loading com skeleton discreto;
- vazio com ícone simples, título, explicação e CTA quando existir;
- erro com mensagem útil e opção de tentar novamente;
- sem resultado com filtros ativos visíveis e ação de limpar;
- sucesso com confirmação textual;
- disabled sem parecer quebrado.

---

## 9. Gráficos e visualização de dados

Preserve a biblioteca de gráficos já instalada e apenas adapte o tema.

Paleta recomendada:

- chuva e precipitação: Azul Chuva `#0B6E99`;
- segunda série de chuva: azul derivado acessível;
- produção e produtividade: Verde Safra `#2E7D4F`;
- crescimento ou série complementar: Verde Broto `#75B84B`;
- atenção: Dourado Colheita `#D8A024`;
- risco crítico: Vermelho funcional `#C84A4A`;
- série neutra: Texto secundário `#577078`.

Regras:

- Não use cores aleatórias a cada gráfico.
- Não use gráficos 3D.
- Eixos, grid e labels devem ficar legíveis nos dois temas.
- Tooltip deve mostrar título, valor, unidade e período.
- Sempre exiba legenda quando houver mais de uma série.
- Não dependa somente da cor para diferenciar séries; use legenda, marcador, padrão de linha ou rótulo.
- Use barras para comparações, linha para evolução, área para acumulados, scatter para correlação e donut apenas para composições simples.
- Mantenha o Dourado restrito à atenção ou a uma série relevante, sem competir com a ação principal.
- Garanta resumo textual ou alternativa acessível para informações essenciais do gráfico.

---

## 10. Iconografia, grafismos e imagens

### Ícones

- Preserve a biblioteca de ícones existente; se o template já usa Lucide, continue com ela.
- Traço simples, cantos arredondados e espessura uniforme.
- Ícones devem explicar ações, não decorar.
- Tamanho padrão: `16px`, `18px`, `20px` ou `24px` conforme o contexto.
- Ícones isolados precisam de tooltip e nome acessível.

### Grafismos

Use com moderação curvas inspiradas em:

- relevo e território;
- ritmo da chuva;
- sulcos da lavoura;
- ciclos de safra.

Esses grafismos podem aparecer em hero sections, fundos editoriais, divisores e empty states. Não devem reduzir a leitura dos dados.

### Fotografia

Quando o template usar imagens, priorize:

- pessoas reais;
- agricultura cearense e pequenas propriedades;
- lavoura, chuva e tecnologia em uso;
- luz natural;
- contexto regional respeitoso.

Evite seca extrema como clichê, imagens genéricas de grandes monoculturas, verde artificialmente saturado e cenas com aparência de banco de imagens estrangeiro.

---

## 11. Landing page versus sistema autenticado

### Páginas públicas

- Podem usar mais Areia Ceará, grafismos de território, fotografia e composições editoriais.
- Hero pode combinar Azul Açude, Bruma e detalhes em Dourado/Verde.
- Gradiente, se já existir, deve ser sutil e derivado apenas das cores oficiais.
- CTAs primários permanecem em Azul Chuva.

### Dashboard e áreas autenticadas

- Priorize Bruma no fundo e branco nas superfícies no tema claro.
- No dark, priorize Fundo escuro e Superfície escura.
- Mantenha alta legibilidade e densidade equilibrada.
- Use cor para hierarquia e significado, não para decorar cada bloco.
- Sidebar pode ter presença institucional mais forte; conteúdo deve permanecer leve.

---

## 12. Modo claro e escuro

- Preserve o mecanismo atual de tema.
- Se o template já possui alternância, mantenha seu comportamento e troque apenas os tokens.
- Caso o template não possua modo escuro, não implemente um novo nesta tarefa, a menos que isso tenha sido solicitado separadamente; deixe os tokens dark preparados sem ampliar o escopo funcional.
- Use automaticamente a logo oficial adequada a cada tema quando os arquivos estiverem presentes.
- Não inverta imagens nem use `filter: brightness()` para falsificar uma versão da marca.
- Verifique cards, tabelas, gráficos, modais, dropdowns, tooltips, inputs, hover, focus, disabled e estados semânticos nos dois temas.

---

## 13. Movimento

- Duração padrão: `150–250ms`.
- Use `ease-out` em entradas e `ease-in-out` em mudanças de estado.
- Animações devem comunicar interação: hover, abertura de modal, drawer, accordion, toast e mudança de aba.
- Não anime todos os cards ao carregar se isso atrasar a leitura.
- Respeite `prefers-reduced-motion`.
- Não use parallax pesado, bounce excessivo ou transições longas.

---

## 14. Acessibilidade obrigatória

- Manter contraste mínimo WCAG AA.
- Foco de teclado visível com ring Azul Chuva ou equivalente acessível no tema escuro.
- Labels reais em todos os campos.
- Placeholder nunca deve ser o único rótulo.
- Status e riscos devem usar texto/ícone além da cor.
- Botões com apenas ícone devem ter nome acessível e tooltip.
- Estados de hover, focus, active e disabled precisam ser distinguíveis.
- Respeitar navegação por teclado e ordem lógica de foco.
- Garantir alvo de toque confortável.
- Não remover outlines sem fornecer uma alternativa melhor.
- Verificar contraste de texto secundário, bordas, gráficos e conteúdo desabilitado.
- Não usar Dourado com texto branco; use Tinta sobre Dourado.

---

## 15. Estratégia de implementação

Execute nesta ordem:

1. Audite o template e localize a fonte de verdade do tema.
2. Registre brevemente quais arquivos e tokens serão alterados.
3. Crie ou atualize os tokens globais da marca.
4. Mapeie os tokens semânticos do template para a nova paleta.
5. Configure Sora e Inter sem carregar pesos desnecessários.
6. Atualize os componentes-base compartilhados.
7. Remova gradualmente cores hardcoded, substituindo-as por tokens.
8. Adapte gráficos, ícones e estados semânticos.
9. Aplique as logos oficiais nos pontos corretos.
10. Revise páginas públicas e autenticadas.
11. Teste modo claro/escuro, se já suportado.
12. Teste responsividade e acessibilidade.
13. Execute o lint/build/testes já existentes e corrija apenas regressões causadas por esta adaptação.

### Regras técnicas

- Mantenha uma única fonte de verdade para cores, raio, sombra e tipografia.
- Reaproveite tokens nativos como `background`, `foreground`, `primary`, `secondary`, `muted`, `accent`, `border`, `input`, `ring` e `destructive`.
- Em Tailwind, prefira classes semânticas como `bg-primary` e `text-foreground` em vez de `bg-[#0B6E99]` espalhado pelos componentes.
- Valores hexadecimais podem permanecer apenas na definição central dos tokens, em assets específicos e em configurações de gráficos que não consumam CSS variables.
- Preserve a compatibilidade com a versão atual do Tailwind; não migre versão só para aplicar o tema.
- Preserve componentes shadcn/ui existentes e personalize-os pelos tokens e variantes atuais.
- Não crie componentes duplicados como `ButtonNew`, `CardV2` ou `NewInput` se os atuais puderem ser ajustados.
- Não altere a estrutura do DOM sem necessidade, principalmente onde isso possa afetar testes, seletores ou acessibilidade.
- Não introduza erros de TypeScript, lint ou build.

---

## 16. Critérios de aceite

Considere a adaptação concluída somente quando:

- a paleta oficial estiver centralizada e aplicada consistentemente;
- Azul Chuva for a ação principal do produto;
- Verde for usado principalmente para safra, produção e aprovação;
- Dourado estiver limitado a atenção e acentos relevantes;
- Sora estiver aplicada a títulos/KPIs e Inter ao restante da interface;
- logos oficiais estiverem corretas nos contextos claro, escuro e compacto;
- nenhum logo tiver sido redesenhado, filtrado ou distorcido;
- componentes compartilhados estiverem visualmente coerentes;
- tabelas, formulários, cards, modais, badges, toasts e gráficos seguirem o mesmo sistema;
- hover, focus, active, disabled, loading, vazio, erro e sucesso estiverem tratados;
- a interface permanecer responsiva;
- contraste e foco de teclado atenderem WCAG AA;
- todas as rotas, textos, dados e funcionalidades originais continuarem funcionando;
- não houver uma mistura perceptível entre o tema antigo e o Chuva & Safra;
- não existirem cores hardcoded desnecessárias fora da fonte central de tokens;
- o build e as verificações existentes passarem sem regressões causadas pela mudança.

## Entrega esperada

Ao terminar:

1. Implemente a adaptação diretamente no template.
2. Apresente um resumo curto dos arquivos alterados.
3. Liste os tokens principais criados ou atualizados.
4. Confirme que rotas e funcionalidades foram preservadas.
5. Informe qualquer asset oficial que não tenha sido fornecido e, por isso, não pôde ser aplicado.
6. Não sugira backend, banco de dados ou novas funcionalidades nesta tarefa.

**Agora adapte o template existente ao design system oficial do Chuva & Safra seguindo integralmente essas instruções.**
