import {url} from "../../../App";

const types = {
  GET_USERS: "GET_USERS",
  POPULATE_USERS: "POPULATE_USERS",
  ADD_USER: "ADD_USER",
  REMOVE_USER: "REMOVE_USER",
  UPDATE_USER: "UPDATE_USER",
};

export default types;

export const addUser = (payload) => {
  return { type: types.ADD_USER, payload };
};
export const removeUser = (id) => {
  return { type: types.REMOVE_USER, payload: { id } };
};

export const updateUser = (id, user) => {
  return { type: types.UPDATE_USER, payload: { id, user } };
};

export const getAllUsers = () => {
  return async function (dispatch) {
    const response = await fetch(url+'/users.json');
    const dataResponse = await response.json();
    let data = [];
    for (let key in dataResponse) {
      data.push({ id: key, ...dataResponse[key] });
    }
    data.sort(function(a,b){return a.createdDate - b.createdDate}).reverse();
    dispatch({
      type: types.POPULATE_USERS,
      payload: data,
    });
  };
};

export const populateUsers = (users) => {
  return { type: types.POPULATE_USERS, payload: users };
};
