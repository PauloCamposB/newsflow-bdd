# language: pt
Funcionalidade: Agendar envio de edição aprovada
  Como gestora
  Quero agendar, reagendar e cancelar o envio de uma edição aprovada
  Para que ela chegue na hora certa sem que eu precise acompanhar o disparo

  Contexto:
    Dado que são "09:00" do dia "10/03/2027" no fuso de São Paulo
    E que a redatora "Ana" escreveu a edição "Informativo #42"

  @feliz
  Cenário: Agendamento com antecedência suficiente
    Dado que a edição foi aprovada por "Bruno"
    Quando a gestora agenda o envio para daqui a 30 minutos
    Então o disparo deve estar agendado para "10/03/2027" às "09:30"
    E a mensagem exibida deve ser "Envio agendado"

  @limite
  Esquema do Cenário: Antecedência mínima de 15 minutos
    Dado que a edição foi aprovada por "Bruno"
    Quando a gestora agenda o envio para daqui a <minutos> minutos
    Então a mensagem exibida deve ser "<mensagem>"

    Exemplos:
      | minutos | mensagem                               |
      | 60      | Envio agendado                         |
      | 16      | Envio agendado                         |
      | 15      | Envio agendado                         |
      | 14      | O envio precisa de ao menos 15 minutos |
      | 0       | O envio precisa de ao menos 15 minutos |

  @excecao
  Cenário: Edição sem aprovação não pode ser agendada
    Quando a gestora agenda o envio para daqui a 30 minutos
    Então a mensagem exibida deve ser "A edição precisa de aprovação para ser agendada"
    E nenhum disparo deve estar agendado

  @limite
  Esquema do Cenário: Limite de 2 reagendamentos
    Dado que a edição foi aprovada por "Bruno"
    E que o número de reagendamentos do disparo é <vezes>
    Quando a gestora reagenda o envio para daqui a 60 minutos
    Então a mensagem exibida deve ser "<mensagem>"

    Exemplos:
      | vezes | mensagem                          |
      | 0     | Envio reagendado                  |
      | 1     | Envio reagendado                  |
      | 2     | Limite de reagendamentos atingido |

  @limite
  Esquema do Cenário: Cancelamento até 5 minutos antes do envio
    Dado que a edição foi aprovada por "Bruno"
    E que o disparo está marcado para daqui a <minutos> minutos
    Quando a gestora cancela o envio
    Então a mensagem exibida deve ser "<mensagem>"

    Exemplos:
      | minutos | mensagem                                                  |
      | 6       | Envio cancelado                                           |
      | 5       | Envio cancelado                                           |
      | 4       | O cancelamento é permitido até 5 minutos antes do envio   |
