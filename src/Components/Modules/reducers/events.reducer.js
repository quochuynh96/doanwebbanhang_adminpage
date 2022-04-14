import api from "../api/contacts";
import types from "./../actions/events.actions";

const eventsReducer = (state = inintialEvents, action) => {
  const addApi = async (data) => {
    await api.post("/events", data);
  };
  const removeContactHandler = async (id) => {
    await api.delete(`/events/${id}`);
  };
  const updateContactHandler = async (id, data) => {
    await api.put(`/events/${id}`, data);
  };
  let newEvents;
  switch (action.type) {
    case types.POPULATE_EVENTS:
      return action.payload;
    case types.ADD_EVENT:
      newEvents = state.concat({ ...action.payload });
      addApi(action.payload);
      return newEvents;
    case types.REMOVE_EVENT:
      newEvents = state.filter((event) => event.id !== action.payload.id);
      removeContactHandler(action.payload.id);
      return newEvents;
    case types.UPDATE_EVENT:
      newEvents = [...state];
      const index = newEvents.findIndex(
        (event) => event.id === action.payload.id
      );
      newEvents[index] = { ...action.payload.event };
      updateContactHandler(action.payload.id, action.payload.event);
      return newEvents;
    default:
      return state;
  }
};

export default eventsReducer;

var inintialEvents = [];
