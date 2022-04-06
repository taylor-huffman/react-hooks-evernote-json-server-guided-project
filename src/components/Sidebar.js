import React from "react";
import NoteList from "./NoteList";

function Sidebar({ notes, handleSetNoteDetails, NOTESURL, setNotes }) {

  function handleAddNewOnClick() {

    const defaultNote = {
      title: 'default',
      body: 'placeholder',
      userId: 1
    }
    
    fetch(NOTESURL, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(defaultNote)
    })
    .then(r => r.json())
    .then(newNote => {
      setNotes([...notes, newNote])
    })
  }

  return (
    <div className="master-detail-element sidebar">
      <NoteList notes={notes} handleSetNoteDetails={handleSetNoteDetails} />
      <button onClick={handleAddNewOnClick}>New</button>
    </div>
  );
}

export default Sidebar;
