import api from "../api/contacts";
import types from "../actions/suppliers.actions";

const suppliersReducer = (state = inintialSuppliers, action) => {
  const addApi = async (data) => {
    return await api.post("/suppliers", data);
  };

  const removeContactHandler = async (id) => {
    return await api.delete(`/suppliers/${id}`);
  };
  const updateContactHandler = async (id, data) => {
    return await api.put(`/suppliers/${id}`, data);
  };

  switch (action.type) {
    case types.POPULATE_SUPPLIERS:
      return action.payload;
    case types.ADD_SUPPLIER:
      console.log(action.payload);
      return addApi(action.payload);
    case types.REMOVE_SUPPLIER:
      return removeContactHandler(action.payload.id);
    case types.UPDATE_SUPPLIER:
      return updateContactHandler(action.payload.id, action.payload.supplier);
    default:
      return state;
  }
};

export default suppliersReducer;

var inintialSuppliers = [];
