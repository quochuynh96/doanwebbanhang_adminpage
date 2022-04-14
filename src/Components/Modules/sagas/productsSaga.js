import { put, take } from "redux-saga/effects";
import types from "../actions/products.actions";
import api from "../api/contacts";

export function* getAllProducts() {
  yield take(types.GET_PRODUCTS);
  const result = api.get("/products");

  yield put({
    type: types.POPULATE_PRODUCTS,
    payload: result,
  });
}
