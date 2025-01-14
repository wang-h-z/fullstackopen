const AnecdoteForm = ( {createAnecdote} ) => {
    return (
    <form onSubmit={createAnecdote}>
        <div><input name="anecdote"/></div>
        <button type='submit'>create</button>
    </form>)
}

export default AnecdoteForm