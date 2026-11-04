# language: pt
Funcionalidade: Salvar rascunho automaticamente
  Como redatora
  Quero que meu texto seja salvo enquanto escrevo
  Para não perder trabalho quando a conexão cair

  Contexto:
    Dado que a redatora "Ana" escreveu a edição "Informativo #42"

  @feliz
  Cenário: Salvamento automático cria uma versão numerada
    Dado que a redatora alterou o texto para "Novidades de março"
    Quando passam 30 segundos
    Então o total de versões disponíveis deve ser 1
    E a versão 1 deve conter o texto "Novidades de março"

  @limite
  Esquema do Cenário: Intervalo de 30 segundos entre salvamentos
    Quando passam <segundos> segundos
    Então o total de versões disponíveis deve ser <versoes>

    Exemplos:
      | segundos | versoes |
      | 29       | 0       |
      | 30       | 1       |
      | 59       | 1       |
      | 60       | 2       |

  @limite
  Esquema do Cenário: Retenção das últimas 20 versões
    Dado que a edição já passou por <salvamentos> salvamentos
    Quando passam 30 segundos
    Então o total de versões disponíveis deve ser <disponiveis>
    E a versão mais antiga disponível deve ser a <mais_antiga>

    Exemplos:
      | salvamentos | disponiveis | mais_antiga |
      | 18          | 19          | 1           |
      | 19          | 20          | 1           |
      | 20          | 20          | 2           |

  @feliz
  Cenário: Restaurar uma versão não apaga as versões seguintes
    Dado que a edição já passou por 5 salvamentos
    Quando a redatora restaura a versão 3
    Então o texto atual da edição deve ser "Texto do salvamento 3"
    E o total de versões disponíveis deve ser 5

  @excecao
  Cenário: Versão descartada não pode ser restaurada
    Dado que a edição já passou por 21 salvamentos
    Quando a redatora restaura a versão 1
    Então a mensagem exibida deve ser "Esta versão não está mais disponível"
    E o texto atual da edição deve ser "Texto do salvamento 21"
