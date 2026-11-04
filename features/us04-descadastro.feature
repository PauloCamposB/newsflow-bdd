# language: pt
Funcionalidade: Sair da lista e voltar a ela
  Como assinante
  Quero sair da lista com um link e voltar somente com a minha confirmação
  Para receber newsletters apenas enquanto eu quiser

  Contexto:
    Dado que a assinante "maria@exemplo.com" está na lista

  @feliz
  Cenário: Todo e-mail traz o link de descadastro
    Quando o NewsFlow envia a edição "Informativo #42"
    Então a assinante deve receber a edição "Informativo #42"
    E o e-mail recebido deve trazer o link de descadastro

  @feliz
  Cenário: Descadastro tem efeito imediato e é confirmado por e-mail
    Quando a assinante usa o link de descadastro
    Então a assinante deve estar "fora da lista"
    E a assinante deve receber o aviso "Descadastro confirmado"

  @excecao
  Cenário: Quem saiu da lista não recebe novas edições
    Dado que a assinante usou o link de descadastro
    Quando o NewsFlow envia a edição "Informativo #43"
    Então a assinante não deve receber a edição "Informativo #43"

  @alternativo
  Cenário: Pedido de retorno aguarda a confirmação da assinante
    Dado que a assinante usou o link de descadastro
    Quando a assinante pede para voltar à lista
    Então a assinante deve estar "fora da lista"
    E a assinante deve receber o aviso "Confirme seu retorno à lista"

  @limite
  Esquema do Cenário: Link de confirmação válido por 48 horas
    Dado que a assinante usou o link de descadastro
    E que a assinante pediu para voltar à lista
    Quando a assinante usa o link de confirmação depois de <horas> horas
    Então a mensagem exibida deve ser "<mensagem>"
    E a assinante deve estar "<situacao>"

    Exemplos:
      | horas | mensagem                       | situacao      |
      | 47    | Retorno à lista confirmado     | na lista      |
      | 48    | Retorno à lista confirmado     | na lista      |
      | 49    | O link de confirmação expirou  | fora da lista |
