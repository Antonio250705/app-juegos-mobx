import { makeAutoObservable, autorun } from 'mobx'

const CLAVE = 'juegos-mobx-puntuaciones'

// Guarda las mejores puntuaciones y las persiste en LocalStorage (apartado extra)
export class ScoreStore {
  mejorNumerica = 0
  mejorSecuencia = 0

  constructor() {
    makeAutoObservable(this)
    try {
      const guardado = JSON.parse(localStorage.getItem(CLAVE))
      if (guardado) {
        this.mejorNumerica = guardado.mejorNumerica || 0
        this.mejorSecuencia = guardado.mejorSecuencia || 0
      }
    } catch {
      /* datos corruptos: se ignoran */
    }
    autorun(() => {
      localStorage.setItem(
        CLAVE,
        JSON.stringify({ mejorNumerica: this.mejorNumerica, mejorSecuencia: this.mejorSecuencia }),
      )
    })
  }

  registrarNumerica(nivel) {
    if (nivel > this.mejorNumerica) this.mejorNumerica = nivel
  }

  registrarSecuencia(nivel) {
    if (nivel > this.mejorSecuencia) this.mejorSecuencia = nivel
  }

  reiniciar() {
    this.mejorNumerica = 0
    this.mejorSecuencia = 0
  }
}
