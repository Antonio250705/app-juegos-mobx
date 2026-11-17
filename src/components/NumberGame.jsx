import { observer } from 'mobx-react-lite'
import { useEffect, useRef } from 'react'
import { useStore } from '../stores/RootStore'
import { MAX_NIVEL } from '../stores/NumberStore'

const NumberGame = observer(() => {
  const { numerica: g } = useStore()
  const input = useRef(null)

  useEffect(() => {
    if (g.fase === 'respuesta') input.current?.focus()
  }, [g.fase])

  return (
    <section className="juego">
      <h2>Memoria numérica</h2>
      <p className="info">Nivel <strong>{g.nivel}</strong> / {MAX_NIVEL}</p>

      {g.fase === 'inicio' && (
        <>
          <p>Recuerda el número. Cada nivel tiene una cifra más.</p>
          <button className="boton" onClick={() => g.empezar()}>Empezar</button>
        </>
      )}

      {g.fase === 'numero' && (
        <>
          <div className="numero">{g.numero}</div>
          <div className="barra">
            <div key={g.numero} className="barra-tiempo" style={{ animationDuration: `${g.duracion}ms` }} />
          </div>
        </>
      )}

      {g.fase === 'respuesta' && (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            g.comprobar()
          }}
        >
          <label htmlFor="respuesta">¿Qué número has visto?</label>
          <input
            id="respuesta"
            ref={input}
            inputMode="numeric"
            autoComplete="off"
            value={g.respuesta}
            onChange={(e) => g.setRespuesta(e.target.value)}
          />
          <button className="boton" type="submit">Comprobar</button>
        </form>
      )}

      {g.fase === 'acierto' && (
        <>
          <p className="mensaje ok">¡Correcto!</p>
          <button className="boton" onClick={() => g.siguiente()}>Siguiente</button>
        </>
      )}

      {g.fase === 'fin' && (
        <>
          <p className={`mensaje ${g.gana ? 'ok' : 'mal'}`}>
            {g.gana ? '¡Has completado los 20 niveles!' : `Fallaste. Era ${g.numero}`}
          </p>
          <p>Nivel alcanzado: <strong>{g.nivelAlcanzado}</strong></p>
          <button className="boton" onClick={() => g.empezar()}>Jugar otra vez</button>
        </>
      )}
    </section>
  )
})

export default NumberGame
