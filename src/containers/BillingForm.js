
import React, {Component} from 'react';
import {Form ,FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import LoaderButton from '../components/LoaderButton';
import {BillingFormWrapper} from '../Style';
import {injectStripe, CardElement} from 'react-stripe-elements'

class BillingForm extends Component{
  constructor(props){
    super(props);
    this.state={
      name: "",
      storage: "",
      isProcessing: false,
      isCardComplete: false,
    }
  }

  validateForm(){
    return(
      this.state.name !=="" &&
      this.state.storage !=="" && 
      this.state.isCardComplete
    );
  }

  handleFieldChange = event => {
    this.setState({
      [event.target.id] :event.target.value
    });
  }

  handleCardFieldChange = event => {
    this.setState({
      isCardComplete: event.complete
    })
  }

  handeSubmitClick = async event =>  {
    event.preventDefault();
    const {name} = this.state;
    this.setState({isProcessing: true});
    const {token, error} = await this.props.stripe.createToken({name});
    this.setState({isProcessing: false});
    this.props.onSubmit(this.state.storage, {token,error});
  }

  render(){
    const loading = this.state.isProcessing || this.props.loading; 
    return(
      <Form className="BillingForm" onSubmit={this.handeSubmitClick}>
        <FormGroup bssize="large" controlId="storage">
          <FormLabel>Storage</FormLabel>
          <FormControl
            min="0"
            type="number"
            value={this.state.storage}
            onChange={this.handleFieldChange}
            placeholder= "Number of notes to store"/>
        </FormGroup>
        <hr/>
        <FormGroup bssize="large" controlId="name">
          <FormLabel>Card Name</FormLabel>
          <FormControl
            type="text"
            value={this.state.name}
            onChange={this.handleFieldChange}
            placeholder="Name on Card" 
          />
        </FormGroup>
        <FormLabel>Credit Card Info</FormLabel>
        <BillingFormWrapper className="BillingForm">
          <CardElement  
            className="card-field"
            onChange={this.handleCardFieldChange}
            style={{
              base: {
                fontSize: 18, 
                fontFamily: '"Open Sans", sans-serif',
              },
            }}
          />
        </BillingFormWrapper>
        <LoaderButton
          block
          bssize="large"
          type="submit"
          text="Purchase"
          isLoading={loading}
          loadingText="Purchasing......."
          disabled={!this.validateForm()}
        />
      </Form>
    );
  }
}
export default injectStripe(BillingForm);   