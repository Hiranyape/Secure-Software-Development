import { GetData, PostData } from '../../utils'
import { Action } from '../actions'

const CUSTOMER_SERVICE = '/customer'; 

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

export const onLogin = ({email, password}) => async(dispatch) => {
  try {
    const response = await PostData(`${CUSTOMER_SERVICE}/login`, { email, password });
    const { token } = response.data;
    await SetAuthToken(token);
    return dispatch({ type:  Action.LOGIN, payload: response.data });
  } catch (err) {
    console.log(err)
  }
};

export const onViewProfile = () => async(dispatch) => {
  try {
    const response = await GetData(`${CUSTOMER_SERVICE}/profile`);
    return dispatch({ type:  Action.PROFILE, payload: response.data });
  } catch (err) {
    console.log(err)
  }
}

export const onGoogleSignIn = () => {
  localStorage.setItem("googleAuthIntent", "signIn");
  const googleOAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=382807774945-2irksaaiaqr613v7mlnsoe3sien9vds3.apps.googleusercontent.com&redirect_uri=http://localhost/auth/google/callback&response_type=code&scope=openid%20email%20profile`;
  window.location.href = googleOAuthUrl;
}

export const onGoogleSignUp = () => {
  localStorage.setItem("googleAuthIntent", "signUp");
  const googleOAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=382807774945-2irksaaiaqr613v7mlnsoe3sien9vds3.apps.googleusercontent.com&redirect_uri=http://localhost/auth/google/callback&response_type=code&scope=openid%20email%20profile`;
  window.location.href = googleOAuthUrl;
}

export const handleGoogleCallback = (code) => async (dispatch) => {
    try {
      const response = await PostData(`${CUSTOMER_SERVICE}/google-login`, { authorizationCode: code });
      
      console.log('Full response:', response);
      
      const { token } = response.data.data; 
      if (token) {
        await SetAuthToken(token);
        console.log(`token: ${token}`);
        return dispatch({ type: Action.LOGIN, payload: response.data.data });
      } else {
        console.log("Token not found in response");
      }
    } catch (err) {
      console.log("Error occurred:", err);
    }
};

export const handleGoogleCallbackSignUp = (code) => async (dispatch) => {
  try {
    const response = await PostData(`${CUSTOMER_SERVICE}/google-signup`, { authorizationCode: code });
    
    console.log('Full response:', response);
    
    const { token } = response.data.data; 
    if (token) {
      await SetAuthToken(token);
      console.log(`token: ${token}`);
      return dispatch({ type: Action.SIGNUP, payload: response.data.data });
    } else {
      console.log("Token not found in response");
    }
  } catch (err) {
    console.log("Error occurred:", err);
  }
};

