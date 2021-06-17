import anecService from "../services/anecdotes";

const anecdoteReducer = (state = [], action) => {
  console.log("state now: ", state);
  console.log("action", action);
  switch (action.type) {
    case "VOTE":
      const anecdoteToChange = state.find(
        (anecdote) => anecdote.id === action.data.anec.id
      );
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };
      return state.map((a) =>
        a.id === changedAnecdote.id ? changedAnecdote : a
      );

    case "CREATE_ANEC":
      return state.concat(action.data);
    case "INIT":
      return action.data;

    default:
      return state;
  }
};

export const voteFor = (anec) => {
  return async (dispatch) => {
    await anecService.vote(anec);
    dispatch({
      type: "VOTE",
      data: { anec },
    });
  };
};

export const initialiseAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecService.getAll();
    dispatch({ type: "INIT", data: anecdotes });
  };
};

export const createAnecdote = (anec) => {
  return async (dispatch) => {
    const anecdote = await anecService.createAnec(anec);
    dispatch({
      type: "CREATE_ANEC",
      data: { ...anecdote, votes: 0 },
    });
  };
};

export default anecdoteReducer;
