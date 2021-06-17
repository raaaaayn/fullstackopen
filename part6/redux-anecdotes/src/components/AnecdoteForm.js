import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import anecService from "../services/anecdotes";

const AnecdoteForm = (props) => {
  const dispatch = useDispatch();
  const addAnecdote = (event) => {
    console.log("create");
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    const anecdoteToBeUploaded = { content, votes: 0 };
    anecService.createAnec(anecdoteToBeUploaded).then((a) => {
      console.log("a", a);
      dispatch(createAnecdote(a));
    });
  };
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
