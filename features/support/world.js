const { setWorldConstructor } = require('@cucumber/cucumber')
const Servico = require('./dominio')

class MundoDoNewsFlow {
  constructor() {
    this.servico = new Servico()
    this.edicao = null
    this.assinante = null
    this.resultado = null
  }

  avancarSegundos(segundos) {
    this.servico.avancarRelogio(segundos * 1000)
  }

  avancarMinutos(minutos) {
    this.avancarSegundos(minutos * 60)
  }

  avancarHoras(horas) {
    this.avancarMinutos(horas * 60)
  }
}

setWorldConstructor(MundoDoNewsFlow)
