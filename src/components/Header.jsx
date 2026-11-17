import { observer } from 'mobx-react-lite'
import { useStore } from '../stores/RootStore'

const Header = observer(() => {
  const { juego, elegir } = useStore()
  const pestanas = [
    ['numerica', 'Memoria numérica'],
    ['secuencia', 'Memoria de secuencias'],
  ]
  return (
    <header className="cabecera">
      <h1>Juegos de memoria</h1>
      <nav className="pestanas" aria-label="Elegir juego">
        {pestanas.map(([id, texto]) => (
          <button
            key={id}
            className={`pestana ${juego === id ? 'seleccionada' : ''}`}
            aria-pressed={juego === id}
            onClick={() => elegir(id)}
          >
            {texto}
          </button>
        ))}
      </nav>
    </header>
  )
})

export default Header
