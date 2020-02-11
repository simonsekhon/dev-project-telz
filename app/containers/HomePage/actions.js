/*
 * Actions related to Sign in to Telzio
 */

import {
  REQUEST,
  SUCCESS,
  FAILURE,
  TELZIO_SIGNIN_URL
} from '../../constants';
import Axios from 'axios';
import { push } from 'react-router-redux';

const request = () => {
  return {
    type: REQUEST,
  };
}

const error = (error) => {
  return {
    type: FAILURE,
    error,
  };
}

const success = () => {
  return {
    type: SUCCESS,
  };
}

const signInUser = (Username, Password) => {
  return (dispatch) => {
    dispatch(request())
    const params = {
      Username,
      Password,
      TwoFactorToken: null,
      DeviceId: "120349i23049i23904",
      UserAgent: "simon-demo-app"
    }
    return Axios.post(TELZIO_SIGNIN_URL, params).then(response => {
      if (!response.data.Success) {
        const err = response.data.ErrorMessage;
        dispatch(error(err))
      } else if (response.data.Success) {
        const token = response.data.ClaimsToken;
        sessionStorage.setItem('claimstoken', token);
        dispatch(success())
        dispatch(push('/voicemaildetails'));
      }
    }).catch(err => {
      dispatch(error(err))
      console.error(err);
    })
  }
}


export {
  signInUser
}
