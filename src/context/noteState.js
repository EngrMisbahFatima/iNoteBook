import { useState } from "react";
import NoteContext from "./noteContext";

const NoteSate = (props) => {
    const initialNotes = [];
    const _host = "http://localhost:5000"
    const [notes, setNotes] = useState(initialNotes)

    // Fetch Notes
    const getAllNotes = async () => {
        let url = `${_host}/api/notes/fetchnotes`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('authToken')
            },
          });

          let responseData = await response.json();
          setNotes(responseData);
          return responseData;
    }

    // Add a Note
    const addNote = async (title, description, tags) => {
        let url = `${_host}/api/notes/addnote`;
        const data = {'title': title[0], 'description': description[0], 'tags': tags[0]}
        const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('authToken')
            },
            body: JSON.stringify(data), 
          });

          let responseData = await response.json();
          setNotes(notes.concat(responseData.note))
          return responseData;
    };

    // Update a Note
    const updateNote = async (id, title, description, tags) => {
      let url = `${_host}/api/notes/updatenote/${id}`;
      const data = {_id: id, 'title': title, 'description': description, 'tags': tags}
      const response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('authToken')
          },
          body: JSON.stringify(data), 
        });

        let newNotes = JSON.parse(JSON.stringify(notes))
        for(let index = 0; index < newNotes.length; index++) {
          const element = newNotes[index];
          if(element._id === id){
            newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tags = tags;
            break;
          }
        } 
        setNotes(newNotes)

        let responseData = await response.json();
        return responseData;
    };

    // Delete a Note
    const deleteNote = async (id) => {
        let url = `${_host}/api/notes/deletenote/${id}`;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem('authToken')
            },
          });

          let responseData = await response.json();
          console.log(responseData)
          const newNotes2 = notes.filter(note => note._id !== responseData.note._id)
          setNotes(newNotes2)
          return responseData;
    };
    return (
        <NoteContext.Provider value={{ notes, addNote, updateNote, deleteNote, getAllNotes }}>
            {props.children}
        </NoteContext.Provider>
    );
}
export default NoteSate;