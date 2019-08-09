import React from 'react'
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom'
import 'typeface-roboto'

import Platforms from './components/platforms'
import Plans from './components/plans'
import Form from './components/form'

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Redirect exact from='/' to='/plataformas' />
          <Route exact path='/plataformas' component={Platforms} />
          <Route exact path='/plataformas/:platformSku/planos' component={Plans} />
          <Route exact path='/plataformas/:platformSku/planos/:planSku/solicitar' component={Form} />
        </Switch>
      </BrowserRouter>
    </>
  )
}

export default App
