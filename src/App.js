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
      if (board[y - 1][x] === 9){
        livingNeighbors += 1
      }
      if (x < board.length - 1){
        if (board[y - 1][x + 1] === 9){
          livingNeighbors += 1
        }
      }
      if (x > 0){
        if (board[y - 1][x - 1] === 9){
          livingNeighbors += 1
        }
      }
    }
    if (x > 0) {
      if (board[y][x - 1] === 9){
        livingNeighbors += 1
      }
    }
    if (x < board.length - 1){
      if (board[y][x + 1] === 9){
        livingNeighbors += 1
      }
    }

    if (y < board.length - 1){
      if (board[y + 1][x] === 9) {
        livingNeighbors += 1
      }
      if (x < board.length - 1) {
        if (board[y + 1][x + 1] === 9) {
          livingNeighbors += 1
        }
      }
      if (x > 0) {
        if (board[y + 1][x - 1] === 9) {
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
        if (livingNeighbors === 3 || (livingNeighbors === 2 && cell === 9)){
          result[y].push(9)
        }else{
          let color = (cell > 0) ? (cell - 1) : 0
          result[y].push(color)
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
    if (board[y][x] < 9){
      board[y][x] = 9  
    }else{
      board[y][x] = 0  
    }
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
        newBoard[i].push(Math.round(Math.random()) * 9)
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
  getBacgroundColor(cell){

    let colors = [
      "#12223C",
      "#0C1F77",
      "#255DB4",
      "#58B6DB",
      "#C3D9E1"
    ]
    return colors[Math.floor(cell/2)]
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
                    return (<div key={x} 
                      className={"cell"} 
                      style={{ backgroundColor: this.getBacgroundColor(cell) }}
                    onClick={() => {this.swapCell(x, y)}}></div>)
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
