import React, { useState, useRef } from 'react';
import { useContext } from 'react';
import noteContext from '../context/noteContext';

export default function AddNote() {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({title:'', description: '', tags: ''})
    const refClose = useRef(null)

    const saveNote = (e) => {
        e.preventDefault()
        addNote(note.title, note.description, note.tags);
        setNote({title:'', description: '', tags: ''});
        refClose.current.click();
    }

    const textChange = (e) => {
        setNote({...note, [e.target.name]: [e.target.value]})
    }

    return (
        <>
            <button type="button" className="btn btn-primary d-flex align-items-center border-radius-lg" data-bs-toggle="modal" data-bs-target="#addNoteModal">
                <span className="material-symbols-outlined"> add </span>
                <span> Add Note </span>
            </button>

            <div className="modal fade" id="addNoteModal" tabIndex="-1" aria-labelledby="addNoteModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="heading">Add Note</h2>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" name="title" value={note.title} minLength={5} onChange={textChange}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea type="text" className="form-control" id="description" name="description" value={note.description} minLength={5} onChange={textChange}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tags" className="form-label">Tags</label>
                                    <input type="text" className="form-control" id="tags" name="tags" value={note.tags} onChange={textChange}/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refClose}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={saveNote}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
