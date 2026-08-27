import './App.css'
import Home from './pages/Home'
import CustomCursor from './components/CustomCursor'

function App() {

  return (
    <div className="cursor-none">
      <CustomCursor />
      <Home/>
    </div>
  )
}

export default App
