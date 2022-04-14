import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import thunk from "redux-thunk";
import {
  initEventSagas,
  initProductSagas,
  initBrandSagas,
  initCategorySagas,
  initUserSagas,
  initSupplierSagas,
} from "./../sagas/index";
import productsReducer from "./../reducers/products.reducer";
import eventsReducer from "./../reducers/events.reducer";
import brandsReducer from "./../reducers/brands.reducer";
import categoriesReducer from "./../reducers/categories.reducer";
import usersReducer from "./../reducers/users.reducer";
import suppliersReducer from "./../reducers/suppliers.reducer";

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

const configureStore = () => {
  const store = createStore(
    combineReducers({
      products: productsReducer,
      events: eventsReducer,
      brands: brandsReducer,
      categories: categoriesReducer,
      users: usersReducer,
      suppliers: suppliersReducer,
    }),
    composeWithDevTools(applyMiddleware(...middlewares, thunk))
  );

  initProductSagas(sagaMiddleware);
  initEventSagas(sagaMiddleware);
  initBrandSagas(sagaMiddleware);
  initCategorySagas(sagaMiddleware);
  initUserSagas(sagaMiddleware);
  initSupplierSagas(sagaMiddleware);

  return store;
};
export default configureStore;
