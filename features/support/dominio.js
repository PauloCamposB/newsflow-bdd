// Domínio em memória do NewsFlow, com relógio simulado (nenhuma espera real).
const MINUTO = 60 * 1000
const HORA = 60 * MINUTO
const INTERVALO_SALVAMENTO = 30 * 1000
const MAX_VERSOES = 20
const ANTECEDENCIA_MINIMA = 15 * MINUTO
const MAX_REAGENDAMENTOS = 2
const LIMITE_CANCELAMENTO = 5 * MINUTO
const VALIDADE_CONFIRMACAO = 48 * HORA

const FORMATO_SP = new Intl.DateTimeFormat('pt-BR', {
  timeZone: 'America/Sao_Paulo',
  day: '2-digit', month: '2-digit', year: 'numeric',
  hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
})

class Servico {
  constructor() {
    this.agora = Date.parse('2027-03-10T09:00:00-03:00')
    this.edicoes = []
    this.assinantes = new Map()
  }

  // ---- relógio ----
  definirAgora(data, hora) {
    const [dia, mes, ano] = data.split('/')
    this.agora = Date.parse(`${ano}-${mes}-${dia}T${hora}:00-03:00`) // São Paulo: UTC-3
  }

  avancarRelogio(ms) {
    const destino = this.agora + ms
    for (const edicao of this.edicoes) {
      while (edicao.situacao === 'rascunho' && edicao.proximoSalvamento <= destino) {
        this.salvar(edicao)
        edicao.proximoSalvamento += INTERVALO_SALVAMENTO
      }
    }
    this.agora = destino
  }

  formatarHorario(instante) {
    const partes = Object.fromEntries(FORMATO_SP.formatToParts(instante).map(p => [p.type, p.value]))
    return { data: `${partes.day}/${partes.month}/${partes.year}`, hora: `${partes.hour}:${partes.minute}` }
  }

  // ---- RN01: rascunho e versões ----
  criarEdicao(titulo, autora) {
    const edicao = {
      titulo, autora, texto: '', situacao: 'rascunho', comentario: null,
      versoes: [], proximaVersao: 1,
      proximoSalvamento: this.agora + INTERVALO_SALVAMENTO, disparo: null
    }
    this.edicoes.push(edicao)
    return edicao
  }

  salvar(edicao) {
    edicao.versoes.push({ numero: edicao.proximaVersao++, texto: edicao.texto })
    if (edicao.versoes.length > MAX_VERSOES) edicao.versoes.shift()
  }

  restaurar(edicao, numero) {
    const versao = edicao.versoes.find(v => v.numero === numero)
    if (!versao) return { ok: false, mensagem: 'Esta versão não está mais disponível' }
    edicao.texto = versao.texto
    return { ok: true, mensagem: 'Versão restaurada' }
  }

  // ---- RN02: aprovação ----
  aprovar(edicao, pessoa) {
    if (pessoa === edicao.autora) {
      return { ok: false, mensagem: 'A autora não pode aprovar a própria edição' }
    }
    edicao.situacao = 'aprovada'
    return { ok: true, mensagem: 'Edição aprovada' }
  }

  reprovar(edicao, comentario) {
    if (!comentario || !comentario.trim()) {
      return { ok: false, mensagem: 'O comentário é obrigatório para reprovar' }
    }
    edicao.situacao = 'rascunho'
    edicao.comentario = comentario
    edicao.proximoSalvamento = this.agora + INTERVALO_SALVAMENTO
    return { ok: true, mensagem: 'Edição reprovada' }
  }

  // ---- RN03: agendamento ----
  agendar(edicao, minutos) {
    if (edicao.situacao !== 'aprovada') {
      return { ok: false, mensagem: 'A edição precisa de aprovação para ser agendada' }
    }
    const horario = this.agora + minutos * MINUTO
    if (horario - this.agora < ANTECEDENCIA_MINIMA) {
      return { ok: false, mensagem: 'O envio precisa de ao menos 15 minutos' }
    }
    edicao.disparo = { horario, reagendamentos: 0 }
    return { ok: true, mensagem: 'Envio agendado' }
  }

  reagendar(edicao, minutos) {
    if (edicao.disparo.reagendamentos >= MAX_REAGENDAMENTOS) {
      return { ok: false, mensagem: 'Limite de reagendamentos atingido' }
    }
    if (minutos * MINUTO < ANTECEDENCIA_MINIMA) {
      return { ok: false, mensagem: 'O envio precisa de ao menos 15 minutos' }
    }
    edicao.disparo.horario = this.agora + minutos * MINUTO
    edicao.disparo.reagendamentos += 1
    return { ok: true, mensagem: 'Envio reagendado' }
  }

  cancelar(edicao) {
    if (edicao.disparo.horario - this.agora < LIMITE_CANCELAMENTO) {
      return { ok: false, mensagem: 'O cancelamento é permitido até 5 minutos antes do envio' }
    }
    edicao.disparo = null
    return { ok: true, mensagem: 'Envio cancelado' }
  }

  // ---- RN06: descadastro e duplo opt-in ----
  cadastrar(email) {
    const assinante = { email, naLista: true, recebidos: [], avisos: [], pedidoRetorno: null }
    this.assinantes.set(email, assinante)
    return assinante
  }

  enviarEdicao(titulo) {
    for (const assinante of this.assinantes.values()) {
      if (assinante.naLista) assinante.recebidos.push({ titulo, linkDescadastro: true })
    }
  }

  descadastrar(assinante) {
    assinante.naLista = false
    assinante.avisos.push('Descadastro confirmado')
  }

  pedirRetorno(assinante) {
    assinante.pedidoRetorno = this.agora
    assinante.avisos.push('Confirme seu retorno à lista')
  }

  confirmarRetorno(assinante) {
    if (this.agora - assinante.pedidoRetorno > VALIDADE_CONFIRMACAO) {
      return { ok: false, mensagem: 'O link de confirmação expirou' }
    }
    assinante.naLista = true
    assinante.pedidoRetorno = null
    return { ok: true, mensagem: 'Retorno à lista confirmado' }
  }
}

module.exports = Servico
