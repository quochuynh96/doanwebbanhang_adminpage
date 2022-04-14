import { url } from "../../../App";
import types from "./../actions/users.actions";

const usersReducer = (state = inintialUsers, action) => {
  const addContactHandler =  (data) => {
    fetch(url+'/users.json', {
      method: "POST",
      body: JSON.stringify(data),
    });
    return state;
  };

  const removeContactHandler = (id) => {
    fetch(url+`/users/${id}.json`, {
      method: "DELETE"
    });
    return state;
  };

  const updateContactHandler = (id, data) => {
    fetch(url+`/users/${id}.json`, {
      method: "PUT",
      body: JSON.stringify(data)
    });
    return state;
  };

  switch (action.type) {
    case types.POPULATE_USERS:
      return action.payload;
    case types.ADD_USER:
      return addContactHandler(action.payload);
    case types.REMOVE_USER:
      return removeContactHandler(action.payload.id);
    case types.UPDATE_USER:
      return updateContactHandler(action.payload.id, action.payload.user);
    default:
      return state;
  }
};

export default usersReducer;

var inintialUsers = [];
