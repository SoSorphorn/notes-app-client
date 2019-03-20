import React from 'react';
import {Route,Switch} from 'react-router-dom';
import Home from './containers/Home';
import NotFound from "./containers/NotFound";
import Login from './containers/Login';
import Sigup from './containers/Signup';
import AppliedRoute from './components/AppliedRoute';

export default ({childProps}) => 
  <Switch>
    {/* <Route path="/" exact component={Home} /> 
    <Route path="/login" exact component={Login} /> */}

    <AppliedRoute path="/" exact component={Home} props={childProps}/>
    <AppliedRoute path='/login' exact component={Login} props={childProps}/>
    <AppliedRoute path='/signup' exact component={Sigup} props={childProps}/>
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;
  