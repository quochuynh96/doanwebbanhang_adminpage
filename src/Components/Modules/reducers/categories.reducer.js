import { url } from "../../../App";
import types from "./../actions/categories.actions";

const categoriesReducer = (state = inintialCategories, action) => {

  const addContactHandler =  (data) => {
    fetch(url+'/categories.json', {
      method: "POST",
      body: JSON.stringify(data),
    });
    return state;
  };

  const removeContactHandler = (id) => {
    fetch(url+`/categories/${id}.json`, {
      method: "DELETE"
    });
    return state;
  };

  const updateContactHandler = (id, data) => {
    fetch(url+`/categories/${id}.json`, {
      method: "PUT",
      body: JSON.stringify(data)
    });
    return state;
  };

  switch (action.type) {
    case types.ADD_CATEGORY:
      return addContactHandler(action.payload)
    case types.REMOVE_CATEGORY:
      return removeContactHandler(action.payload.id);
    case types.UPDATE_CATEGORY:
      return updateContactHandler(action.payload.id, action.payload.category);
    case types.POPULATE_CATEGORIES:
      state = action.payload;
      return state;
    default:
      return state;
  }
};

export default categoriesReducer;

var inintialCategories = [];
