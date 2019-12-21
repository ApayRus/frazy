import React from 'react'

import './App.css'
import UnitPage from './components/UnitPage'
import MaterialPageHOC from './components/materialView/MaterialPageFirebaseContainer'
import MaterialForm from './components/materialForm/MaterialForm'
import MaterialFormHOC from './components/materialForm/MaterialFormFirebaseContainer'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import MainPage from './components/mainPage/MainPage'
import AuthAvatarLoginLogout from './components/auth/AuthAvatarLoginLogout'
import AdminMaterialList from './components/admin/MaterialList'

function App(props) {
  return (
    <BrowserRouter>
      <div className='App'>
        <AuthAvatarLoginLogout />
        <Switch>
          <Route exact path='/' component={MainPage} />
          <Route path='/material/add' component={MaterialForm} />
          <Route path='/material/edit/:materialId/:trLang' component={MaterialFormHOC} />
          <Route path='/material/edit/:materialId/' component={MaterialFormHOC} />
          <Route path='/material/:materialId/:trLang' component={MaterialPageHOC} />
          <Route path='/material/:materialId' component={MaterialPageHOC} />
          <Route path='/unit/:unitId' component={UnitPage} />
          <Route path='/admin-custom-material-list' component={AdminMaterialList} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
