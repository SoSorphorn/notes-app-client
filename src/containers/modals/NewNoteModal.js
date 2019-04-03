import React , {Component} from 'react';
import { Modal } from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import AddNote from '../AddNote';


export default class NewNoteModal extends Component{
  constructor(props,context){

    super(props,context);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      name: '',
      date: '',
      file: '',
      show: false,
    }
  } 
  handleClose(){
    this.setState({show: false});
  }
  handleShow(){
    this.setState({show: true});
  }

  render(){
    return(
      <div className="new-note">
        <Button variant="primary" onClick={this.handleShow}>New Note</Button>
        <Modal  show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add a new note</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddNote handleClose={this.handleClose} handleFetchingNotedList={this.props.handleFetchingNotedList}/>
            <Button variant="secondary" className="btn-block" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}