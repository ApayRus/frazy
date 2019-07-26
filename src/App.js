import React from 'react'
import './App.css'
import AppBar from './components/AppBar'
import UnitPage from './components/UnitPage'

import DrawerHeading from './components/DrawerHeading'
import DrawerSettings from './components/DrawerSettings'

function App() {
  return (
    <div className='App'>
      <AppBar />
      <UnitPage />
      <DrawerHeading />
      <DrawerSettings />
    </div>
  )
}

export default App
