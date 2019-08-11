import React from 'react'
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom'
import 'typeface-roboto'
import CssBaseline from '@material-ui/core/CssBaseline'

import Platforms from './components/platforms'
import Plans from './components/plans'
import Form from './components/form'
import Sekeleton from './components/skeleton'

function App() {
  return (
    <Sekeleton>
      <CssBaseline />
      <BrowserRouter>
        <Switch>
          <Redirect exact from='/' to='/plataformas' />
          <Route exact path='/plataformas' component={Platforms} />
          <Route exact path='/plataformas/:platformSku/planos' component={Plans} />
          <Route exact path='/plataformas/:platformSku/planos/:planSku/solicitar' component={Form} />
        </Switch>
      </BrowserRouter>
    </Sekeleton>
  )
}

export default App
