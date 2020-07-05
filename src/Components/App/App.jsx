import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Container} from '@material-ui/core'
import {MatrixComponent} from '../Matrix/Matrix';

require('react-dom');
window.React2 = require('react');
console.log(window.React1 === window.React2);

class App extends Component {

    render(){

        return (
            <Container maxWidth="lg">
                <MatrixComponent/>
            </Container>
        )
    }
}

const connectedApp = connect(state => {
    const {columns, rows} = state.matrix;
    return {
        columns,
        rows,
    };
}, {

})(App);


export default App = connectedApp;