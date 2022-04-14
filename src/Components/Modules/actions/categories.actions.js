import { url } from "../../../App";
const types = {
  GET_CATEGORIES: "GET_CATEGORIES",
  POPULATE_CATEGORIES: "POPULATE_CATEGORIES",
  ADD_CATEGORY: "ADD_CATEGORY",
  REMOVE_CATEGORY: "REMOVE_CATEGORY",
  UPDATE_CATEGORY: "UPDATE_CATEGORY"
};

export default types;

export const addCategory = (payload) => {
  return { type: types.ADD_CATEGORY, payload };
};
export const removeCategory = (id) => {
  return { type: types.REMOVE_CATEGORY, payload: { id } };
};

export const updateCategory = (id, category) => {
  return { type: types.UPDATE_CATEGORY, payload: { id, category } };
};

export function getAllCategories() {
  return async function (dispatch) {
    const response = await fetch(url+'/categories.json');
    const dataResponse = await response.json();
    let data = [];
    for (let key in dataResponse) {
      data.push({ id: key, ...dataResponse[key] });
    }

    data.sort(function(a,b){return a.createdDate - b.createdDate}).reverse();
    dispatch({
      type: types.POPULATE_CATEGORIES,
      payload: data,
    });
  };
}

export const populateCategories = (category) => {
  return { type: types.POPULATE_CATEGORIES, payload: category };
};
