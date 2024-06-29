import React from 'react'
import Note from './Note'
import AddNote from './AddNote'
import { useNavigate } from 'react-router-dom';

export default function Home() {
    let navigate = useNavigate();
    React.useEffect(() => { 
        if( !localStorage.getItem('authToken')) navigate("/login");
        // eslint-disable-next-line 
    }, []);
    return (
        <>
            <div className="container">
                <div className="add-note-cotainer my-3 d-flex justify-content-end">
                    <AddNote/>
                </div>
                <div className="notes-cotainer my-3">
                    <Note/>
                </div>
            </div>
        </>
    )
}
