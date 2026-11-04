# NewsFlow BDD

Histórias de usuário, cenários Gherkin e testes com Cucumber.js para o NewsFlow.

## Como rodar

```bash
npm install
npm test
npm run test:dry
```

O relatório é gerado em `relatorios/cucumber-report.html`.

## Histórias

| ID | História | Regras |
|----|----------|--------|
| US01 | Salvar rascunho automaticamente | RN01 |
| US02 | Aprovar edição para envio | RN02 |
| US03 | Agendar envio de edição aprovada | RN03, RN02 |
| US04 | Sair da lista e voltar a ela | RN06 |

Detalhes em `docs/historias.md`.

## Fora de escopo

- **RN04 (Segmentação):** ficou de fora porque agendar uma edição aprovada já entrega valor sem filtrar o público, e os segmentos caberiam em uma história própria.
- **RN05 (Frequência):** ficou de fora porque limitar envios por semana só faz diferença depois que os disparos já estão funcionando.
- **RN07 (Falha de entrega):** ficou de fora porque tentativas e bounces são tratamento de operação e dependem de um serviço real de e-mail.
- **RN08 (Notificação):** ficou de fora porque as quatro histórias escolhidas tratam da newsletter por e-mail, não de notificações push.

## Saída de `npm test`

```text

> newsflow-bdd@1.0.0 test
> cucumber-js

.........................................................................................................................................................................

34 scenarios (34 passed)
169 steps (169 passed)
0m00.057s (executing steps: 0m00.007s)

```
