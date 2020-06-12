import React from 'react'

import './App.css'
import HeadingPage from './components/unit/UnitPage'
import MaterialPageHOC from './components/material/DataContainer'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import MainPage from './components/mainPage/MainPage'
import AuthAvatarLoginLogout from './components/auth/AuthAvatarLoginLogout'
import AdminMaterialList from './components/admin/MaterialList'
import Testnetworking from './components/admin/Testnetworking'

export default function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <AuthAvatarLoginLogout />
        <Switch>
          <Route exact path='/' component={MainPage} />
          {/* MATERIAL */}
          <Route path='/material/:materialId/:trLang' component={MaterialPageHOC} />
          <Route path='/material/:materialId' component={MaterialPageHOC} />
          <Route path='/material' component={MaterialPageHOC} />
          {/* UNIT */}
          <Route path='/unit/:unitId/:trLang' component={HeadingPage} />
          <Route path='/unit/:unitId' component={HeadingPage} />
          <Route path='/unit' component={HeadingPage} />
          {/* for admin  */}
          <Route path='/admin-custom-material-list' component={AdminMaterialList} />
          <Route path='/testnetworking' component={Testnetworking} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}
