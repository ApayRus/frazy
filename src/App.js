import React from 'react'

import './App.css'
import AppBar from './components/AppBar'
import UnitPage from './components/UnitPage'
import MaterialPageHOC from './components/MaterialPageHOC'
import MaterialForm from './components/MaterialForm'
import MaterialFormHOC from './components/MaterialFormHOC'
import DrawerSettings from './components/DrawerSettings'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

function App(props) {
  return (
    <BrowserRouter>
      <div className='App'>
        <AppBar />
        <Switch>
          <Route path='/material/add' component={MaterialForm} />
          <Route path='/material/edit/:materialId/:trLang' component={MaterialFormHOC} />
          <Route path='/material/edit/:materialId/' component={MaterialFormHOC} />
          <Route path='/material/:materialId/:trLang' component={MaterialPageHOC} />
          <Route path='/material/:materialId' component={MaterialPageHOC} />
          <Route path='/unit/:unitId' component={UnitPage} />
        </Switch>
        <DrawerSettings />
      </div>
    </BrowserRouter>
  )
}

export default App
