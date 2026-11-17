import { makeAutoObservable, runInAction } from 'mobx'

export const CELDAS = 9
const PASO_MS = 600

export class SequenceStore {
  fase = 'inicio' // inicio | mostrando | jugando | fin
  secuencia = []
  activa = null
  pulsadas = 0
  timers = []

  constructor(scores) {
    this.scores = scores
    makeAutoObservable(this, { scores: false, timers: false })
  }

  get nivel() {
    return this.secuencia.length || 1
  }

  limpiar() {
    this.timers.forEach(clearTimeout)
    this.timers = []
  }

  esperar(fn, ms) {
    this.timers.push(setTimeout(() => runInAction(fn), ms))
  }

  empezar() {
    this.secuencia = [this.nuevaCelda()]
    this.reproducir()
  }

  nuevaCelda() {
    return Math.floor(Math.random() * CELDAS)
  }

  reproducir() {
    this.limpiar()
    this.fase = 'mostrando'
    this.pulsadas = 0
    this.secuencia.forEach((celda, i) => {
      this.esperar(() => (this.activa = celda), 700 + i * PASO_MS)
      this.esperar(() => (this.activa = null), 700 + i * PASO_MS + PASO_MS * 0.6)
    })
    this.esperar(() => (this.fase = 'jugando'), 700 + this.secuencia.length * PASO_MS)
  }

  pulsar(i) {
    if (this.fase !== 'jugando') return
    if (i !== this.secuencia[this.pulsadas]) {
      this.scores.registrarSecuencia(this.secuencia.length - 1)
      this.fase = 'fin'
      return
    }
    this.activa = i
    this.esperar(() => (this.activa = null), 200)
    this.pulsadas += 1
    if (this.pulsadas === this.secuencia.length) {
      this.scores.registrarSecuencia(this.secuencia.length)
      this.secuencia.push(this.nuevaCelda())
      this.fase = 'mostrando'
      this.esperar(() => this.reproducir(), 500)
    }
  }
}
