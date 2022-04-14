import { url } from "../../../App";
import types from "./../actions/products.actions";

const productsReducer = (state = inintialProducts, action) => {
  const addContactHandler =  (data) => {
    fetch(url+'/products.json', {
      method: "POST",
      body: JSON.stringify(data),
    });
    return state;
  };

  const removeContactHandler = (id) => {
    fetch(url+`/products/${id}.json`, {
      method: "DELETE"
    });
    return state;
  };

  const updateContactHandler = (id, data) => {
    fetch(url+`/products/${id}.json`, {
      method: "PUT",
      body: JSON.stringify(data)
    });
    return state;
  };
  switch (action.type) {
    case types.POPULATE_PRODUCTS:
      return action.payload;
    case types.ADD_PRODUCT:
      return addContactHandler(action.payload);
    case types.REMOVE_PRODUCT:
      return removeContactHandler(action.payload.id);
    case types.UPDATE_PRODUCT:
      return updateContactHandler(action.payload.id, action.payload.product);
    default:
      return state;
  }
};

export default productsReducer;

var inintialProducts = [];
