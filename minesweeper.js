class Game{
  constructor(numberOfRows, numberOfColumns, numberOfBombs){
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }

  playMove(rowIndex, columnIndex){
    this._board.flipTile(rowIndex, columnIndex);

    if(this._board.playerBoard[rowIndex][columnIndex] === 'B'){
      console.log('Game over');
      this._board.print();
    } else if (!this._board.hasSafeTiles()){
        console.log('You won!');
    } else {console.log('Current Board');
      this._board.print();}
  }
}


class Board{
  constructor(numberOfRows, numberOfColumns, numberOfBombs){

    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfColumns * numberOfRows;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows,numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns,numberOfBombs);
  }

  get playerBoard(){
    return this._playerBoard;
  }

  flipTile(rowIndex, columnIndex){
   if(this._playerBoard[rowIndex][columnIndex] !== ' '){
    console.log('This tile has already been flipped!');
    return;}
   else if (this._bombBoard[rowIndex][columnIndex] ==='B'){
     this._playerBoard[rowIndex][columnIndex] = 'B';}
   else {this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);}

   this._numberOfTiles--;
  }

  getNumberOfNeighborBombs(rowIndex, columnIndex){
    this._neighborOffsets =[
      [-1,-1],
      [-1,0],
      [-1,1],
      [0,-1],
      [0,1],
      [1,-1],
      [1,0],
      [1,1]
    ];

    this._numberOfRows = this._bombBoard.length;
    this._numberOfColumns = this._bombBoard[0].length;

    this._neighborOffsets.forEach(offset => {
      this._neighborRowIndex = rowIndex + offset[0];
      this._neighborColumnIndex = columnIndex + offset[1];

      if (
         this._neighborRowIndex >0 &&
         this._neighborRowIndex <= this._numberOfRows &&
         this._neighborColumnIndex > 0 &&
         this._neighborColumnIndex <= this._numberOfColumns)
        {if(this._bombBoard[this._neighborRowIndex][this._neighborColumnIndex] === 'B')
          {this._numberOfBombs++;}
        }
      }); return this._numberOfBombs;
  }


  hasSafeTiles(){
    return this._numberOfTiles !== this._numberOfBomb;
  }

  print(){
    console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
  };

  static generatePlayerBoard(numberOfRows, numberOfColumns){
    const board = [];
    for(let i=0;i<=numberOfRows;i++){
      const row = [];
      for(let j=0;j<=numberOfColumns;j++){
        row.push(' ');
      } board.push(row);
    } return board;
  }

  static generateBombBoard(numberOfRows,numberOfColumns,numberOfBombs){
  const board = [];
  for(let i=0;i<=numberOfRows;i++){
    const row = [];
    for(let j=0;j<=numberOfColumns;j++){
      row.push(null);
    } board.push(row);
  }
    let numberOfBombsPlaced = 0;

    while (numberOfBombsPlaced < numberOfBombs){
      //currently bombs may be placed on top of each other.
      let randomRowIndex = Math.floor(Math.random()*numberOfRows);
      let randomColumnIndex = Math.floor(Math.random()*numberOfColumns);

      if (board[randomRowIndex][randomColumnIndex] !='B'){
        board[randomRowIndex][randomColumnIndex]='B';
        numberOfBombsPlaced++;
        }
      }return board;
  }
}

const g = new Game(3,3,3);
g.playMove(0,0);


//BOARD//BOARD//BOARD//BOARD//BOARD//BOARD//BOARD//BOARD board.js

export class Board{
  constructor(numberOfRows, numberOfColumns, numberOfBombs){

    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfColumns * numberOfRows;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows,numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns,numberOfBombs);
  }

  get playerBoard(){
    return this._playerBoard;
  }

  flipTile(rowIndex, columnIndex){
   if(this._playerBoard[rowIndex][columnIndex] !== ' '){
    console.log('This tile has already been flipped!');
    return;}
   else if (this._bombBoard[rowIndex][columnIndex] ==='B'){
     this._playerBoard[rowIndex][columnIndex] = 'B';}
   else {this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);}

   this._numberOfTiles--;
  }

  getNumberOfNeighborBombs(rowIndex, columnIndex){
    this._neighborOffsets =[
      [-1,-1],
      [-1,0],
      [-1,1],
      [0,-1],
      [0,1],
      [1,-1],
      [1,0],
      [1,1]
    ];

    this._numberOfRows = this._bombBoard.length;
    this._numberOfColumns = this._bombBoard[0].length;

    this._neighborOffsets.forEach(offset => {
      this._neighborRowIndex = rowIndex + offset[0];
      this._neighborColumnIndex = columnIndex + offset[1];

      if (
         this._neighborRowIndex >0 &&
         this._neighborRowIndex <= this._numberOfRows &&
         this._neighborColumnIndex > 0 &&
         this._neighborColumnIndex <= this._numberOfColumns)
        {if(this._bombBoard[this._neighborRowIndex][this._neighborColumnIndex] === 'B')
          {this._numberOfBombs++;}
        }
      }); return this._numberOfBombs;
  }


  hasSafeTiles(){
    return this._numberOfTiles !== this._numberOfBomb;
  }

  print(){
    console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
  };

  static generatePlayerBoard(numberOfRows, numberOfColumns){
    const board = [];
    for(let i=0;i<=numberOfRows;i++){
      const row = [];
      for(let j=0;j<=numberOfColumns;j++){
        row.push(' ');
      } board.push(row);
    } return board;
  }

  static generateBombBoard(numberOfRows,numberOfColumns,numberOfBombs){
  const board = [];
  for(let i=0;i<=numberOfRows;i++){
    const row = [];
    for(let j=0;j<=numberOfColumns;j++){
      row.push(null);
    } board.push(row);
  }
    let numberOfBombsPlaced = 0;

    while (numberOfBombsPlaced < numberOfBombs){
      //currently bombs may be placed on top of each other.
      let randomRowIndex = Math.floor(Math.random()*numberOfRows);
      let randomColumnIndex = Math.floor(Math.random()*numberOfColumns);

      if (board[randomRowIndex][randomColumnIndex] !='B'){
        board[randomRowIndex][randomColumnIndex]='B';
        numberOfBombsPlaced++;
        }
      }return board;
  }
}

//GAME//GAME//GAME//GAME//GAME//GAME//GAME//GAME game.js

// To play Minesweeper, we will create instances of MineSweeperGame in command line.
// For example:
// In the command line, navigate to the lib directory and run `node`
// Run `.load game.js` to load the contents of this file.
// Then create a Game instance and run commands like so:
// let game = new Game(3, 3, 3);
// game.playMove(0, 1);
// game.playMove(1, 2);
// When done run `.exit`

import Board from './boar'



class Game{
  constructor(numberOfRows, numberOfColumns, numberOfBombs){
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }

  playMove(rowIndex, columnIndex){
    this._board.flipTile(rowIndex, columnIndex);

    if(this._board.playerBoard[rowIndex][columnIndex] === 'B'){
      console.log('Game over');
      this._board.print();
    } else if (!this._board.hasSafeTiles()){
        console.log('You won!');
    } else {console.log('Current Board');
      this._board.print();}
  }
}
