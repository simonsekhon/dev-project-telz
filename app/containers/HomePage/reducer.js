import { SUCCESS, REQUEST, FAILURE } from '../../constants';

// The initial state of the App
const initialState = {
  loading: false,
  error: false
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST: {
      const newState = {
          ...state,
          loading: true,
          error: false,
      };

      return newState;
    }
    case SUCCESS: {
        const newState = {
            ...state,
            loading: false,
            error: false,
        };
        return newState;
    }
    case FAILURE: {
        const newState = {
            ...state,
            loading: false,
            error: action.error
        };
        return newState;
    }
    default:
        return state;
  }
}

export default homeReducer;
