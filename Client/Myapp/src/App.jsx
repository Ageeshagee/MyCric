import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MainRouter from './components/Reactrouter/MainRouter'
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <>
      <div >
    <BrowserRouter>
      <MainRouter />
    </BrowserRouter>
      </div>
    </>
  )
}

export default App
