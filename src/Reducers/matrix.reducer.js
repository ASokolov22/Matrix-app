import {MatrixConstants} from '../Constants';

const initialState = {
    columns: 5,
    rows: 3,
    matrix: [],
    rowSumArray: [],
    average: [],
};

export function matrix(state = initialState, action){
    switch(action.type){
        case MatrixConstants.HANDLE_INPUT_CHANGE:
            return {
                ...state,
                [action.payload.id]: +action.payload.value
            };
        case MatrixConstants.SET_MATRIX:
            return {
                ...state,
                matrix: action.payload.matrix,
                rowSumArray: action.payload.rowSumArray,
                average: action.payload.average,
            };
        case MatrixConstants.ADD_ONE_ELEMENT: {
            return {
                ...state,
                matrix: JSON.parse(JSON.stringify(action.payload.matrix)),
                rowSumArray: action.payload.rowSumArray,
                average: action.payload.average,
            };
        }
        default:
            return state
    }
}