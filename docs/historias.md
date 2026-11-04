# Histórias de usuário do NewsFlow

## US01 — Salvar rascunho automaticamente

**Como** redatora
**Quero** que meu texto seja salvo enquanto escrevo
**Para** não perder trabalho quando a conexão cair

**Critérios de aceitação**
- O rascunho é salvo a cada 30 segundos.
- Cada salvamento cria uma versão numerada.
- O sistema mantém as últimas 20 versões.
- Restaurar uma versão não apaga as versões seguintes.
- Uma versão descartada não pode ser restaurada.

**Regras cobertas:** RN01
**Prioridade:** Alta — perder o texto escrito obriga a redatora a refazer a edição inteira.
**Cenários:** features/us01-rascunho.feature

## US02 — Aprovar edição para envio

**Como** revisor
**Quero** aprovar ou reprovar uma edição com um comentário
**Para** garantir que só conteúdo conferido por outra pessoa chegue aos assinantes

**Critérios de aceitação**
- Um revisor pode aprovar uma edição em revisão.
- A autora não pode aprovar a própria edição.
- A reprovação devolve a edição ao rascunho.
- A reprovação exige um comentário.

**Regras cobertas:** RN02
**Prioridade:** Alta — um erro enviado a 40 mil assinantes não pode ser desfeito.
**Cenários:** features/us02-aprovacao.feature

## US03 — Agendar envio de edição aprovada

**Como** gestora
**Quero** agendar, reagendar e cancelar o envio de uma edição aprovada
**Para** que ela chegue na hora certa sem que eu precise acompanhar o disparo

**Critérios de aceitação**
- Só uma edição aprovada pode ser agendada.
- O envio é agendado com no mínimo 15 minutos de antecedência, no fuso America/Sao_Paulo.
- Um disparo pode ser reagendado até 2 vezes.
- Um disparo pode ser cancelado até 5 minutos antes do horário marcado.

**Regras cobertas:** RN03, RN02
**Prioridade:** Alta — sem agendamento, a edição aprovada não chega ao público na hora certa.
**Cenários:** features/us03-agendamento.feature

## US04 — Sair da lista e voltar a ela

**Como** assinante
**Quero** sair da lista com um link e voltar somente com a minha confirmação
**Para** receber newsletters apenas enquanto eu quiser

**Critérios de aceitação**
- Todo e-mail traz o link de descadastro.
- O descadastro tem efeito imediato e é confirmado por e-mail.
- Quem saiu da lista não recebe novas edições.
- O pedido de retorno só vale depois da confirmação por link.
- O link de confirmação vale por 48 horas.

**Regras cobertas:** RN06
**Prioridade:** Média — respeita o consentimento da assinante, mas depende de já haver envios funcionando.
**Cenários:** features/us04-descadastro.feature
