import React, { Component } from 'react';
import './Board.css';
class Board extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cells: [],
        };

    }

    render() {
        console.log(this.prop); // i can import settings hier instead props
        const { rows, cols } = this.props;
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                this.state.cells.push(<div key={`${row},${col}`} className='cell'></div>);
            }
        }
        return (
            <div className="grid">
                {this.state.cells}/>
            </div>
        )
    }
}

export default Board;
