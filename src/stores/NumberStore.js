import { makeAutoObservable, runInAction } from 'mobx'

export const MAX_NIVEL = 20

export class NumberStore {
  fase = 'inicio' // inicio | numero | respuesta | acierto | fin
  nivel = 1
  numero = ''
  respuesta = ''
  duracion = 0
  gana = false
  timer = null

  constructor(scores) {
    this.scores = scores
    makeAutoObservable(this, { scores: false, timer: false })
  }

  get nivelAlcanzado() {
    return this.gana ? this.nivel : this.nivel - 1
  }

  generar(cifras) {
    let s = String(1 + Math.floor(Math.random() * 9))
    for (let i = 1; i < cifras; i++) s += Math.floor(Math.random() * 10)
    return s
  }

  empezar() {
    this.nivel = 1
    this.gana = false
    this.mostrar()
  }

  mostrar() {
    clearTimeout(this.timer)
    this.numero = this.generar(this.nivel)
    this.respuesta = ''
    this.duracion = 1000 + this.nivel * 500
    this.fase = 'numero'
    this.timer = setTimeout(
      () => runInAction(() => (this.fase = 'respuesta')),
      this.duracion,
    )
  }

  setRespuesta(valor) {
    this.respuesta = valor.replace(/\D/g, '')
  }

  comprobar() {
    if (this.respuesta === this.numero) {
      if (this.nivel === MAX_NIVEL) {
        this.gana = true
        this.scores.registrarNumerica(this.nivel)
        this.fase = 'fin'
      } else {
        this.fase = 'acierto'
      }
    } else {
      this.scores.registrarNumerica(this.nivel - 1)
      this.fase = 'fin'
    }
  }

  siguiente() {
    this.nivel += 1
    this.scores.registrarNumerica(this.nivel - 1)
    this.mostrar()
  }
}
