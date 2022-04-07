import React, { useState } from "react";
// import { Editor } from '@tinymce/tinymce-react'

function NoteEditor({ noteDetails, setEditMode, handleUpdateNote }) {

  // const handleEditorChange = (e) => {
  //   console.log(
  //     'Content was updated:',
  //     e.target.getContent()
  //   );
  // }

  const { title, body } = noteDetails

  const [formData, setFormData] = useState({
    title: title,
    body: body
  })

  function handleOnChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  function handleOnSubmit(e) {
    e.preventDefault()
    const updatedNote = {
      ...noteDetails,
      title: formData.title,
      body: formData.body
    }
    handleUpdateNote(updatedNote)
    setEditMode(false)
  }

  function handleCancelOnClick() {
    setEditMode(false)
  }

  return (
    <form className="note-editor" onSubmit={handleOnSubmit}>
      <input type="text" name="title" value={formData.title} onChange={handleOnChange} />
      <textarea name="body" value={formData.body} onChange={handleOnChange} />
      {/* <Editor
        name="body"
        apiKey="nwz19j39an16mp9zdgjmnpv5h827remid2thiwgpz6yuy8hc"
        // initialValue="<p>Initial content</p>"
        value={formData.body}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist autolink lists link image', 
            'charmap print preview anchor help',
            'searchreplace visualblocks code',
            'insertdatetime media table paste wordcount'
          ],
          toolbar:
            'undo redo | formatselect | bold italic | \
            alignleft aligncenter alignright | \
            bullist numlist outdent indent | help'
        }}
        onChange={handleEditorChange}
      /> */}
      <div className="button-row">
        <input className="button" type="submit" value="Save" />
        <button type="button" onClick={handleCancelOnClick}>Cancel</button>
      </div>
    </form>
  );
}

export default NoteEditor;
