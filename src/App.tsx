import './App.css'
import {Route, Routes} from 'react-router-dom'
import Navbar from './components/Navbar.tsx'
import Home from './pages/Home.tsx'
import About from './pages/About.tsx'
import Footer from './components/Footer.tsx'
function App() {

  return (
    <>
    <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        
      </Routes>
    <Footer />
    </>
  )
}

export default App
