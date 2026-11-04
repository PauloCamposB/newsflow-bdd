# language: pt
Funcionalidade: Aprovar edição para envio
  Como revisor
  Quero aprovar ou reprovar uma edição com um comentário
  Para garantir que só conteúdo conferido por outra pessoa chegue aos assinantes

  Contexto:
    Dado que a redatora "Ana" escreveu a edição "Informativo #42"
    E que a edição está em revisão

  @feliz
  Cenário: Revisor aprova a edição de outra pessoa
    Quando "Bruno" aprova a edição
    Então a edição deve ficar com a situação "aprovada"
    E a mensagem exibida deve ser "Edição aprovada"

  @excecao
  Cenário: Autora não aprova a própria edição
    Quando "Ana" aprova a edição
    Então a mensagem exibida deve ser "A autora não pode aprovar a própria edição"
    E a edição deve ficar com a situação "em revisão"

  @alternativo
  Cenário: Reprovação com comentário devolve a edição ao rascunho
    Quando "Bruno" reprova a edição com o comentário "Corrigir o título"
    Então a edição deve ficar com a situação "rascunho"
    E a edição deve exibir o comentário "Corrigir o título"

  @excecao
  Cenário: Reprovação sem comentário é recusada
    Quando "Bruno" reprova a edição sem comentário
    Então a mensagem exibida deve ser "O comentário é obrigatório para reprovar"
    E a edição deve ficar com a situação "em revisão"
