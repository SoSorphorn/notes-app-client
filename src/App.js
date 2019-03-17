import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Navbar,Nav, FormControl, Button, Form, NavItem,} from 'react-bootstrap';
import './App.css';
import Routes from './Routes';
import { LinkContainer } from "react-router-bootstrap";

class App extends Component{
  render() {
    return (
      <div>
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand href="#home">Rotati</Navbar.Brand>
          <Nav className="mr-auto">
            <LinkContainer to="/signup" className="nav-link">
                <NavItem>Signup</NavItem> 
            </LinkContainer>
            <LinkContainer to="/login" className="nav-link">
                <NavItem>Login</NavItem> 
            </LinkContainer>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-light">Search</Button>
          </Form>
        </Navbar>
        <Routes/>
      </div>
    );
  } 
}
export default App;
