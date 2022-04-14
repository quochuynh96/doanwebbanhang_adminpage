/* eslint-disable require-yield */
import { call, delay, put, take } from "redux-saga/effects";

function double(number) {
  return number * 2;
}

export function* testSaga() {
  while (true) {
    yield take("TEST_MESSAGE");
    yield call(double, 2);
    yield double(3);
  }
}

export function* dispatchTest() {
  while (true) {
    yield delay(1000);
    yield put({ type: "TEST_MESSAGE", payload: 1000 });
  }
}
