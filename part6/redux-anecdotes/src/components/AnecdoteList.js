import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initialiseAnecdotes, voteFor } from "../reducers/anecdoteReducer";
import { setNotifa } from "../reducers/notificationReducer";

const AnecdoteList = (props) => {
  const anecdotes = useSelector((state) =>
    state.anecdotes.sort((p, n) => n.votes - p.votes)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("useeffect");
    dispatch(initialiseAnecdotes());
  }, [dispatch]);

  const vote = (anecdote) => {
    console.log("vote");
    dispatch(voteFor(anecdote));
    dispatch(setNotifa(`You voted '${anecdote.content}'`, 2));
    // dispatch(setNotif(anecdote.content));
    // setTimeout(() => {
    //   dispatch(unsetNotif());
    // }, 5000);
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
