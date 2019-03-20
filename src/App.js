import React, {Component, Fragment} from 'react';
import {Navbar,Nav, FormControl, Button, Form, NavItem,} from 'react-bootstrap';
import './App.css';
import Routes from './Routes';
import { LinkContainer } from "react-router-bootstrap";
import { Auth } from "aws-amplify";
import {withRouter} from 'react-router-dom';

class App extends Component{
  constructor(props){
    super(props);
    this.state = { 
      isAuthenticated: false, 
      isAuthenticating: true
    }; 
   }
  async componentDidMount(){

    try{
      const result = await Auth.currentSession();
      if (result){
        this.userHasAuthenticated(true);
      }
    }catch(e){
      if (e !== 'no user id'){
        // alert(e);
      }
    }
    this.setState({isAuthenticating: false});
  }

  userHasAuthenticated = authenticated => { 
    this.setState({ isAuthenticated: authenticated });
  }
  
  handleLogout = async event => { 
    await Auth.signOut();
    this.userHasAuthenticated(false); 
    this.setState({isAuthenticated: false});
    console.log("I am log out", this.state);
    this.props.history.push('/login')
  }

  
  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated, 
      userHasAuthenticated: this.userHasAuthenticated
    };
  
    console.log(this.state);
    return (
      !this.state.isAuthenticating && <div>
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand href="/login">Rotati</Navbar.Brand>
          <Nav className="mr-auto">
          {
            this.state.isAuthenticated
              ? <NavItem onClick={this.handleLogout} className="nav-link">Logout</NavItem> 
              : <Fragment>
                  <LinkContainer to="/signup" className="nav-link"> 
                    <NavItem>Signup</NavItem>
                  </LinkContainer> 
                  <LinkContainer to="/login" className="nav-link">
                    <NavItem>Login</NavItem> 
                  </LinkContainer>
                </Fragment> 
          } 
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-light">Search</Button>
          </Form>
        </Navbar>
        <Routes childProps={childProps} />
      </div>
    );
  } 
}

export default withRouter(App);

 