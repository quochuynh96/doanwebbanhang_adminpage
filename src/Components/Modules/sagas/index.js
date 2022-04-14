import * as productsSaga from "./productsSaga";
import * as eventsSaga from "./eventsSaga";
import * as brandsSaga from "./brandsSaga";
import * as categoriesSaga from "./categoriesSaga";
import * as usersSaga from "./usersSaga";
import * as suppliersSaga from "./suppliersSaga";

export const initProductSagas = (sagaMiddleware) => {
  Object.values(productsSaga).forEach(sagaMiddleware.run.bind(sagaMiddleware));
};

export const initEventSagas = (sagaMiddleware) => {
  Object.values(eventsSaga).forEach(sagaMiddleware.run.bind(sagaMiddleware));
};

export const initBrandSagas = (sagaMiddleware) => {
  Object.values(brandsSaga).forEach(sagaMiddleware.run.bind(sagaMiddleware));
};

export const initCategorySagas = (sagaMiddleware) => {
  Object.values(categoriesSaga).forEach(
    sagaMiddleware.run.bind(sagaMiddleware)
  );
};

export const initUserSagas = (sagaMiddleware) => {
  Object.values(usersSaga).forEach(sagaMiddleware.run.bind(sagaMiddleware));
};

export const initSupplierSagas = (sagaMiddleware) => {
  Object.values(suppliersSaga).forEach(sagaMiddleware.run.bind(sagaMiddleware));
};
