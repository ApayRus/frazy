import React from 'react'

import './App.css'
import UnitPage from './components/UnitPage'
import MaterialPageHOC from './components/materialView/MaterialPageHOC'
import MaterialForm from './components/materialForm/MaterialForm'
import MaterialFormHOC from './components/materialForm/MaterialFormHOC'
import DrawerSettings from './components/DrawerSettings'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

function App(props) {
  return (
    <BrowserRouter>
      <div className='App'>
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
