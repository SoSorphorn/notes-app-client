import React , {Component} from 'react';
import {Form, Button} from 'react-bootstrap';
import './Login.css';
import { Auth } from 'aws-amplify' ;

export default class Login extends Component{
  constructor(props){
    super(props);

    this.state = {
      isLoading: false,
      email: '',
      password: '',
    };
  }

  validateForm(){
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => { 
    event.preventDefault();
    this.setState({isLoading: false});    
    try {
      await Auth.signIn(this.state.email, this.state.password); 
      this.props.userHasAuthenticated(true); 
      this.props.history.push("/");
    } catch (e) { 
      alert(e.message);
    }
  }
     
     

  render(){
    return(
      <div className= "App Container">
        <div className= "row">
          <div className= "col-md-4"></div>
          <div className= "col-md-4">
            <Form onSubmit={this.handleSubmit}>
              <h3>Login</h3>
              <Form.Group controlId="email" bssize="large"> 
                <Form.Label>Email</Form.Label>
                <Form.Control autoFocus type="email" value={this.state.email} onChange={this.handleChange}/>
              </Form.Group>
              <Form.Group controlId="password" bssize="large">
                <Form.Label> Password </Form.Label>
                <Form.Control autoFocus type="password" value={this.state.password} onChange={this.handleChange}/>
              </Form.Group>
              <Button block bssize="large" disabled={!this.validateForm()} type="submit">
                Login 
              </Button>
              {/* <LoaderButton block bssize= "large" disabled={!this.validateForm()} type="submit" text= "Login" isLoading={this.state.isLoading} loadingText= "Logged in.........">               </LoaderButton> */}
            </Form>
          </div>
          <div className= "col-md-4"></div>
        </div>
      </div>
    );
  }
} 