import React from 'react';
import SnakeSettings from '../settings.json';

const Snake = (props) => {
    const head = props.head;
    const tail = props.tail;
    console.log(props);

    return (
        <div>
            <div className="head" key={`${head.row},${head.col}`} style={{ left: head.row * SnakeSettings.gridSize, top: head.col * SnakeSettings.gridSize }}></div>
            {tail.map(tailPart => <div className="tail" key={`${tailPart.row},${tailPart.col}`} style={{ left: tailPart.row * SnakeSettings.gridSize, top: tailPart.col * SnakeSettings.gridSize }}></div>)}
        </div>
    );
}

export default Snake;