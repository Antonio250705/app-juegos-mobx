import { createContext, useContext } from 'react'
import { makeAutoObservable } from 'mobx'
import { ScoreStore } from './ScoreStore'
import { NumberStore } from './NumberStore'
import { SequenceStore } from './SequenceStore'

export class RootStore {
  juego = 'numerica' // numerica | secuencia
  scores = new ScoreStore()
  numerica = new NumberStore(this.scores)
  secuencia = new SequenceStore(this.scores)

  constructor() {
    makeAutoObservable(this, { scores: false, numerica: false, secuencia: false })
  }

  elegir(juego) {
    this.juego = juego
  }
}

const StoreContext = createContext(null)
export const StoreProvider = ({ store, children }) => (
  <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
)
export const useStore = () => useContext(StoreContext)
