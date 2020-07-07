import React from 'react';
import {connect} from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import {matrixActions} from '../../Actions';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: 50,
            },
            '& .MuiFormLabel-root': {
                color: '#fff'
            },
            '& .MuiButton-root:hover': {
                backgroundColor: '#218838',
            },
            display: 'flex',
            alignItems: 'center',
        },
        appBar: {
            backgroundColor: '#1976d2',
            '& .MuiAppBar-root': {
                alignItems: 'center',
            },
        },
        input: {
            '& .MuiInputBase-root' : {
                color: '#fff'
            }
        },
        setBtn: {
            color: '#fff',
            backgroundColor: '#28a745',
        },
        table: {
            minWidth: 650,
        },
        smallColumn: {
            width: '2rem',
            backgroundColor: '#FAFAFA',
        },
        nearest: {
            backgroundColor: '#9CFE8B',
            transitionProperty: 'background',
            transitionDuration: '0.5s',
            transitionTimingFunction: 'ease',
        },
        progress: {
            position: 'absolute',
            left: '0',
            top: '0',
            bottom: '0',
            right: '0',
            padding: '16px',
            // backgroundColor: '#9CFE8B',
            backgroundColor: '#fff',
        }
    }),
);

let Matrix = ({
    columns,
    rows,
    nearest,
    handleInputChange,
    setMatrix,
    matrix,
    addOneElement,
    rowSumArray,
    average,
    addRow,
    deleteRow,
    findNearest,
    nearestArray,
    removeNearest,
    showPercent,
    deletePercent,
    percentArr,
    percentIndex,
}) => {

    const classes = useStyles();

    const submitForm = event => {
        event.preventDefault();
        setMatrix(columns, rows);
    };

    const handleCellClick = (id) => {
        addOneElement(id, matrix, rowSumArray, rows, columns);
    };

    const handleAddRow = (event) => {
        event.preventDefault();
        addRow(matrix, columns, rows, rowSumArray)
    };

    const showNearest = (element, nearestArray) => {
        if(nearestArray.indexOf(element) !== -1){
            return classes.nearest;
        }
    };

    return (
        <>
            <AppBar className={classes.appBar} position="static">
                <form className={classes.root} noValidate autoComplete="off" onSubmit={submitForm}>
                    <TextField
                        label="Columns"
                        onChange={handleInputChange}
                        id="columns"
                        value={columns}
                        size="small"
                        className={classes.input}
                    />
                    <TextField
                        label="Rows"
                        onChange={handleInputChange}
                        id="rows"
                        value={rows}
                        size="small"
                        className={classes.input}
                    />
                    <TextField
                        label="Nearest"
                        onChange={handleInputChange}
                        id="nearest"
                        value={nearest}
                        size="small"
                        className={classes.input}
                    />
                    <Button
                        type="submit"
                        className={classes.setBtn}
                        disabled={columns < 1 || rows < 1}
                    >Submit
                    </Button>
                </form>
            </AppBar>
        {matrix && matrix.length ? (
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={columns}/>
                            <TableCell className={classes.smallColumn}>
                                Quantity
                            </TableCell>
                            <TableCell className={classes.smallColumn}>
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody
                        onMouseOut={removeNearest}
                    >
                        {matrix.map((row, i) => (
                            <TableRow key={row[0].id}>
                                {row.map((cell, index) => (
                                    <TableCell
                                        key={cell.id}
                                        style={{
                                            position: 'relative'
                                        }}
                                        className={showNearest(cell.value, nearestArray)}
                                        onClick={() => handleCellClick(cell.id)}
                                        onMouseOver={() => findNearest(matrix, nearest, cell.value)}
                                    >
                                        {(i === percentIndex) ? percentArr[index] : cell.value}
                                        <div
                                            style = {{
                                                position: 'absolute',
                                                left: '0',
                                                top: '0',
                                                bottom: '0',
                                                width: (i === percentIndex) ? percentArr[index] : '0px',
                                                padding: '16px',
                                                backgroundColor: (i === percentIndex) ? '#9CFE8B' :'#fff',
                                                opacity: (i === percentIndex) ? '0.5' : '0'
                                            }}
                                        />
                                    </TableCell>
                                ))}
                                <TableCell
                                    onMouseOver={() => showPercent(matrix, i, rowSumArray[i])}
                                    onMouseOut = {deletePercent}
                                    className={classes.smallColumn}
                                >
                                    {rowSumArray[i]}
                                </TableCell>
                                <TableCell className={classes.smallColumn}>
                                    <DeleteIcon onClick={() => deleteRow(matrix, i, rowSumArray)}/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            {average.map(item => (
                                <TableCell
                                    key={item}
                                >{item}</TableCell>
                            ))}
                        </TableRow>
                    </TableFooter>
                </Table>
                <Button
                    className={classes.setBtn}
                    onClick={handleAddRow}
                >Add Row
                </Button>
            </TableContainer>
        ) : null}
        </>
    )
};

const mapStateToProps = (state) => {
    const {
        columns,
        rows,
        nearest,
        matrix,
        rowSumArray,
        average,
        nearestArray,
        percentArr,
        percentIndex
    } = state.matrix;

    return {
        columns,
        rows,
        nearest,
        matrix,
        rowSumArray,
        average,
        nearestArray,
        percentArr,
        percentIndex,
    }
};
const mapDispatchToProps = {
    handleInputChange: matrixActions.handleInputChange,
    setMatrix: matrixActions.setMatrix,
    addOneElement: matrixActions.addOneElement,
    addRow: matrixActions.addRow,
    deleteRow: matrixActions.deleteRow,
    findNearest: matrixActions.findNearest,
    removeNearest: matrixActions.removeNearest,
    showPercent: matrixActions.showPercent,
    deletePercent: matrixActions.deletePercent,
};
export const MatrixComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(Matrix);