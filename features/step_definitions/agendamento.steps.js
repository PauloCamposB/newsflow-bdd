const { Given, When, Then } = require('@cucumber/cucumber')
const assert = require('node:assert/strict')

Given('que são {string} do dia {string} no fuso de São Paulo', function (hora, data) {
  this.servico.definirAgora(data, hora)
})

Given('que o número de reagendamentos do disparo é {int}', function (vezes) {
  this.servico.agendar(this.edicao, 120)
  for (let i = 0; i < vezes; i++) this.servico.reagendar(this.edicao, 120)
})

Given('que o disparo está marcado para daqui a {int} minutos', function (minutos) {
  this.servico.agendar(this.edicao, minutos + 60)
  this.avancarMinutos(60)
})

When('a gestora agenda o envio para daqui a {int} minutos', function (minutos) {
  this.resultado = this.servico.agendar(this.edicao, minutos)
})

When('a gestora reagenda o envio para daqui a {int} minutos', function (minutos) {
  this.resultado = this.servico.reagendar(this.edicao, minutos)
})

When('a gestora cancela o envio', function () {
  this.resultado = this.servico.cancelar(this.edicao)
})

Then('o disparo deve estar agendado para {string} às {string}', function (data, hora) {
  const horario = this.servico.formatarHorario(this.edicao.disparo.horario)
  assert.deepEqual(horario, { data, hora })
})

Then('nenhum disparo deve estar agendado', function () {
  assert.equal(this.edicao.disparo, null)
})
