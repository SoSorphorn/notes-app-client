import React from 'react';
import {Route,Switch} from 'react-router-dom';
import Home from './containers/Home';
import NotFound from "./containers/NotFound";
import Login from './containers/Login';
import Sigup from './containers/Signup';
import AppliedRoute from './components/AppliedRoute';
import NewNote from './containers/NewNote';

export default ({childProps}) => 
  <Switch>
    {/* <Route path="/" exact component={Home} /> 
    <Route path="/login" exact component={Login} /> */}

    <AppliedRoute path="/" exact component={Home} props={childProps}/>
    <AppliedRoute path='/login' exact component={Login} props={childProps}/>
    <AppliedRoute path='/signup' exact component={Sigup} props={childProps}/>
    <AppliedRoute path='/notes/new' exact component={NewNote} props={childProps}/>
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;
  