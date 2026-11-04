const { Then } = require('@cucumber/cucumber')
const assert = require('node:assert/strict')

Then('a mensagem exibida deve ser {string}', function (esperada) {
  assert.equal(this.resultado.mensagem, esperada)
})
