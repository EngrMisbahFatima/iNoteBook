import React from 'react';
import { useContext } from 'react';
import noteContext from '../context/noteContext';

export default function NoteItem(props) {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, editNote } = props;
    return (
        <div className="col-4">
            <div className="card m-2">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <div className="d-flex justify-content-end align-items-center">
                        <span className="material-symbols-outlined" onClick={()=> deleteNote(note._id)}>
                            delete
                        </span>
                        <span className="material-symbols-outlined" onClick={()=>editNote(note)}>
                            edit_note
                        </span>
                    </div>
                </div>
            </div>

        </div>
    )
}
