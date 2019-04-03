import React, { Component } from "react";
import { ListGroup,NavItem ,Table,Button} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import {API} from 'aws-amplify';
import NewNoteModal from '../containers/modals/NewNoteModal';

export default class Home extends Component { 
  constructor(props) {
    super(props);
    this.state = { 
      isLoading: true,
      notes: [],
      isDeleting: null,
    }; 
  }

  renderLander() { 
    return (
      <div> 
        <h1 style={{textAlign: "center"}}> Rotati Consulting</h1>
        <p style={{textAlign: "center"}}>Welcome to Rotati</p>
          <div style={{paddingTop: 20, textAlign: "center"}}>
            <LinkContainer to="/login" className="btn btn-primary btn-lg" style={{marginRight: 10}}>
              <NavItem>Login</NavItem>
            </LinkContainer>
            <LinkContainer to="/signup" className="btn btn-primary btn-lg">
              <NavItem>Signup</NavItem>
            </LinkContainer>
          </div>
      </div>
    ); 
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ notes: nextProps.data});
  }
  renderNotes() { 
    return (
      <div className="notes">
        <h3>Your notes</h3> 
        <NewNoteModal handleFetchingNotedList={this.props.handleFetchingNotedList}></NewNoteModal>
        <br></br>
        <ListGroup>
          {!this.state.isLoading && this.renderNotesList(this.state.notes)}
        </ListGroup> 
      </div>
    ); 
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return; 
    }
    try {
      this.props.handleFetchingNotedList();
    } catch (e) { 
      alert(e);
    }
    this.setState({ isLoading: false }); 
  }

  notes() {
    return API.get("notes", "/notes");
  }
  renderNotesList(notes) {
    return(
      <Table striped bordered hover >
        <thead>
          <tr style={{textAlign: "center"}}>
            <th>Name</th>
            <th>Date</th>
            <th>Setting</th>
          </tr>
        </thead>
        <tbody>
          {[{}].concat(notes).map( (note, i) =>
            <tr key={i}>
              <td>{note.content}</td>
              <td>{new Date(note.createdAt).toLocaleString()}</td>
              <td style={{textAlign: "center"}}>
                <Button  
                    size="sm" 
                    variant="primary" 
                    style={{marginRight: 20}}
                    key={note.noteId}
                    href={`/notes/${note.noteId}`} 
                    onClick={this.handleNoteClick}>
                  <i className="glyphicon glyphicon-edit"></i>
                </Button>
                <Button 
                  size="sm" 
                  onClick={this.handleDelete}
                  variant="danger"
                  // isLoading={this.state.isDeleting} 
                >
                  <i className="glyphicon glyphicon-remove"></i>
                </Button>
              </td>
            </tr>
          )}
         </tbody>
      </Table>
    );
  }

  handleDelete = async event => { 
    event.preventDefault();
    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );
    debugger
    if (!confirmed) { 
      return;
    }

    this.setState({ isDeleting: true }); 
    try{
      await this.deleteNote();
      this.props.history.push('/');
    }catch(e){
      this.setState({isDeleting: false});
    }
  }
  deleteNote() {
    return API.del("notes", `/notes/${this.props.match.params.id}`);
    // return API.del("notes", `/notes/{notes.params.id}`);
  }

  handleNoteClick = event => {
    event.preventDefault(); 
    this.props.history.push(event.currentTarget.getAttribute("href"));
  }
 
  render() { 
    return (
      <div className="container" style={{paddingTop: 30}}>
        {this.props.isAuthenticated ? this.renderNotes() : this.renderLander()} 
      </div>
    ); 
  }
}
 