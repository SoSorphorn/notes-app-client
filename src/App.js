import React, {Component, Fragment} from 'react';
import {Navbar,Nav, NavItem,} from 'react-bootstrap';
import Routes from './Routes';
import { LinkContainer } from "react-router-bootstrap";
import { Auth } from "aws-amplify";
import {withRouter} from 'react-router-dom';
import logo from './images/logo.png';
import {API} from 'aws-amplify';

class App extends Component{
  constructor(props){
    super(props);
    this.state = { 
      isAuthenticated: false, 
      isAuthenticating: true,
      data: []
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

  handleFetchingNotedList = async () => {
    const newData = await API.get("notes", "/notes");
    this.setState({data: newData});
  }
  
  handleLogout = async event => { 
    await Auth.signOut();
    this.userHasAuthenticated(false); 
    this.setState({isAuthenticated: false});
    this.props.history.push('/login')
  }

  
  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated, 
      userHasAuthenticated: this.userHasAuthenticated,
      handleFetchingNotedList: this.handleFetchingNotedList,
      data: this.state.data
    };
  
    return (
      !this.state.isAuthenticating && <div>
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand href="/">
            <img src={logo} alt="Logo" style={{width: "6%"}}/>
         </Navbar.Brand>
          <Nav className="mr-auto">
          {
            this.state.isAuthenticated
              ? <Fragment>
                  <LinkContainer to="/settings" className="nav-link">
                    <NavItem>Setting</NavItem> 
                  </LinkContainer>
                  <NavItem onClick={this.handleLogout} className="nav-link">
                    <i className="glyphicon glyphicon-log-out"></i>
                  </NavItem>
                </Fragment>
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
        </Navbar>
        <Routes childProps={childProps} />
      </div>
    );
  } 
}

export default withRouter(App);
