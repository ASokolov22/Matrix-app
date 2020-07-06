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
                    <Button type="submit" className={classes.setBtn}>Submit
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
                    <TableBody>
                        {matrix.map((row, i) => (
                            <TableRow key={row[0].id}>
                                {row.map(cell => (
                                    <TableCell
                                        key={cell.id}
                                        className={showNearest(cell.value, nearestArray)}
                                        onClick={() => handleCellClick(cell.id)}
                                        onMouseOver={() => findNearest(matrix, nearest, cell.value)}
                                    >{cell.value}
                                    </TableCell>
                                ))}
                                <TableCell className={classes.smallColumn}>
                                    {rowSumArray[i]}
                                </TableCell>
                                <TableCell className={classes.smallColumn}>
                                    <DeleteIcon onClick={() => deleteRow(matrix, i, rowSumArray, columns, rows)}/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            {average.map(item => (
                                <TableCell>{item}</TableCell>
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
    const {columns, rows, nearest, matrix, rowSumArray, average, nearestArray} = state.matrix;

    return {
        columns,
        rows,
        nearest,
        matrix,
        rowSumArray,
        average,
        nearestArray,
    }
};
const mapDispatchToProps = {
    handleInputChange: matrixActions.handleInputChange,
    setMatrix: matrixActions.setMatrix,
    addOneElement: matrixActions.addOneElement,
    addRow: matrixActions.addRow,
    deleteRow: matrixActions.deleteRow,
    findNearest: matrixActions.findNearest,
};
export const MatrixComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(Matrix);