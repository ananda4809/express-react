import React, {Component} from "react";
import "./notes.css";
import $ from "jquery";
import { Button, Input, Form, FormGroup, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Notes extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {notes : []};
        this.state.enteredNote = "";
        this.state.enteredDesc = "";

        this.handleNoteChange = this.handleNoteChange.bind(this);
        this.handleDescChange = this.handleDescChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    componentDidMount()
    {
        fetch("/api/getNotes")
        .then(res => res.json())
        .then(notes => this.setState({notes}, ()=>{
            console.log("notes fetched from server.. ", notes);
        }));
    }

    handleNoteChange(event)
    {
        this.setState({enteredNote : event.target.value})
    }
    handleDescChange(event)
    {
        this.setState({enteredDesc : event.target.value})
    }

    handleSubmit(event)
    {
        event.preventDefault();

        if(this.state.enteredNote == "" || this.state.enteredDesc == "")
        {
            alert("Empty fields can't be updated..")
            return false;
        }

        alert("Note & Desc : "+this.state.enteredNote+ "&"+ this.state.enteredDesc);
        
        // let newObj = {
        //     note : this.state.enteredNote,
        //     desc : this.state.enteredDesc
        // };
        // this.state.notes.push(newObj);
        // console.log(this.state.notes);

        let newItemEntered = $('<li>'+this.state.enteredNote+ " : " +this.state.enteredDesc +'</li>');
        $("#notes-list").append(newItemEntered);

        $("#notes-form")[0].reset();
    }    

    handleClearForm(event)
    {
        $("#notes-form")[0].reset();
    }

    render()
    {
        return(
            <div class="container">
                <h2>All Notes</h2>
                <ul id="notes-list">
                    {this.state.notes.map(eachNote =>
                        <li key={eachNote.note}>
                            {eachNote.note} : {eachNote.desc}
                        </li>
                    )}
                </ul>
                <br/>
                <Form id="notes-form">
                <FormGroup>
                    <Input type="text" id="note" value={this.state.value} onChange={this.handleNoteChange} placeholder="Enter Note" autoComplete="off"/>
                    <br/>
                    
                    <Input type="text" id="desc" value={this.state.value} onChange={this.handleDescChange} placeholder="Enter Desciption" autoComplete="off"/>
                    <br/>
                    </FormGroup>

                    <FormGroup row>
                    <Col>
                        <Button type="submit" onClick={this.handleSubmit}>Save Note</Button>
                    </Col>
                    <Col>
                        <Button color="warning" onClick={this.handleClearForm}>New Note</Button>
                    </Col>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}
export default Notes;