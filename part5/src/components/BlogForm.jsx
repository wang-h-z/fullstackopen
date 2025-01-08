import React from 'react'

const BlogForm = ({addNote, newNote, handleNoteChange}) => {
    return (
        <form onSubmit={addNote}>
            <input
                value={newNote}
                onChange={handleNoteChange}
            />
            <button type="submit">save</button>
        </form>  
    )
}

export default BlogForm