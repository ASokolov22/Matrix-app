import {combineReducers} from 'redux';
import {matrix} from './matrix.reducer';

const rootReducer = combineReducers({
    matrix,
});

export default rootReducer;