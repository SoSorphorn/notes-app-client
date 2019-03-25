import React ,{Component} from 'react';
import LoaderButton from '../components/LoaderButton';
import {Form} from 'react-bootstrap';
// import './Signup.css';
import { Auth } from 'aws-amplify';
import {Wrapper, FormWrapper, ParagraphWrapper} from '../Style'

export default class Signup extends Component{
  constructor(props){
    super(props);
    this.state = {
      isLoading: false,
      email: '',
      password: '',
      confirmPassword: '',
      confirmationCode: '',
      newUser: null,
    }
  }

  validateForm(){
    return(
      this.state.email.length > 0 &&
      this.state.password.length > 0 && 
      this.state.password === this.state.confirmPassword
    );  
  }

  validateConfirmationForm(){
    return(
      this.state.confirmationCode.length > 0
    );
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value 
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });

    try{
      const newUser = await Auth.signUp({
        username: this.state.email,
        password: this.state.password,
      });
      this.setState({newUser});
    }catch(e){
      alert(e.message);
    }
    this.setState({isLoading: false});
  }
  

  handleConfirmationSubmit = async event => { 
    event.preventDefault();
    this.setState({ isLoading: true }); 
    
    try{
      await Auth.confirmSignUp(this.state.email, this.state.confirmationCode);
      await Auth.signIn(this.state.email, this.state.password);
      this.props.userHasAuthenticated(true);
      this.props.history.push('/');
    }catch (e){
      alert(e.message);
      this.setState({isLoading: false});
    }
  }

  renderConfirmationForm(){
    return(
      <div>
        <FormWrapper onSubmit={this.handleConfirmationSubmit}>
          <Form.Group controlId="confirmationCode" bssize="large">
            <Form.Label> Confirmation Code</Form.Label>
            <Form.Control
            autoFocus
            type="tel"
            value={this.state.confirmationCode}
            onChange={this.handleChange}/>
            <ParagraphWrapper>Please check your email for the code</ParagraphWrapper> 
          </Form.Group>
          <LoaderButton 
            block
            bssize= "large"
            disabled={!this.validateConfirmationForm()} 
            type="submit" 
            text= "Verify"
            isLoading={this.state.isLoading} 
            loadingText= " Verifying........."> 
           >
          </LoaderButton>
        </FormWrapper>
      </div>
    );
  }
  renderForm(){
    return(
      <FormWrapper onSubmit={this.handleSubmit}>
        <h3 style={{textAlign: "center", paddingBottom: 30}}>Register</h3>
        <Form.Group controlId="email" bssize="large">
          <Form.Label>Email</Form.Label>
          <Form.Control autoFocus type="email" value={this.state.email} onChange={this.handleChange}/>
        </Form.Group>
        <Form.Group controlId="password" bssize="large">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={this.state.password} onChange={this.handleChange}/>
        </Form.Group>
        <Form.Group controlId="confirmPassword" bssize="large">
          <Form.Label> Confirm Password</Form.Label>
          <Form.Control  type="password" value={this.state.confirmPassword} onChange={this.handleChange}/>
        </Form.Group>
        <LoaderButton block bssize="large" disabled={!this.validateForm()} type="submit" isLoading={this.state.isLoading} text="Signup" loadingText="Signing up..."/>
      </FormWrapper>
    )
  }

  render(){
    return(
      <Wrapper>
        {this.state.newUser === null? this.renderForm() : this.renderConfirmationForm()}
      </Wrapper>
    );
  }
}

 

