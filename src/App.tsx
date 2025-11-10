import './App.css'
import {Route, Routes} from 'react-router-dom'
import Navbar from './components/Navbar.tsx'
import Home from './pages/Home.tsx'
import About from './pages/About.tsx'
import Footer from './components/Footer.tsx'
import Login from './pages/auth/Login.tsx'
import Register from './pages/auth/Register.tsx'
function App() {

  return (
    <div className="App">
      <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />

          {/* auth paths */}
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          
        </Routes>
      <Footer />
    </div>
  )
}

export default App
