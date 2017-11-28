import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(){
    super()
    this.state = {
      board:[
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ]
    }
    this.nextGeneration = this.nextGeneration.bind(this)
    this.getLivingNeighbors = this.getLivingNeighbors.bind(this)
  }
  getLivingNeighbors(x, y){
    let livingNeighbors = 0
    let board = this.state.board
    if (y > 0){
      if (board[y - 1][x]){
        livingNeighbors += 1
      }
      if (x < board.length - 1){
        if (board[y - 1][x + 1]){
          livingNeighbors += 1
        }
      }
      if (x > 0){
        if (board[y - 1][x - 1]){
          livingNeighbors += 1
        }
      }
    }
    if (x > 0) {
      if (board[y][x - 1]){
        livingNeighbors += 1
      }
    }
    if (x < board.length - 1){
      if (board[y][x + 1]){
        livingNeighbors += 1
      }
    }

    if (y < board.length - 1){
      if (board[y + 1][x]) {
        livingNeighbors += 1
      }
      if (x < board.length - 1) {
        if (board[y + 1][x + 1]) {
          livingNeighbors += 1
        }
      }
      if (x > 0) {
        if (board[y + 1][x - 1]) {
          livingNeighbors += 1
        }
      }
    }
    return livingNeighbors
  }
  nextGeneration(){
    let result = []
    let board = this.state.board
    this.state.board.forEach((row, y) => {
      result.push([])
      row.forEach((cell, x) => {
        let livingNeighbors = this.getLivingNeighbors(x, y)
        if (livingNeighbors === 3 || (livingNeighbors === 2 && board[y][x])){
          result[y].push(1)
        }else{
          result[y].push(0)
        }
      })
    })
    this.setState({
      board: result
    })
  }
  componentDidMount(){
    setInterval(() => this.nextGeneration(), 500);
  }
  render(){
    return (
      <div className="App">
        {
          this.state.board.map((row, i) => {
            return (
              <div key={i} className="row">
                {
                  row.map((cell, j) => {
                    return (<div key={j} className={cell?'viva':'muerta'}></div>)
                  })
                }
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default App;
