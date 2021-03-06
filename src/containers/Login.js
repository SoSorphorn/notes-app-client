import React , {Component} from 'react';
import {Form} from 'react-bootstrap';
import { Auth } from 'aws-amplify' ;
import LoaderButton from '../components/LoaderButton';
import {Wrapper, FormWrapper, Header} from '../Style';

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
    this.setState({isLoading: true});  
    try {
      await Auth.signIn(this.state.email, this.state.password); 
      this.props.userHasAuthenticated(true); 
    } catch (e) { 
      alert(e.message);
      this.setState({isLoading: false});
    }
  }

  render(){
    return(
      <Wrapper>
        <Header>Login</Header>
        <FormWrapper onSubmit={this.handleSubmit}>
          <Form.Group controlId="email" bssize="large"> 
            <Form.Label>Email</Form.Label>
            <Form.Control autoFocus type="email" value={this.state.email} onChange={this.handleChange}/>
          </Form.Group>
          <Form.Group controlId="password" bssize="large">
            <Form.Label> Password </Form.Label>
            <Form.Control autoFocus type="password" value={this.state.password} onChange={this.handleChange}/>
          </Form.Group>
          <p style={{marginTop: 20}}>
            <a href='/login/resetPassword'>Forgot Password?</a>
          </p>
          <hr></hr>
          <LoaderButton 
            block 
            bssize= "large" 
            disabled={!this.validateForm()} 
            type="submit" 
            text= "Login"
            isLoading={this.state.isLoading} 
            loadingText= " Logging in.........">   
          </LoaderButton>
        </FormWrapper>
      </Wrapper>
    );
  }
} 

