import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from './utils/providers/ThemeProvider.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <ThemeProvider
          attribute='class'
          enableSystem={true}
          defaultTheme='light'>
        <App /> 
      </ThemeProvider>
    </Router>
  </StrictMode>,
)
