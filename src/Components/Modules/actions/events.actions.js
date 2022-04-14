const types = {
  GET_EVENTS: "GET_EVENTS",
  POPULATE_EVENTS: "POPULATE_EVENTS",
  ADD_EVENT: "ADD_EVENT",
  REMOVE_EVENT: "REMOVE_EVENT",
  UPDATE_EVENT: "UPDATE_EVENT",
};

export default types;

export const addEvent = (payload) => {
  return { type: types.ADD_EVENT, payload };
};
export const removeEvent = (id) => {
  return { type: types.REMOVE_EVENT, payload: { id } };
};

export const updateEvent = (id, event) => {
  return { type: types.UPDATE_EVENT, payload: { id, event } };
};

export const getAllEvents = () => {
  return { type: types.GET_EVENTS };
};

export const populateEvents = (events) => {
  return { type: types.POPULATE_EVENTS, payload: events };
};
