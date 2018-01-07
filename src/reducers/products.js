import { get, post } from '../api';

// Actions
const FETCH = 'products/FETCH';
const FETCH_SUCCESS = 'products/FETCH_SUCCESS';
const FETCH_ERROR = 'products/FETCH_ERROR';
const ADD_TO_CART = 'products/ADD_TO_CART';
const REMOVE_FROM_CART = 'products/REMOVE_FROM_CART';
const RESET_CART = 'products/RESET_CART';
const SEARCH = 'products/SEARCH';
const SIMILAR_SEARCH = 'products/SIMILAR_SEARCH';
// Reducer
const initialState = {
  loading: false,
  cart: [],
  products: [],
  similarProducts: [],
};
export default function reducer(state = initialState, action = {}) {
  let product;
  let i;
  console.log(action)
  switch (action.type) {
    case FETCH:
      return { ...state, loading: true };
    case FETCH_SUCCESS:
      return {
        ...state,
        products: action.payload.products,
        loading: false,
        error: null,
      };
    case FETCH_ERROR:
      return { ...state, error: action.payload.error, loading: false };
    case SEARCH:
      return { ...state, loading: true };
    case SIMILAR_SEARCH:
      return {
       ...state,
       loading: false,
       similarProducts: action.payload.similarProducts,
      };
    case ADD_TO_CART:
      product = state.cart.find(p => p.id === action.payload.product.id);
      if (product) {
        product.quantity += 1;
        return {
          ...state,
          cart: state.cart.slice(),
        };
      }
      product = action.payload.product;
      product.quantity = 1;
      return {
        ...state,
        cart: state.cart.slice().concat([action.payload.product]),
      };
    case REMOVE_FROM_CART:
      i = state.cart.findIndex(p => p.id === action.payload.product.id);
      if (state.cart[i].quantity === 1) {
        state.cart.splice(i, 1);
      } else {
        state.cart[i].quantity -= 1;
      }
      return {
        ...state,
        cart: state.cart.slice(),
      };
    case RESET_CART:
      return {
        ...state,
        cart: [],
      };
    default:
      return state;
  }
}

// Action Creators
export function addProductToCart(product) {
  return { type: ADD_TO_CART, payload: { product } };
}

export function removeProductFromCart(product) {
  return { type: REMOVE_FROM_CART, payload: { product } };
}

export function searchProduct(search_params) {
  return dispatch => {
    dispatch({ type: SEARCH });
    post('/product_search', { search_params } )
      .then(products =>
        dispatch({ type: FETCH_SUCCESS, payload: { products } }),
      )
      .catch(error => dispatch({ type: FETCH_ERROR, payload: { error } }));
  };
}

export function fetchSimilarProducts(product) {
  return dispatch => {
    dispatch({ type: FETCH });
    post('/similar_product_search', { product } )
      .then(similarProducts =>
        dispatch({ type: SIMILAR_SEARCH, payload: { similarProducts } }),
      )
      .catch(error => dispatch({ type: FETCH_ERROR, payload: { error } }));
  };
}

export function fetchProducts() {
  return dispatch => {
    dispatch({ type: FETCH });
    get('/products')
      .then(products =>
        dispatch({ type: FETCH_SUCCESS, payload: { products } }),
      )
      .catch(error => dispatch({ type: FETCH_ERROR, payload: { error } }));
  };
}

export function resetCart() {
  return { type: RESET_CART };
}
