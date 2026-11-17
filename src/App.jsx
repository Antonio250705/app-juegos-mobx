import { observer } from 'mobx-react-lite'
import { useStore } from './stores/RootStore'
import Header from './components/Header'
import NumberGame from './components/NumberGame'
import SequenceGame from './components/SequenceGame'
import Scoreboard from './components/Scoreboard'

const App = observer(() => {
  const { juego } = useStore()
  return (
    <div className="escena">
      <Header />
      <main className="contenido">
        <div className="tarjeta">
          {juego === 'numerica' ? <NumberGame /> : <SequenceGame />}
        </div>
        <Scoreboard />
      </main>
      <footer className="pie">Antonio García Corro · DIW</footer>
    </div>
  )
})

export default App
