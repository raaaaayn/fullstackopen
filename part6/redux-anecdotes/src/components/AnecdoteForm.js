import { connect } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotifa } from "../reducers/notificationReducer";

const AnecdoteForm = (props) => {
  const addAnecdote = (event) => {
    console.log("create");
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    const anecdoteToBeUploaded = { content, votes: 0 };
    props.createAnecdote(anecdoteToBeUploaded);
    props.setNotifa(`created ${anecdoteToBeUploaded.content}`, 5);
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

const mapDispatchToProps = {
  createAnecdote,
  setNotifa,
};

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm);

export default ConnectedAnecdoteForm;
