// Action Types
export const ADD_PRODUCT = "ADD_PRODUCT";
export const REMOVE_PRODUCT = "REMOVE_PRODUCT";
export const EDIT_COUNT = "EDIT_COUNT";
export const EMPTY_CART = "EMPTY_CART";

// Action Creator
export const addProduct = (product) => {
  return {
    type: ADD_PRODUCT,
    payload: product,
  };
};

export const removeProduct = (productID) => ({
  type: REMOVE_PRODUCT,
  payload: productID,
});

export const editCount = (productID, newCount) => ({
  type: EDIT_COUNT,
  payload: { productID, newCount },
});

export const emptyCart = () => ({
  type: EMPTY_CART,
});
