import React, {Component} from 'react';
import {Form} from 'react-bootstrap';
import LoaderButton from '../components/LoaderButton';
import config from '../config';
import { NoteFormWrapper } from '../Style';
import { API } from "aws-amplify";
import { s3Upload } from "../libs/awsLib";
import {withRouter} from 'react-router-dom';

class NewNote extends Component{   
  constructor(props){
    super(props);

    this.file = null;
    this.state = {
      isLoading: null,
      content: '',
      show: '',
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
      ${config.MAX_ATTACHMENT_SIZE/1000000} MB.`); return;
    }
    this.setState({ isLoading: true });
    try {
      const attachment = this.file
      ? await s3Upload(this.file) : null;
      await this.createNote({
        attachment,
        content: this.state.content
      });
      this.handleClose = this.handleClose.bind(this);
      this.props.handleClose();
      this.props.handleFetchingNotedList();
      this.props.history.push('/');
      
    } catch (e) {
      alert(e);
      this.setState({ isLoading: false }); 
    }
  }

  handleClose(){
    this.setState({show: false});
  }

  createNote(note) {
    return API.post("notes", "/notes", {
        body: note
      });
  }

  render(){
    return(
      <div>
        <NoteFormWrapper onSubmit={this.handleSubmit}>
          <Form.Group controlId="content">
            <Form.Control
              onChange={this.handleChange}
              value={this.state.content}
              componentclass="textarea"  style={{ height: 100, fontSize: 24}}/>
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
      </div>
    )
  }
}


export default withRouter(NewNote);