const { Given, When, Then } = require('@cucumber/cucumber')
const assert = require('node:assert/strict')

Given('que a redatora {string} escreveu a edição {string}', function (autora, titulo) {
  this.edicao = this.servico.criarEdicao(titulo, autora)
})

Given('que a redatora alterou o texto para {string}', function (texto) {
  this.edicao.texto = texto
})

Given('que a edição já passou por {int} salvamentos', function (quantidade) {
  for (let i = 1; i <= quantidade; i++) {
    this.edicao.texto = `Texto do salvamento ${i}`
    this.avancarSegundos(30)
  }
})

When('passam {int} segundos', function (segundos) {
  this.avancarSegundos(segundos)
})

When('a redatora restaura a versão {int}', function (numero) {
  this.resultado = this.servico.restaurar(this.edicao, numero)
})

Then('o total de versões disponíveis deve ser {int}', function (quantidade) {
  assert.equal(this.edicao.versoes.length, quantidade)
})

Then('a versão {int} deve conter o texto {string}', function (numero, texto) {
  const versao = this.edicao.versoes.find(v => v.numero === numero)
  assert.equal(versao.texto, texto)
})

Then('a versão mais antiga disponível deve ser a {int}', function (numero) {
  assert.equal(this.edicao.versoes[0].numero, numero)
})

Then('o texto atual da edição deve ser {string}', function (texto) {
  assert.equal(this.edicao.texto, texto)
})
