import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import 'typeface-roboto'

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/plataformas' />
      </Switch>
    </div>
  );
}

export default App;
