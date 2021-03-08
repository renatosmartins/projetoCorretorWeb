/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import PropertiesMaps from './pages/PropertiesMaps';
import immobile from './pages/immobile';
import createImmobile from './pages/createImmobile';


function Routes() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/app" component={PropertiesMaps} />
          <Route path="/immobile/create" component={createImmobile} />
          <Route path="/immobile/:id" component={immobile} />
        </Switch>
      </BrowserRouter>  
    );
}

export default Routes;