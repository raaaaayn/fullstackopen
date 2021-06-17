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

export default notificationReducer;
