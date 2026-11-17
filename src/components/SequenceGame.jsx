import { observer } from 'mobx-react-lite'
import { useStore } from '../stores/RootStore'
import { CELDAS } from '../stores/SequenceStore'

const Celda = observer(({ i }) => {
  const { secuencia: g } = useStore()
  return (
    <button
      className={`celda ${g.activa === i ? 'activa' : ''}`}
      disabled={g.fase !== 'jugando'}
      onClick={() => g.pulsar(i)}
      aria-label={`Celda ${i + 1}`}
    />
  )
})

const SequenceGame = observer(() => {
  const { secuencia: g } = useStore()
  return (
    <section className="juego">
      <h2>Memoria de secuencias</h2>
      <p className="info">Nivel <strong>{g.nivel}</strong></p>

      <div className="rejilla" role="group" aria-label="Rejilla de 9 celdas">
        {Array.from({ length: CELDAS }, (_, i) => <Celda key={i} i={i} />)}
      </div>

      <p className="estado" aria-live="polite">
        {g.fase === 'inicio' && 'Pulsa empezar y repite la secuencia'}
        {g.fase === 'mostrando' && 'Memoriza...'}
        {g.fase === 'jugando' && '¡Tu turno!'}
        {g.fase === 'fin' && `Fallaste. Llegaste al nivel ${g.nivel}`}
      </p>

      {(g.fase === 'inicio' || g.fase === 'fin') && (
        <button className="boton" onClick={() => g.empezar()}>
          {g.fase === 'inicio' ? 'Empezar' : 'Jugar otra vez'}
        </button>
      )}
    </section>
  )
})

export default SequenceGame
