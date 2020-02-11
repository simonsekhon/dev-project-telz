import { SUCCESS, REQUEST, FAILURE } from '../../constants';

// The initial state of the App
export const initialState = {
    loading: false,
    error: false,
    voiceMailData: false
};

const voiceMailDetailsReducer = (state = initialState, action) => {
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
                voiceMailData: action.data
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

export default voiceMailDetailsReducer;
