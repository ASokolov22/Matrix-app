import {MatrixConstants} from '../Constants';

const initialState = {
    columns: 5,
    rows: 5,
    nearest: 1,
    matrix: [],
    rowSumArray: [],
    average: [],
    nearestArray: [],
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
                nearestArray: [],
            };
        }
        case MatrixConstants.ADD_ROW: {
            return {
                ...state,
                matrix: JSON.parse(JSON.stringify(action.payload.matrix)),
                rowSumArray: action.payload.rowSumArray,
                average: action.payload.average,
                nearestArray: [],
            }
        }
        case MatrixConstants.DELETE_ROW:
            return {
                ...state,
                matrix: JSON.parse(JSON.stringify(action.payload.matrix)),
                rowSumArray: action.payload.rowSumArray,
                rows: state.rows - 1,
                average: action.payload.average,
                nearestArray: [],
            };
        case MatrixConstants.FIND_NEAREST:
            return {
                ...state,
                nearestArray: action.payload.nearestArray,
            };
        default:
            return state
    }
}