import axios from "axios";
import { call, put, take } from "redux-saga/effects";
import types from "./../actions/events.actions";

export function* getAllEvents() {
  yield take(types.GET_EVENTS);
  const result = yield call(axios, "http://localhost:3004/events");
  yield put({ type: types.POPULATE_EVENTS, payload: result.data });
}
