import React, { useState, useEffect } from "react";
import Search from "./Search";
import Sidebar from "./Sidebar";
import Content from "./Content";

function NoteContainer() {

  const NOTESURL = 'http://localhost:3000/notes'

  const [notes, setNotes] = useState([])
  const [noteDetails, setNoteDetails] = useState(null)
  const [editMode, setEditMode] = useState(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch(NOTESURL)
    .then(r => r.json())
    .then(notes => setNotes(notes))
  },[])

  function handleSetNoteDetails(note) {
    setNoteDetails(note)
    setEditMode(false)
  }

  function handleUpdateNote(updatedNote, noteDetails) {
    console.log(updatedNote)
    setNotes(notes => {
      debugger
      return notes.map(note => {
        if (note.title === updatedNote.title || note.body === updatedNote.body) {
          return updatedNote
        } else {
          return note
        }
      })
    })
    setNoteDetails(updatedNote)
    fetch(`${NOTESURL}/${updatedNote.id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedNote)
    })
    .then(r => r.json())
    .then(data => console.log(data))
  }

  const displayNotes = notes.filter(note => {
    if (!search) return true
    return note.title.toLowerCase().includes(search.toLowerCase())
    || note.body.toLowerCase().includes(search.toLowerCase())
  })

  return (
    <>
      <Search search={search} setSearch={setSearch} />
      <div className="container">
        <Sidebar notes={displayNotes} handleSetNoteDetails={handleSetNoteDetails} NOTESURL={NOTESURL} setNotes={setNotes} />
        <Content noteDetails={noteDetails} editMode={editMode} setEditMode={setEditMode} handleUpdateNote={handleUpdateNote} />
      </div>
    </>
  );
}

export default NoteContainer;
