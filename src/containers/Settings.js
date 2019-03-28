import React, {Component} from 'react';
import {API} from 'aws-amplify';
import { Elements, StripeProvider } from "react-stripe-elements";
import BillingForm from "../containers/BillingForm";
import config from "../config";
import {Wrapper} from '../Style';
 

export default class Settings extends Component{
  constructor(props){
    super(props);
  
    this.state ={
      isLoading: false,
    }
  }

  billUser(details){
    return API.post("notes", "/billing", {  
      body: details,
    });
  }
  handleFormSubmit = async (storage, { token, error }) => { 
    if (error) {
      alert(error);
      return; 
    }
    this.setState({ isLoading: true });
    try {
      await this.billUser({
        storage,
        source: token.id 
      });
      alert("Your card has been charged successfully!");
      this.props.history.push("/"); 
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false }); 
    }
  }

  render(){
    return(
      <Wrapper style={{padding: 60,paddingRight: 600,paddingLeft: 600}}>
        <StripeProvider apiKey="pk_test_1RU2RfqpnddhXGBHt4MQfuXv">
          <Elements>
            <BillingForm 
              loading={this.state.isLoading}
              onSubmit={this.handleFormSubmit}
            />
          </Elements>
        </StripeProvider>
      </Wrapper>
    );
  }
} 