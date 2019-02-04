import React from 'react';
import SnakeSettings from '../settings.json';
import './Board.css';

const Apple = (props) => {
    console.log(props)
    return (<div className="apple" key={`${props.x},${props.y}`}
        style={{ left: props.x * SnakeSettings.gridSize, top: props.y * SnakeSettings.gridSize }} />
    );
}

export default Apple
