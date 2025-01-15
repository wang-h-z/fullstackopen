import { useSelector, useDispatch } from 'react-redux';
import { upVote, addAnecdote } from './reducers/anecdoteReducer';
import { setNotification, clearNotification } from './reducers/notificationReducer'; // Import notification actions
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Filter from './components/Filter';
import Notification from './components/Notification';

const App = () => {
  const anecdotes = useSelector(state => {
    if (state.filter === '') {
      return state.anecdotes;
    }
    return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter));
  });

  const dispatch = useDispatch();

  const vote = (id) => {
    console.log('vote', id);
    dispatch(upVote({ id }));

    dispatch(setNotification('You voted for an anecdote!'));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  };

  const createAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';

    dispatch(addAnecdote({ content }));

    dispatch(setNotification('You created a new anecdote!'));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList anecdotes={anecdotes} vote={vote} />
      <AnecdoteForm createAnecdote={createAnecdote} />
    </div>
  );
};

export default App;
