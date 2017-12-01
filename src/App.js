import React, { Component } from 'react'
import './App.css'

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

  isAlive({y,x}){
    try {
      if (this.state.board[y][x] === 4) {
        return 1
      }
    } catch(e) {}

    return 0
  }

  getLivingNeighbors(x, y){
    let livingNeighbors = 0

    let top = {y: y - 1, x: x}
    let topRight = {y: y - 1 , x: x + 1}
    let right = {y: y, x: x + 1}
    let bottomRight = {y: y + 1, x: x + 1}
    let bottom = {y: y + 1, x: x}
    let bottomLeft = {y: y + 1 , x: x - 1}
    let left = {y: y, x: x - 1}
    let topLeft = {y: y - 1, x: x - 1}

    livingNeighbors += this.isAlive(top)
    livingNeighbors += this.isAlive(topRight)
    livingNeighbors += this.isAlive(right)
    livingNeighbors += this.isAlive(bottomRight)
    livingNeighbors += this.isAlive(bottom)
    livingNeighbors += this.isAlive(bottomLeft)
    livingNeighbors += this.isAlive(left)
    livingNeighbors += this.isAlive(topLeft)

    return livingNeighbors
  }
  nextGeneration(){
    let result = []
    this.state.board.forEach((row, y) => {
      result.push([])
      row.forEach((cell, x) => {
        let livingNeighbors = this.getLivingNeighbors(x, y)
        if (livingNeighbors === 3 || (livingNeighbors === 2 && cell === 4)){
          result[y].push(4)
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
      }, 100)
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
    if (board[y][x] < 4){
      board[y][x] = 4
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
        newBoard[i].push(Math.round(Math.random()) * 4)
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
    return colors[cell]
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
    )
  }
}

export default App
