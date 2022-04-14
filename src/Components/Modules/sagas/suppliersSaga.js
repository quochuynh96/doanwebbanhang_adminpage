import { put, take } from "redux-saga/effects";
import types from "../actions/suppliers.actions";
import api from "../api/contacts";

export function* getAllSuppliers() {
  yield take(types.GET_SUPPLIERS);
  const result = api.get("/suppliers");
  yield put({ type: types.POPULATE_SUPPLIERS, payload: result });
}
