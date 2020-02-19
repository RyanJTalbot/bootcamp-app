import * as ActionTypes from "./ActionTypes";

export function favorites(state=[], action){
    switch(action.type){
        case ActionTypes.ADD_FAVORITE:
            if(state.includes(action.payload)){
                return state;
            }
            return state.concat(action.payload);

        case ActionTypes.DELETE_FAVORITE:
            return state.filter(fav => fav != action.payload);

        default:
            return state;
    }
}
