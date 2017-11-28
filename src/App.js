import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      gridSize: 20,
    }
    this.nextGeneration = this.nextGeneration.bind(this)
    this.getLivingNeighbors = this.getLivingNeighbors.bind(this)
    this.play = this.play.bind(this)
    this.stop = this.stop.bind(this)
    this.swapCell = this.swapCell.bind(this)
    this.clearGrid = this.clearGrid.bind(this)
    this.setGridSize = this.setGridSize.bind(this)
    this.randomize = this.randomize.bind(this)
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
  componentWillMount(){
    this.setGridSize()
  }
  play(){
    if(!this.interval){
      this.interval = setInterval(()=>{
        this.nextGeneration()
      }, 500);
    }
    this.setState({
      disabled: true
    })
  }
  stop(){
    clearInterval(this.interval)
    this.interval = undefined
    this.setState({
      disabled: false
    })
  }
  swapCell(x, y){
    let board = [...this.state.board]
    board[y][x] = 1 - board[y][x]
    this.setState({
      board: board
    })
  }
  clearGrid(){
    let currentGridSize = this.state.board.length
    let newBoard = []
    for (var i = 0; i < currentGridSize; i++) {
      newBoard.push([])
      for (var j = 0; j < currentGridSize; j++) {
        newBoard[i].push(0)
      }
    }
    this.setState({
      board: newBoard
    })
  }
  randomize(){
    let currentGridSize = this.state.board.length
    let newBoard = []
    for (var i = 0; i < currentGridSize; i++) {
      newBoard.push([])
      for (var j = 0; j < currentGridSize; j++) {
        newBoard[i].push(Math.round(Math.random()))
      }
    }
    this.setState({
      board: newBoard
    })
  }
  setGridSize(){
    let newBoard = []
    for (var i = 0; i < this.state.gridSize; i++) {
      newBoard.push([])
      for (var j = 0; j < this.state.gridSize; j++) {
        newBoard[i].push(0)
      }
    }
    this.setState({
      board: newBoard
    })
  }
  render(){
    return (
      <div className="App">
        {
          this.state.board.map((row, y) => {
            return (
              <div key={y} className="row">
                {
                  row.map((cell, x) => {
                    return (<div key={x} className={cell?'viva':'muerta'} onClick={() => {this.swapCell(x, y)}}></div>)
                  })
                }
              </div>
            )
          })
        }
        <button onClick={this.play} disabled={this.state.disabled}>Play</button>
        <button onClick={this.stop}>Stop</button>
        <input type="number" onChange={(e)=> this.setState({gridSize: e.target.value})} value={this.state.gridSize}/>
        <button onClick={this.setGridSize}>Set Grid Size</button>
        <button onClick={this.clearGrid}>Clear</button>
        <button onClick={this.randomize}>randomize</button>
      </div>
    );
  }
}

export default App;
