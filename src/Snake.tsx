import { throws } from 'assert';
import React from 'react';
import './Snake.css';
import { isThisTypeNode } from 'typescript';

class Snake extends React.Component <any, any>{
    // var arr: number[][] = []
    // var score: number = 0
    state = {
        height : 30,
        width : 30,
        grid: [],
        score: 0,
        snake: [{x: 1, y: 1}],
        food: {x : 10, y: 10},
        gameOver: false,
        positionMoving: "",
        previousPosition: ""
    }

    isSnakeInThisPosition = (pos: any) =>
        this.state.snake.find((part) => part.x === pos.x && part.y === pos.y);

    componentDidMount = () => this.tick()

    tick = () => {
        setTimeout(this.tick, 1000 / Math.sqrt(this.state.score + 1));
        if(this.state.gameOver) return
        var snake = this.state.snake
        var snakeHead = this.state.snake[0]
        var nextPosition = {x: snakeHead.x, y: snakeHead.y}
        if(this.state.positionMoving === "left") {
            nextPosition.x = snakeHead.x - 1 < 0 ? this.state.width - 1: snakeHead.x - 1
        } else if(this.state.positionMoving === "right") {
            nextPosition.x = snakeHead.x + 1 >= this.state.width ? 0 : snakeHead.x +1
        } else if(this.state.positionMoving === "up") {
            nextPosition.y = snakeHead.y - 1  < 0 ? this.state.height - 1: snakeHead.y - 1
        } else {
            nextPosition.y = snakeHead.y + 1 >= this.state.height ? 0 : snakeHead.y +1
        }

        //check to see if game ends
        if(nextPosition.x === -1 || nextPosition.x === this.state.width + 1 ||
            nextPosition.y === -1 || nextPosition.y === this.state.height + 1 ||
            this.isSnakeInThisPosition(nextPosition)) {
                this.gameOver()
        } else {
            snake.unshift(nextPosition)
            console.log(snake)
            if(this.state.snake.length > this.state.score + 1) {
                snake.pop()
            }
            console.log(snake)
            this.setState({snake: snake})
            this.step()
        }
    }

    step = () => {
        if (this.state.food.x === this.state.snake[0].x &&
            this.state.food.y === this.state.snake[0].y) {
            this.setState({
                score: this.state.score + 1
            })
            this.getRandomFoodLocation()
        }
        // this.setState({food: {x : 10, y: 10}})

    }

    drawGrid(){
        var grid = []
        console.log(this.state.food.x +", " + this.state.food.y)
        for(var y = 0; y < this.state.height; y++) {
            for(var x = 0; x < this.state.width; x++) {
                if(y === this.state.food.y && x === this.state.food.x) {
                    grid.push("🥩")
                    continue
                }
                var flag = true
                for(var i = 0; i < this.state.snake.length; i++) {
                    if (y === this.state.snake[i].y && x === this.state.snake[i].x) {
                        grid.push("⬛️")
                        flag = false
                    }
                }
                if (flag) {
                    grid.push("⬜️")
                }
            }
            grid.push(<br/>)
        }
        return grid
    }

    getRandomFoodLocation = () => {
        var newFood = {x: 0, y: 0}
        do {
            newFood.y = Math.floor(Math.random() * this.state.height)
            newFood.x = Math.floor(Math.random() * this.state.width)
        } while (this.isSnakeInThisPosition(newFood))
        console.log(newFood)
        this.setState({food: newFood})
    }

    gameOver = () => {
        this.setState({gameOver : true})
    }

    newGame = () => {
        this.setState({
            gameOver : false,
            snake: [{x: 1, y: 1}],
            score: 0,
            positionMoving: 'down'
        })
        this.getRandomFoodLocation()
    }

    move = (movement: string) => {
        // var newMovement = this.state.positionMoving
        // if((this.state.previousPosition === "left" && movement !== "right") ||
        //    (this.state.previousPosition === "right" && movement !== "left") ||
        //    (this.state.previousPosition === "up" && movement !== "down") ||
        //    (this.state.previousPosition === "down" && movement !== "up")) {
        //        newMovement = movement
        //     }
        this.setState({
            positionMoving: movement
        })
    }

    render() {
        return (
            <div>
                <h1>Snake</h1>
                <br/>
                <h1>{this.state.score}</h1>
                {this.drawGrid()}
                <br />
                <button onClick={this.newGame}>New Game</button>
                <button onClick={() => this.move("left")}>◀️</button>
                <button onClick={() => this.move("up")}>🔼</button>
                <button onClick={() => this.move("down")}>🔽</button>
                <button onClick={() => this.move("right")}>▶️</button>
                <button onClick={this.gameOver}>End Game</button>
                <br />
                <br />
            </div>
        );
    }
}

export default Snake;
