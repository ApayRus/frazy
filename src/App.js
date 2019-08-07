import React from 'react'
import './App.css'
import AppBar from './components/AppBar'
import UnitPage from './components/UnitPage'
import MaterialPageHOC from './components/MaterialPageHOC'
import DrawerSettings from './components/DrawerSettings'
import { BrowserRouter, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <AppBar />
        <Route path='/unit/:unitId' component={UnitPage} />
        <Route path='/material/:materialId' component={MaterialPageHOC} />
        <DrawerSettings />
      </div>
    </BrowserRouter>
  )
}

export default App
