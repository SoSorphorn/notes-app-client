import React, {Component} from 'react';
import {Form} from 'react-bootstrap';
import LoaderButton from '../components/LoaderButton';
import config from '../config';
import { NoteFormWrapper , NoteWrapper} from '../Style';
import { API } from "aws-amplify";

export default class NewNote extends Component{   
  constructor(props){
    super(props);
    this.file = null;
    this.state = {
      isLoading: null,
      content: '',
    }
  }

  validateForm(){
    return (this.state.content.length > 0);
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleFileChange = event => {
    this.file = event.target.files[0];
  }

  handleSubmit = async event => { 
    event.preventDefault();
    if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) { 
      alert(`Please pick a file smaller than
      ${config.MAX_ATTACHMENT_SIZE/1000000} MB.`); 
      return;
    }
    this.setState({ isLoading: true });
    console.log(`File: ${this.state.API}`);
    try {
      await this.createNote({
      content: this.state.content });
      this.props.history.push('/');
    } catch (e) {
      alert(e);
        this.setState({isLoading: false});
    }
  }

  createNote(note){
    return API.post("notes", "/notes",{
      body: note
    });
  }

  render(){
    return(
      <NoteWrapper>
        <h3>New Note</h3>
        <NoteFormWrapper onSubmit={this.handleSubmit}>
          <Form.Group controlId="content">
            <Form.Control
              onChange={this.handleChange}
              value={this.state.content}
              componentclass="textarea"  style={{ height: 300, fontSize: 24}}/>
          </Form.Group>
          <Form.Group controlId="file">
            <Form.Label>Attactement</Form.Label>
            <Form.Control onChange={this.handleFileChange} type="file"/>
          </Form.Group>
          <LoaderButton 
            block
            bssize="large"
            bsstyle="primary"
            disabled={!this.validateForm()}
            type="submit"
            isLoading={this.state.isLoading}
            text="Create"
            loadingText="Creating..."/>
        </NoteFormWrapper>
      </NoteWrapper>
    )
  }
}