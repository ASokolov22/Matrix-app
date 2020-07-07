import {MatrixConstants} from '../Constants';

export const matrixActions = {
    handleInputChange,
    setMatrix,
    addOneElement,
    addRow,
    deleteRow,
    findNearest,
    removeNearest,
    showPercent,
    deletePercent,
};
function handleInputChange(event){
    return {
        type: MatrixConstants.HANDLE_INPUT_CHANGE,
        payload: {
            value: event.target.value,
            id: event.target.id
        }
    }
}

function setMatrix(rows, columns){
    let rowArray = new Array(columns);
    for(let i = 0; i < rowArray.length; i++){
        rowArray[i] = new Array(rows);
    }

    let id = 1;
    for (let c = 0; c < rowArray.length; c++){
        for(let r = 0; r < rowArray[c].length; r++){
            rowArray[c][r] = function(){
                let rand = 100 + Math.random() * (999 + 1 - 100);
                return {
                    id,
                    value: Math.floor(rand)
                }
            }();
            id++;
        }
    }

    //Set sum
    let rowSum = 0;
    let rowSumArray = [];
    for (let r = 0; r < rowArray.length; r++){
        rowArray[r].map(item => {
            rowSum += item.value;
        });
        rowSumArray.push(rowSum);
        rowSum = 0;
    }

    //Set average array
    let columnArray = new Array(rows);
    for(let i = 0; i < columnArray.length; i++){
        columnArray[i] = new Array(columns);
    }
    for(let a = 0; a < columnArray.length; a++){
        for(let b = 0; b < rowArray.length; b++){
            columnArray[a][b] = rowArray[b][a].value;
        }
    }
    let average = [];
    columnArray.forEach(arr => {
        let sum = 0;
        for(let i = 0; i < arr.length; i++) {
            sum += arr[i];
        }
        average.push((sum / arr.length).toFixed(1));
        return sum / arr.length;
    });

    return {
        type: MatrixConstants.SET_MATRIX,
        payload: {
            matrix: rowArray,
            rowSumArray,
            average,
        }
    }
}

function addOneElement(id, matrix, rowSumArray, rows, columns){
    let row = 0;
    for(let a = 0; a < matrix.length; a++){
        for(let b = 0; b < matrix[a].length; b++){
            if(matrix[a][b].id === id){
                matrix[a][b].value += 1;
                row = a;
            }
        }
    }
    rowSumArray[row] = rowSumArray[row] +1;

    //Set average array
    let columnArray = new Array(columns);
    for(let i = 0; i < columnArray.length; i++){
        columnArray[i] = new Array(rows);
    }
    for(let a = 0; a < columnArray.length; a++){
        for(let b = 0; b < matrix.length; b++){
            columnArray[a][b] = matrix[b][a].value;
        }
    }

    let average = [];
    columnArray.forEach(arr => {
        let sum = 0;
        for(let i = 0; i < arr.length; i++) {
            sum += arr[i];
        }
        average.push((sum / arr.length).toFixed(1));
        return sum / arr.length;
    });

    return {
        type: MatrixConstants.ADD_ONE_ELEMENT,
        payload: {
            matrix,
            rowSumArray: rowSumArray,
            average,
        }
    }
}

function addRow(matrix, columns, rows, rowSumArray){

    let newRow = new Array(columns);
    let lastId = function(matrix){
        let arr = matrix[matrix.length - 1];
        let result = arr[arr.length - 1].id;

        return result;
    };
    let id = lastId(matrix) + 1;
    for (let c = 0; c < newRow.length; c++){
        newRow[c] = function(){
            let rand = 100 + Math.random() * (999 + 1 - 100);
            return {
                id,
                value: Math.floor(rand)
            }
        }();
        id++;
    }
    matrix.push(newRow);

    //Set sum
    let rowSum = 0;
    for (let r = 0; r < newRow.length; r++){
        rowSum += newRow[r].value;
    }
    rowSumArray.push(rowSum);

    //Set average array
    let columnArray = new Array(columns);
    for(let i = 0; i < columnArray.length; i++){
        columnArray[i] = new Array(rows);
    }
    for(let a = 0; a < columnArray.length; a++){
        for(let b = 0; b < matrix.length; b++){
            columnArray[a][b] = matrix[b][a].value;
        }
    }

    let average = [];
    columnArray.forEach(arr => {
        let sum = 0;
        for(let i = 0; i < arr.length; i++) {
            sum += arr[i];
        }
        average.push((sum / arr.length).toFixed(1));
        return sum / arr.length;
    });

    return {
        type: MatrixConstants.ADD_ROW,
        payload: {
            matrix,
            rowSumArray,
            average,
        }
    }
}

function deleteRow(matrix, index, rowSumArray){
    matrix.splice(index, 1);
    rowSumArray.splice(index, 1);

    //Set average array
    if(matrix[0]){
        let columnArray = new Array(matrix[0].length);
        for(let i = 0; i < columnArray.length; i++){
            columnArray[i] = new Array(matrix.length);
        }
        for(let a = 0; a < columnArray.length; a++){
            for(let b = 0; b < matrix.length; b++){
                columnArray[a][b] = matrix[b][a].value;
            }
        }
        let average = [];
        columnArray.forEach(arr => {
            let sum = 0;
            for(let i = 0; i < arr.length; i++) {
                if(arr[i]){
                    sum += arr[i];
                }
            }
            average.push((sum / (arr.length)).toFixed(1));
            return sum / arr.length;
        });

        return {
            type: MatrixConstants.DELETE_ROW,
            payload: {
                matrix,
                rowSumArray,
                average,
            }
        }
    } else {
        return {
            type: MatrixConstants.DELETE_ROW,
            payload: {
                matrix: [],
                rowSumArray: [],
                average: [],
            }
        }
    }

}

function findNearest(matrix, nearest, value){
    let arr = [];
    for(let a = 0; a < matrix.length; a++){
        for(let b = 0; b < matrix[a].length; b++){
            arr.push((matrix[a][b].value));
        }
    }
    const diff = arr.map(item => {
        return { id: item, diff: Math.abs(+item - +value) };
    });

    diff.sort((a, b) => a.diff - b.diff);

    const nearestArray = diff.slice(0, nearest).map(item => item.id).sort();

    return {
        type: MatrixConstants.FIND_NEAREST,
        payload: {
            nearestArray
        }
    }
}

function removeNearest(){
    return {
        type: MatrixConstants.REMOVE_NEAREST,
        payload: {}
    }
}

function showPercent(matrix, i, sum){
    let percentArr = matrix[i].map(item => (
        item.value / sum * 100).toFixed(1) + '%'
    );
    return {
        type: MatrixConstants.SHOW_PERCENT,
        payload: {
            percentArr,
            percentIndex: i
        }
    }
}

function deletePercent(){
    return {
        type: MatrixConstants.DELETE_PERCENT,
        payload: {}
    }
}