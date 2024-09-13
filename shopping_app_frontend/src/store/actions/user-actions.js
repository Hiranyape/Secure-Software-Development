import { GetData, PostData } from '../../utils'
import { Action } from '../actions'

const CUSTOMER_SERVICE = '/customer'; 

// Function to set authentication token
export const SetAuthToken = async(token) => {
  if(token){
      localStorage.setItem('token', token);
  }else{
      localStorage.clear();
  }
}
 
// Function to handle user signup
export const onSignup = ({email, password, phone}) => async(dispatch) => {
  try {
    // Use the base URL for signup
    const response = await PostData(`${CUSTOMER_SERVICE}/signup`, { email, password, phone });
    const { token } = response.data;
    await SetAuthToken(token);
    return dispatch({ type:  Action.SIGNUP, payload: response.data });
  } catch (err) {
    console.log(err)
  }
};

// Function to handle user login
export const onLogin = ({email, password}) => async(dispatch) => {
  try {
    // Use the base URL for login
    const response = await PostData(`${CUSTOMER_SERVICE}/login`, { email, password });
    const { token } = response.data;
    await SetAuthToken(token);
    return dispatch({ type:  Action.LOGIN, payload: response.data });
  } catch (err) {
    console.log(err)
  }
};

// Function to view user profile
export const onViewProfile = () => async(dispatch) => {
  try {
    // Use the base URL for profile
    const response = await GetData(`${CUSTOMER_SERVICE}/profile`);
    return dispatch({ type:  Action.PROFILE, payload: response.data });
  } catch (err) {
    console.log(err)
  }
};
