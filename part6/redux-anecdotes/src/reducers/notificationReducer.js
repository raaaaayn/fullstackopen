const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_NOTIF":
      return action.notif;
    case "UNSET_NOTIF":
      return null;
    default:
      return state;
  }
};

export const setNotif = (content) => {
  return {
    type: "SET_NOTIF",
    notif: content,
  };
};

export const unsetNotif = () => {
  return {
    type: "UNSET_NOTIF",
  };
};

export const setNotifa = (content, time) => {
  return async (dispatch) => {
    dispatch(setNotif(content));
    setTimeout(() => {
      dispatch(unsetNotif());
    }, time * 1000);
  };
};

export default notificationReducer;
