import React, { Component } from "react";
import Board from "./Board";
import Apple from "./Apple";
import Snake from "./Snake";
import ScoreField from "./ScoreField";
import SnakeSettings from "../settings.json";

class Game extends Component {
  constructor() {
    super();

    this.state = {
      apple: this.createRandomApple(),
      snake: {
        head: {
          row: 4,
          col: 4
        },
        direction: {
          x: 1,
          y: 0
        },
        tail: []
      }
    };
  }

  componentDidMount = () => {
    document.addEventListener("keydown", e => {
      this.changeSnakeDirection(e);
    });

    setInterval(() => {
      this.gameLoop();
    }, SnakeSettings.speed);
  };

  gameLoop = () => {
    this.setState(
      ({ snake, apple }) => {
        const eatApple = this.eatApple();
        const nextState = {
          snake: {
            ...snake,
            head: {
              row: snake.head.row + snake.direction.x,
              col: snake.head.col + snake.direction.y
            },
            tail: [snake.head, ...snake.tail]
          },
          apple: eatApple ? this.moveApple() : apple
        };
        if (!eatApple) nextState.snake.tail.pop();
        return nextState;
      },
      () => {
        const { snake } = this.state;
        if (this.isOffEdge() || this.isTail(snake.head)) {
          this.setState({
            gameOver: true
          });
          return;
        }
      }
    );
  };

  moveApple = () => {
    const { snake } = this.state;
    const newApple = this.createRandomApple();
    if (this.moveAppleTimeout || this.eatApple())
      clearTimeout(this.moveAppleTimeout);

    this.setState({ apple: newApple });
    this.moveAppleTimeout = setTimeout(
      this.moveApple,
      SnakeSettings.appleInterval
    );

    if (
      this.isTail(newApple) ||
      (snake.head.row === newApple.row && snake.head.col === newApple.col)
    ) {
      return this.moveApple();
    }

    return newApple;
  };

  createRandomApple = () => {
    const newApple = {
      row: Math.floor(Math.random() * SnakeSettings.gridSize),
      col: Math.floor(Math.random() * SnakeSettings.gridSize)
    };
    return newApple;
  };
  eatApple = () => {
    const { apple, snake } = this.state;
    return apple.row === snake.head.row && apple.col === snake.head.col;
  };

  isTail = cell => {
    const { snake } = this.state;
    return snake.tail.find(
      inTail => inTail.row === cell.row && inTail.col === cell.col
    );
  };

  isOffEdge = () => {
    const { snake } = this.state;

    if (
      snake.head.col > SnakeSettings.gridSize - 1 ||
      snake.head.col < 0 ||
      snake.head.row > SnakeSettings.gridSize - 1 ||
      snake.head.row < 0
    ) {
      return true;
    }
  };

  changeSnakeDirection(e) {
    const x = this.state.snake.direction.x;
    const y = this.state.snake.direction.y;

    switch (e.keyCode) {
      case 38: // up key pressed
        if (y === 1) return;
        this.setState(({ snake }) => ({
          snake: {
            ...snake,
            direction: {
              x: 0,
              y: -1
            }
          }
        }));
        break;

      case 40: // down key pressed
        if (y === -1) return;
        this.setState(({ snake }) => ({
          snake: {
            ...snake,
            direction: {
              x: 0,
              y: 1
            }
          }
        }));
        break;

      case 37: // left key pressed
        if (x === 1) return;
        this.setState(({ snake }) => ({
          snake: {
            ...snake,
            direction: {
              x: -1,
              y: 0
            }
          }
        }));
        break;

      case 39: // right key pressed
        if (x === -1) return;
        this.setState(({ snake }) => ({
          snake: {
            ...snake,
            direction: {
              x: 1,
              y: 0
            }
          }
        }));
        break;

      default:
        break;
    }
  }

  render() {
    const { gameOver, snake } = this.state;
    return (
      <div className="game">
        {gameOver ? (
          <div>
            <h1>Game Over! You scored {snake.tail.length}!</h1>
          </div>
        ) : (
          <div>
            <Board
              rows={SnakeSettings.gridSize}
              cols={SnakeSettings.gridSize}
            />
            <Apple x={this.state.apple.row} y={this.state.apple.col} />
            <Snake head={this.state.snake.head} tail={this.state.snake.tail} />
            <ScoreField score={this.state.snake.tail.length} />
          </div>
        )}
      </div>
    );
  }
}

export default Game;
