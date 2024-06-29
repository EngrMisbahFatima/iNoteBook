import React, { useEffect, useRef, useState } from 'react'
import { useContext } from 'react';
import noteContext from '../context/noteContext';
import NoteItem from './NoteItem';
import { useNavigate } from 'react-router-dom';

export default function Note() {
    const context = useContext(noteContext);
    let navigate = useNavigate();
    const { notes, getAllNotes, updateNote } = context;
    const [note, setNote] = useState({id: '', etitle:'', edescription: '', etags: ''})
    useEffect(() => {
        if(localStorage.getItem("authToken")){
            getAllNotes();
        }
        else{
            navigate("/login");
        }
        // eslint-disable-next-line
    }, [])

    const ref = useRef(null)
    const refClose = useRef(null)
    const editNote = (note)=>{
        console.log(note)
        ref.current.click()
        setNote({id: note._id, etitle: note.title, edescription: note.description, etags: note.tags})
    }

    const updateExistingNote = (e) => {
        updateNote(note.id, note.etitle, note.edescription, note.etags);
        refClose.current.click();
    }

    const textChange = (e) => {
        
        setNote({...note, [e.target.name]: e.target.value})
    }
 
 return (
        <div className="notes-wrapper">
            <button type="button" className="btn btn-primary d-flex align-items-center border-radius-lg d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#editNoteModal">
                <span className="material-symbols-outlined"> add </span>
                <span>  Note </span>
            </button>
            <div className="modal fade" id="editNoteModal" tabIndex="-1" aria-labelledby="editNoteModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="heading">Edit Note</h2>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" name="etitle" value={note.etitle} onChange={textChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea type="text" className="form-control" id="description" name="edescription" value={note.edescription} onChange={textChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tags" className="form-label">Tags</label>
                                    <input type="text" className="form-control" id="tags" name="etags" value={note.etags} onChange={textChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={updateExistingNote}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <h2 className="heading">Your Notes</h2>
            <div className="row">
                {notes.map((note) => {
                    return <NoteItem key={note._id} note={note ? note : ''} editNote={editNote}/>
                })}
            </div>
        </div>
    )
}
