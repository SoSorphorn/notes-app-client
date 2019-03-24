import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import {API} from 'aws-amplify';

export default class Home extends Component { 
  constructor(props) {
    super(props);
    this.state = { isLoading: true, notes: []
    }; 
  }

  renderLander() { 
    return (
      <div className="lander"> <h1>Scratch</h1>
        <p>A simple note taking app</p>
      </div>
    ); 
  }
  renderNotes() { 
    return (
      <div className="notes">
        <h3>Your Notes</h3> 
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
      const notes = await this.notes(); 
      this.setState({ notes });
    } catch (e) { 
      alert(e);
    }
    this.setState({ isLoading: false }); 
  }

  notes() {
    return API.get("notes", "/notes");
  }
  renderNotesList(notes) {
    return [{}].concat(notes).map( (note, i) =>
      i !== 0
      ? <ListGroupItem
        key={note.noteId}
        href={`/notes/${note.noteId}`} 
        onClick={this.handleNoteClick} 
        header={note.content.trim().split("\n")[0]}
      >
       <b>{note.content}</b>
       <br></br>
       {/* <b>{note.attachment}</b> */}
       <p>{"Created: " + new Date(note.createdAt).toLocaleString()}</p>
      </ListGroupItem> 
    : <ListGroupItem
      key="new"
      href="/notes/new" 
      onClick={this.handleNoteClick}
      >
      <h4>
        <b>{"\uFF0B"}</b> 
        Create a new note 
      </h4>
      </ListGroupItem>
    ); 
  }
  handleNoteClick = event => {
    event.preventDefault(); 
    this.props.history.push(event.currentTarget.getAttribute("href"));
  }
  render() { 
    return (
      <div className="container" style={{paddingTop: 30}}>{this.props.isAuthenticated ? this.renderNotes() : this.renderLander()} 
      </div>
    ); 
  }
}
 