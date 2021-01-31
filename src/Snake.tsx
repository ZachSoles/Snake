import { throws } from 'assert';
import React from 'react';
import { isThisTypeNode } from 'typescript';

class Snake extends React.Component <any, any>{
    // var arr: number[][] = []
    // var score: number = 0
    constructor(props: any) {
        super(props)
        this.state = {
            height : 100,
            width : 100,
            grid: [],
            score: 0,
            snake: {x: 1, y: 1},
            snakeLength: 1,
            food: {x : 2, y: 2},
            gameOver: false,
            didEat: false
        }
    }

    growSnake(num: Number) {
        this.setState({
            snakeLength: num,
            didEat: true
        })
    }

    drawGrid(){
        var grid = []
        var str = ""
        for(var i = 0; i < this.state.height; i++) {
            for(var k = 0; k < this.state.width; k++) {
                if(i === this.state.food.x && k === this.state.food.y) {
                    grid.push("food")
                }
                if (i === this.state.snake.x && k === this.state.snake.y) {
                    grid.push("snake")
                } else {
                    grid.push("space")
                }
            }
        }
        return grid
    }

    getRandomFoodLocation() {
        var randomY = Math.floor(Math.random() * this.state.height) + 1
        var randomX = Math.floor(Math.random() * this.state.width) + 1
        this.setState({
            didEat : false,
            food: {randomX, randomY}
        })
    }

    gameOver() {
        this.setState({
            gameOver : false
        })
    }

    // var str: String = ""
    render() {
        return (
            <div>
                <p>Snake</p>
                {
                    this.drawGrid()

            }
        {(() => {
            for(var i = 0; i < this.state.height; i++) {
                for(var k = 0; k < this.state.width; k++) {
                    <p>{this.state.grid[i][k]}</p>
                }
            }
        })}
            </div>
        );
    }
}

export default Snake;
