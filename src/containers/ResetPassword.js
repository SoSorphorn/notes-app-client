import React, {Component} from 'react';
import {Form} from 'react-bootstrap';
import {Wrapper,FormWrapper} from '../Style';
import logo from '../images/logo.png';
import LoaderButton from '../components/LoaderButton';
import {Auth} from 'aws-amplify';
import {Link} from 'react-router-dom';


export default class ResetPassword extends Component{
  constructor(props) {
    super(props);

    this.state = {
      code: "",
      email: "",
      password: "",
      codeSent: false,
      confirmed: false,
      confirmPassword: "",
      isConfirming: false,
      isSendingCode: false
    };
  }

  validateCodeForm() {
    return this.state.email.length > 0;
  }

  validateResetForm() {
    return (
      this.state.code.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSendCodeClick = async event => {
    event.preventDefault();

    this.setState({ isSendingCode: true });

    try {
      await Auth.forgotPassword(this.state.email);
      this.setState({ codeSent: true });
    } catch (e) {
      alert(e.message);
      this.setState({ isSendingCode: false });
    }
  };

  handleConfirmClick = async event => {
    event.preventDefault();

    this.setState({ isConfirming: true });

    try {
      await Auth.forgotPasswordSubmit(
        this.state.email,
        this.state.code,
        this.state.password
      );
      this.setState({ confirmed: true });
    } catch (e) {
      alert(e.message);
      this.setState({ isConfirming: false });
    }
  };

  renderRequestCodeForm() {
    return (
      <Wrapper>
        <img src={logo} alt="Logo" style={{width: "10%",display:"block",marginLeft: "auto",marginRight: "auto",marginBottom: "20px"}}/>
        <FormWrapper onSubmit={this.handleSendCodeClick}>
          <Form.Group bssize="large" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </Form.Group>
          <LoaderButton
            block
            type="submit"
            bssize="large"
            loadingText="Sending…"
            text="Send Confirmation"
            isLoading={this.state.isSendingCode}
            disabled={!this.validateCodeForm()}
          />
        </FormWrapper>
      </Wrapper>
    );
  }

  renderConfirmationForm() {
    return (
      <Wrapper>
        <img src={logo} alt="Logo" style={{width: "10%",display:"block",marginLeft: "auto",marginRight: "auto",marginBottom: "20px"}}/>
        <FormWrapper onSubmit={this.handleConfirmClick}>
          <Form.Group bssize="large" controlId="code">
            <Form.Label>Confirmation Code</Form.Label>
            <Form.Control
              autoFocus
              type="tel"
              value={this.state.code}
              onChange={this.handleChange}
            />
            <p>
              Please check your email ({this.state.email}) for the confirmation
              code.
            </p>
          </Form.Group>
          <hr />
          <Form.Group bssize="large" controlId="password">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group bssize="large" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              onChange={this.handleChange}
              value={this.state.confirmPassword}
            />
          </Form.Group>
          <LoaderButton
            block
            type="submit"
            bssize="large"
            text="Confirm"
            loadingText="Confirm…"
            isLoading={this.state.isConfirming}
            disabled={!this.validateResetForm()}
          />
        </FormWrapper>
      </Wrapper>
    );
  }

  renderSuccessMessage() {
    return (
      <Wrapper className="success" style={{margin: 0 ,textAlign: "center"}}>
        <img src={logo} alt="Logo" style={{width: "10%",display:"block",marginLeft: "auto",marginRight: "auto",marginBottom: "20px"}}/>
        <i className="glyphicon glyphicon-ok" style={{color: "grey",fontSize: 30,marginBottom: 30}}></i>
        <p>Your password has been reset.</p>
        <p>
          <Link to="/login">
            Click here to login with your new credentials.
          </Link>
        </p>
      </Wrapper>
    );
  }

  render() {
    return (
      <Wrapper className="ResetPassword">
        {!this.state.codeSent
          ? this.renderRequestCodeForm()
          : !this.state.confirmed
            ? this.renderConfirmationForm()
            : this.renderSuccessMessage()}
      </Wrapper>
    );
  }
} 