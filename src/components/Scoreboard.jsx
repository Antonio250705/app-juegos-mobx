import { observer } from 'mobx-react-lite'
import { useStore } from '../stores/RootStore'

const Scoreboard = observer(() => {
  const { scores } = useStore()
  return (
    <aside className="marcador">
      <h2>Mejores marcas</h2>
      <p>Numérica: <strong>{scores.mejorNumerica}</strong></p>
      <p>Secuencias: <strong>{scores.mejorSecuencia}</strong></p>
      <button className="boton pequeno" onClick={() => scores.reiniciar()}>
        Borrar marcas
      </button>
    </aside>
  )
})

export default Scoreboard
