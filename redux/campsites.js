import * as ActionTypes from './ActionTypes';
// import ActionTypes from './ActionTypes';

const defaultState = { isLoading: true, errMess: null, campsites: []}

export const campsites = (state=defaultState , action) => {
    switch (action.type) {
        case ActionTypes.ADD_CAMPSITES:
            return {...state, isLoading: false, errMess: null, campsites: action.payload};

        case ActionTypes.CAMPSITES_LOADING:
            return {...state, isLoading: true, errMess: null, campsites: []}

        case ActionTypes.CAMPSITES_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
          return state;
      }
};