import './App.css'
import {Toaster} from 'sonner'
import {Route, Routes} from 'react-router-dom'
import Navbar from './components/Navbar.tsx'
import Home from './pages/Home.tsx'
import Personal from './pages/Personal.tsx'
import About from './pages/About.tsx'
import Footer from './components/Footer.tsx'
import Login from './pages/auth/Login.tsx'
import Register from './pages/auth/Register.tsx'
import Airtime from './pages/vtu/Airtime.tsx'
import Data from './pages/vtu/Data.tsx'
import Electricity from './pages/vtu/Electricity.tsx'
import Waec from './pages/vtu/Waec.tsx'
import Utility from './pages/vtu/Utility.tsx'
function App() {

  return (
    <div className="App poppins-regular">
       <Toaster position="top-right" />
      <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/personal' element={<Personal />} />
          <Route path='/about' element={<About />} />

          {/* auth paths */}
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          
          {/* core functional routes */}
          <Route path='/airtime' element={<Airtime/>}/>
          <Route path='/data' element={<Data/>}/>
          <Route path='/electricity' element={<Electricity/>}/>
          <Route path='/utility' element={<Utility/>}/>
          <Route path='/waec' element={<Waec/>}/>
        </Routes>
      <Footer />
    </div>
  )
}

export default App
