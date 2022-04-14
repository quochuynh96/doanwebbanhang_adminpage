const types = {
  GET_SUPPLIERS: "GET_SUPPLIERS",
  POPULATE_SUPPLIERS: "POPULATE_SUPPLIERS",
  ADD_SUPPLIER: "ADD_SUPPLIER",
  REMOVE_SUPPLIER: "REMOVE_SUPPLIER",
  UPDATE_SUPPLIER: "UPDATE_SUPPLIER",
};

export default types;

export const addSupplier = (payload) => {
  return { type: types.ADD_SUPPLIER, payload };
};
export const removeSupplier = (id) => {
  return { type: types.REMOVE_SUPPLIER, payload: { id } };
};

export const updateSupplier = (id, supplier) => {
  return { type: types.UPDATE_SUPPLIER, payload: { id, supplier } };
};

export const getAllSuppliers = () => {
  return { type: types.GET_SUPPLIERS };
};

export const populateSupplier = (supplier) => {
  return { type: types.POPULATE_SUPPLIERS, payload: supplier };
};
