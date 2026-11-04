const { Given, When, Then } = require('@cucumber/cucumber')
const assert = require('node:assert/strict')

Given('que a assinante {string} está na lista', function (email) {
  this.assinante = this.servico.cadastrar(email)
})

Given('que a assinante usou o link de descadastro', function () {
  this.servico.descadastrar(this.assinante)
})

Given('que a assinante pediu para voltar à lista', function () {
  this.servico.pedirRetorno(this.assinante)
})

When('o NewsFlow envia a edição {string}', function (titulo) {
  this.servico.enviarEdicao(titulo)
})

When('a assinante usa o link de descadastro', function () {
  this.servico.descadastrar(this.assinante)
})

When('a assinante pede para voltar à lista', function () {
  this.servico.pedirRetorno(this.assinante)
})

When('a assinante usa o link de confirmação depois de {int} horas', function (horas) {
  this.avancarHoras(horas)
  this.resultado = this.servico.confirmarRetorno(this.assinante)
})

Then('a assinante deve receber a edição {string}', function (titulo) {
  assert.ok(this.assinante.recebidos.some(e => e.titulo === titulo))
})

Then('a assinante não deve receber a edição {string}', function (titulo) {
  assert.ok(!this.assinante.recebidos.some(e => e.titulo === titulo))
})

Then('o e-mail recebido deve trazer o link de descadastro', function () {
  assert.ok(this.assinante.recebidos.at(-1).linkDescadastro)
})

Then('a assinante deve estar {string}', function (situacao) {
  assert.equal(this.assinante.naLista ? 'na lista' : 'fora da lista', situacao)
})

Then('a assinante deve receber o aviso {string}', function (aviso) {
  assert.ok(this.assinante.avisos.includes(aviso))
})
