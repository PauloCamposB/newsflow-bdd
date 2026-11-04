const { Given, When, Then } = require('@cucumber/cucumber')
const assert = require('node:assert/strict')

Given('que a edição está em revisão', function () {
  this.edicao.situacao = 'em revisão'
})

Given('que a edição foi aprovada por {string}', function (pessoa) {
  this.edicao.situacao = 'em revisão'
  this.servico.aprovar(this.edicao, pessoa)
})

When('{string} aprova a edição', function (pessoa) {
  this.resultado = this.servico.aprovar(this.edicao, pessoa)
})

When('{string} reprova a edição com o comentário {string}', function (pessoa, comentario) {
  this.resultado = this.servico.reprovar(this.edicao, comentario)
})

When('{string} reprova a edição sem comentário', function (pessoa) {
  this.resultado = this.servico.reprovar(this.edicao, '')
})

Then('a edição deve ficar com a situação {string}', function (situacao) {
  assert.equal(this.edicao.situacao, situacao)
})

Then('a edição deve exibir o comentário {string}', function (comentario) {
  assert.equal(this.edicao.comentario, comentario)
})
