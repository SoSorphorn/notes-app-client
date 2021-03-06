import React from 'react';
import {Route,Switch} from 'react-router-dom';
import AppliedRoute from './components/AppliedRoute';
import Home from './containers/Home';
import NotFound from './containers/NotFound';
import Login from './containers/Login';
import Sigup from './containers/Signup';
import NewNote from './containers/NewNote';
import ResetPassword from './containers/ResetPassword';
import Notes from './containers/Notes';
import AuthenticatedRoute from './components/AuthenticatedRoute'; 
import UnauthenticatedRoute from './components/UnauthenticatedRoute';
import Settings from './containers/Settings';

export default ({childProps}) => 
  <Switch>
    <AppliedRoute path='/' exact component={Home} props={childProps}/>
    <UnauthenticatedRoute path='/login' exact component={Login} props={childProps}/>
    <UnauthenticatedRoute path='/login/resetPassword' exact component={ResetPassword} props={childProps}/>
    <UnauthenticatedRoute path='/signup' exact component={Sigup} props={childProps}/>
    <AuthenticatedRoute path='/notes/new' exact component={NewNote} props={childProps}/>
    <AuthenticatedRoute path='/notes/:id' exact component={Notes} props={childProps} />
    <AuthenticatedRoute path='/settings' exact component={Settings} props={childProps} />
    <Route component={NotFound}/>
  </Switch>;
  