class Game{
  constructor(numberOfRows, numberOfColumns, numberOfBombs){
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }

  playMove(rowIndex, columnIndex){
    this._board.flipTile(rowIndex, columnIndex);

    if(this.board.playerBoard[rowIndex][columnIndex] === 'B'){
      console.log('Game over');
      this._board.print();
    } else if (!hasSafeTiles(this._board)){
        console.log('You won!');
    } else {console.log('Current Board');}
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

let board1 = new Board(2,2,1);

console.log('Player Board: ');
board1.print();

board1.flipTile(0, 0);
console.log('Updated Player Board:');
board1.print();
