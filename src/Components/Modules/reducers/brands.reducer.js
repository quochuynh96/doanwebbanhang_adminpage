import { url } from "../../../App";
import types from "./../actions/brands.actions";

const brandsReducer = (state = inintialBrands, action) => {
  const addContactHandler =  (data) => {
    fetch(url+'/brands.json', {
      method: "POST",
      body: JSON.stringify(data),
    });
    return state;
  };

  const removeContactHandler = (id) => {
    fetch(url+`/brands/${id}.json`, {
      method: "DELETE"
    });
    return state;
  };

  const updateContactHandler = (id, data) => {
    fetch(url+`/brands/${id}.json`, {
      method: "PUT",
      body: JSON.stringify(data)
    });
    return state;
  };

  switch (action.type) {
    case types.POPULATE_BRANDS:
      return action.payload;
    case types.ADD_BRAND:
      return addContactHandler(action.payload);
    case types.REMOVE_BRAND:
      return removeContactHandler(action.payload.id);
    case types.UPDATE_BRAND:
      return updateContactHandler(action.payload.id, action.payload.brand);
    default:
      return state;
  }
};

export default brandsReducer;

var inintialBrands = [];
