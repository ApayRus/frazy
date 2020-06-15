import React from 'react'

import './App.css'
import HeadingPage from './components/materialHeading/HeadingPage'
import MaterialPageHOC from './components/materialView/MaterialPageFirebaseContainer'
import MaterialForm from './components/materialForm/MaterialForm'
import MaterialFormHOC from './components/materialForm/MaterialFormFirebaseContainer'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import MainPage from './components/mainPage/MainPage'
import AuthAvatarLoginLogout from './components/auth/AuthAvatarLoginLogout'
import AdminMaterialList from './components/admin/MaterialList'
import Testnetworking from './components/admin/Testnetworking'

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
          <Route path='/unit/:unitId/:trLang' component={HeadingPage} />
          <Route path='/unit/:unitId' component={HeadingPage} />
          <Route path='/admin-custom-material-list' component={AdminMaterialList} />
          <Route path='/testnetworking' component={Testnetworking} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
