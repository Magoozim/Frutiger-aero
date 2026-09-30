[README.md](https://github.com/user-attachments/files/32878065/README.md)
# 🌐 Nimbus

Um chat que parece ter saído direto de 2008 — só que funcional de verdade.

Nimbus é um projeto pessoal onde resolvi trazer de volta o **Frutiger Aero**, aquela estética vidrada, azulzinha e meio nostálgica do Windows Vista/7, e construir em cima dela um app de mensagens completo: contatos, grupos, notas, calendário, tudo isso rodando só com HTML, CSS e JavaScript puro — sem framework nenhum, sem biblioteca de UI, nada.

Não é um clone de nada específico. É um app apenas como teste, mas que virou algo maior, e ainda com identidade propria

## O que dá pra fazer hoje

- 💬 **Conversar** com contatos e grupos, cada um com o próprio histórico de mensagens
- 👥 **Criar grupos**, selecionando vários contatos de uma vez (parecido com WhatsApp, mas do meu jeito)
- 📝 **Notas rápidas**, com edição, exclusão e expandir/recolher texto longo
- 📅 Um painel de widgets com **relógio**, **calendário** e notas, deslizando entre si
- 🔍 Busca de contato em tempo real
- 💾 Tudo fica salvo — fecha a aba, recarrega, os dados continuam lá
- 📱 Funciona tanto no desktop quanto no celular, com layouts pensados separadamente pros dois

E sim, tem uns easter eggs escondidos no campo de notas. Não vou entregar quais são.

## 🚀 Novidades da v1.1 — o Remaster

Essa versão não foi um punhado de correções. Foi eu reescrever a fundação inteira do app depois de aprender coisa nova no meio do caminho, e perceber que a versão anterior tinha sido construída em cima de uma base que não ia aguentar crescer.

**A limpeza de arquitetura**
A versão anterior controlava tudo com uma pilha de classes soltas no `body` (`chat`, `widget`, `nota`, `calendario`, `musica`, `inputnota`, `inputcontato`... a lista era grande) — cada uma precisando ser ligada e desligada manualmente em vários lugares do código. Bastava esquecer de tirar uma classe num canto pra travar o app inteiro em um estado errado. Troquei isso por um sistema bem mais enxuto: um atributo (`data-widget`) e duas variáveis CSS (`--eixo-x`, `--modo-chat`) que decidem tudo — inclusive a animação de deslizar entre relógio, calendário e notas, que hoje é **uma fórmula matemática só**, em vez de uma regra de CSS escrita à mão pra cada combinação possível.

**Formulários viraram `<dialog>`**
Criar nota, adicionar contato, criar grupo, mandar mensagem rápida — antes, tudo isso dividia o mesmo formulário genérico escondido dentro da barra lateral, mostrando e escondendo campo por campo na marra. Agora cada um é seu próprio `<dialog>` nativo do navegador: abre por cima de tudo, fecha com Esc, e valida os campos sozinho (com `required` de verdade, não `if` contando caractere).

**Itens deixaram de ser desenhados na mão**
Contato, nota, item de lista — cada um tinha uma sequência de `createElement`/`appendChild` construindo a estrutura inteira em JavaScript. Agora existe um `<template>` no HTML pra cada um, e o JavaScript só clona e preenche o dado. Menos código, e a estrutura fica visível em HTML, não escondida em 20 linhas de JS.

**Grupos (novidade de verdade)**
Antes só dava pra conversar com contatos individuais. Agora dá pra criar um grupo, escolher vários contatos de uma vez e conversar com todos ao mesmo tempo — com o mesmo motor de mensagens de sempre por trás, sem duplicar lógica nenhuma.

**Os dados agora ficam de verdade**
Antes, recarregar a página apagava tudo. Agora contatos, grupos, mensagens e notas são salvos no `localStorage` — sai e volta, seus dados continuam lá.

**Código organizado em módulos**
`main.js` e `EasterEgg.js` agora são módulos ES de verdade (`import`/`export`), em vez de dois scripts soltos torcendo pra compartilhar variável global.

## 🛠️ Feito com

- HTML5 (`<dialog>`, `<template>`, `popover`, validação nativa de formulário)
- CSS3 (variáveis customizadas, Grid, Flexbox, `:has()`)
- JavaScript puro (ES Modules, sem framework)
- `localStorage` pra persistência

Nenhuma dependência externa, nenhum `npm install`.

## 🔮 O que vem por aí

Essa versão fechou o ciclo do front-end puro. O próximo passo é dar vida de verdade pro Nimbus: back-end, banco de dados, contas de usuário de verdade — sair do "salva só nesse navegador" pro "salva de verdade, em qualquer lugar". Bora.

---

Feito por [Magoozim](https://youtube.com/@Magoozim_games) — apenas um criador de conteudo de games que sonha em ser programador e criador de conteudo, que tal algum dia eu tambem começar a fazer videos dos meus projetos? Se quiser acompanhar a saga toda do Magoozim, da uma olhada no meu canal 
