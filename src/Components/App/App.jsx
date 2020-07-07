import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Container} from '@material-ui/core'
import {MatrixComponent} from '../Matrix/Matrix';

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