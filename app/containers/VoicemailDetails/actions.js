import {
    REQUEST,
    SUCCESS,
    FAILURE,
    TELZIO_VOICEMAILDATA_URL
  } from '../../constants';
  import Axios from 'axios';
  
  
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
  
  const success = (data) => {
    return {
      type: SUCCESS,
      data
    };
  }

  const getVoiceMailDetails = (token, take = 10, before = null) => {
    return (dispatch) => {
      dispatch(request())
      return Axios.get(`${TELZIO_VOICEMAILDATA_URL}?Take=${take}&Before=${before}`, {headers: { "Authorization": `Bearer ${token}`}}).then(response => {
        if (!response.data.Success) {
          const err = response.data.err.message
          dispatch(error(err))
        } else if (response.data.Success) {
          const data = response.data.Data;
          dispatch(success(data))
        }
      })
    }
  }

  export {
    getVoiceMailDetails
  }