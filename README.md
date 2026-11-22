# Truco Paulista - JavaScript

Conversão da **Atividade 02 Extra** originalmente implementada em Java com Maven e JUnit 5.

## Requisitos

- Node.js instalado (versão 18 ou superior recomendada).

## Como executar

Abra o terminal dentro da pasta do projeto e rode:

```bash
npm test
```

Para abrir o menu:

```bash
npm start
```

## Estrutura

- `src/Carta.js`: valores, naipes e comparação de cartas/manilhas.
- `src/Truco.js`: regras da partida, vazas, truco e pontuação.
- `src/MenuTestes.js`: menu para consultar os casos de teste.
- `src/Main.js`: inicia o menu.
- `test/Truco.test.js`: os 20 casos de teste convertidos para o test runner nativo do Node.js.

## Observação

A conversão mantém o comportamento da implementação Java enviada. O menu informa os comandos para executar os testes; a execução automatizada é feita pelo `node --test` através de `npm test`.
