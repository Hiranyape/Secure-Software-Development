import { Action } from '.';
import { DeleteData, GetData, PostData, PutData } from '../../utils';

const PRODUCT_SERVICE = '/products'; 
const CUSTOMER_SERVICE = '/customer'; 
const SHOPPING_SERVICE = '/shopping';

export const onGetProducts = (payload) => async(dispatch) => {
  try {
    const response = await GetData(`${PRODUCT_SERVICE}/`);
    dispatch({ type:  Action.LANDING_PRODUCTS, payload: response.data });
  } catch (err) {
    console.log(err)
  }
};

export const onGetProductDetails = (id) => async(dispatch) => {
  try {
    const response = await GetData(`${PRODUCT_SERVICE}/${id}`);
    dispatch({ type:  Action.PRODUCT_DETAILS, payload: response.data });
  } catch (err) {
    console.log(err)
  }
};

export const onAddToWishlist = (_id) => async(dispatch) => {
  try {
    const response = await PutData(`${PRODUCT_SERVICE}/wishlist`, { _id });
    dispatch({ type:  Action.ADD_TO_WISHLIST, payload: response.data });
  } catch (err) {
    console.log(err)
  }
};

export const onRemoveFromWishlist = (_id) => async(dispatch) => {
  try {
    const response = await DeleteData(`${PRODUCT_SERVICE}/wishlist/${_id}`);
    dispatch({ type:  Action.REMOVE_FROM_WISHLIST, payload: response.data });
  } catch (err) {
    console.log(err)
  }
};

export const onAddToCart = ({ _id, qty }) => async(dispatch) => {
  try {
    const response = await PutData(`${PRODUCT_SERVICE}/cart`, { _id, qty });
    dispatch({ type:  Action.ADD_TO_CART, payload: response.data });
  } catch (err) {
    console.log(err)
  }
};

export const onRemoveFromCart = (_id) => async(dispatch) => {
  try {
    const response = await DeleteData(`${PRODUCT_SERVICE}/cart/${_id}`);
    dispatch({ type:  Action.REMOVE_FROM_CART, payload: response.data });
  } catch (err) {
    console.log(err)
  }
};

export const onCreateAddress = ({ street, postalCode, city, country }) => async(dispatch) => {
  try {
    const response = await PostData(`${CUSTOMER_SERVICE}/address/`, { street, postalCode, city, country });
    dispatch({ type:  Action.ADDED_NEW_ADDRESS, payload: response.data });
  } catch (err) {
    console.log(err)
  }
};

export const onPlaceOrder = ({ txnId }) => async(dispatch) => {
  try {
    const response = await PostData(`${SHOPPING_SERVICE}/order/`, { txnId });
    console.log(response.data, 'ORDER');
    dispatch({ type:  Action.PLACE_ORDER, payload: response.data });
  } catch (err) {
    console.log(err)
  }
};
