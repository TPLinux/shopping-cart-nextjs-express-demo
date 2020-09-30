import {
  ADD_PRODUCT,
  EDIT_COUNT,
  REMOVE_PRODUCT,
  EMPTY_CART,
} from "../actions/cartActions";

const actions = {
  addPrd: (state, action) => {
    action.payload.count = 1;
    let { cart } = state;
    let isExists = cart.find((p) => p._id == action.payload._id);
    if (isExists) {
      let existsPrd = cart.filter((p) => p._id == action.payload._id)[0];
      existsPrd.count += 1;
    } else {
      cart.push(action.payload);
    }
    return { ...state, cart };
  },
  removePrd: (state, action) => {
    let { cart } = state;
    return { ...state, cart: cart.filter((p) => p._id != action.payload) };
  },
  editCount: (state, action) => {
    let { cart } = state;
    return {
      ...state,
      cart: cart.map((p) => {
        if (p._id == action.payload.productID) {
          p.count = action.payload.newCount;
        }
        return p;
      }),
    };
  },
  emptyCart: (state) => {
    return { ...state, cart: [] };
  },
};

const cartReducer = (state = { cart: [] }, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return actions.addPrd(state, action);
    case REMOVE_PRODUCT:
      return actions.removePrd(state, action);
    case EDIT_COUNT:
      return actions.editCount(state, action);
    case EMPTY_CART:
      return actions.emptyCart(state);
    default:
      return { ...state };
  }
};

export default cartReducer;
