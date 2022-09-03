// import {
//   PRODUCT_LIST_REQUEST,
//   PRODUCT_LIST_SUCCESS,
//   PRODUCT_LIST_FAIL,
// } from '../constants/productConstants';

import * as actions from '../constants/productConstants';

export const productListReducers = (state = { products: [] }, action) => {
  switch (action.type) {
    case actions.PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };

    case actions.PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };

    case actions.PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const productDetailsReducers = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case actions.PRODUCT_DETAILS_REQUEST:
      return { loading: true, product: [] };

    case actions.PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };

    case actions.PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
