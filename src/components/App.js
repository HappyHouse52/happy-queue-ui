import React from 'react';
import { Container } from 'semantic-ui-react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Queue from './Queue';
import RedirectSso from './RedirectSso';

function App() {
  return (
    <Container text>
      <Router>
        <Switch>
          <Route exact path="/" component={RedirectSso} />
          <Route path="/:queue" component={Queue} />
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
