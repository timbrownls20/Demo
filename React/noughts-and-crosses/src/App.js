import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useEffect } from 'react';

const Debug = false;

const Cell = (props) => {

  const {row, column, grid, recordTurn} = props;
  const [_, setCellContent] = useState('');

  const handleClick = () => {
    setCellContent(grid[row][column]);
    recordTurn(row, column);
  }

  return <div className={`col cell cell-${row+1}-${column+1}`} style={{backgroundColor:'white', cursor:'pointer'}} onClick={handleClick}>
    <span>
       {grid[row][column]}   
    </span>
  </div>
}

const Row = (props) => {

  return <div className="row">
    {
      utils.range(0, 2).map(number => 
          <Cell key={`cell-${props.row}-${number}`} 
          row={props.row} 
          column={number}
          grid={props.grid} 
          recordTurn={props.recordTurn}/>  
      )
    }
  </div>
}

const Grid = (props) => {

return <div className="container">
  {
    utils.range(0, 2).map(number => 
        <Row  key={`row-${number}`} 
              row={number}
              grid={props.grid}
              recordTurn={props.recordTurn} />
    )
  }
  </div>
}

const DebugPanel = (content) => {
  return <>
  <hr />
  <pre>
    {JSON.stringify(content)}
  </pre>
  </> 
}

const PlayAgain  =(props) => {
  return <button onClick={props.startNewGame}>Play Again</button>
}

const useGameState = (startingPlayer, timeLimit) => {

  const [grid, setGrid] = useState([[],[],[]]);
  const [player, setPlayer] = useState(startingPlayer);
  const [gameState, setGameState] = useState({InProgress: true, Display:`Next Turn "${startingPlayer}"`});
  const [secondsLeft, setSecondsLeft] = useState(timeLimit);

  useEffect(() =>{

    if(secondsLeft > 0 && gameState.InProgress){
      let handle = setTimeout(() =>{
        setSecondsLeft(secondsLeft - 1);
      }, 1000)

      return () => clearTimeout(handle);
    }
    else if(secondsLeft === 0){
      setGameState({InProgress: false, Display:'Out of time'});
    }

  }, [secondsLeft, gameState.InProgress]);

  const recordTurn = (row, column) => {

    let thisTurn = player;
    let nextTurn = thisTurn === 'X' ? 'O' : 'X';

    if(!gameState.InProgress){
      console.log("game finished")
    }
    else if(grid[row][column] === undefined) {
  
      grid[row][column] = thisTurn;
  
      setGrid(grid);
      setPlayer(nextTurn);
  
      console.log(`record turn ${row} ${column}`)
    }
    else {
      console.log(`turn already taken ${row} ${column}`)
    }

    updateGameState(nextTurn);

  }

  const updateGameState = (nextTurn) => {
    
    if(GameCalculator.hasWon(grid, 'X')){
      setGameState({InProgress: false, Display:'"X" has won'});
    }
    else if(GameCalculator.hasWon(grid, 'O')){
      setGameState({InProgress: false, Display:'"O" has won'});
    }
    else if(GameCalculator.isDrawn(grid)){
      setGameState({InProgress: false, Display:'Draw'});
    }
    else {
      setGameState({InProgress: true, Display:`Next Turn "${nextTurn}"`});
    }
  }

  return {
    grid,
    gameState,
    secondsLeft,
    recordTurn
  }

}

const Game = (props) => {

  const {grid, gameState, secondsLeft, recordTurn} = useGameState('O', 20);
 
  return (
    <div className="game">
      <div>
        <h3>Noughts and Crosses</h3>
      </div>
      <Grid grid={grid}
            recordTurn={recordTurn} />
      <div>
        {gameState.Display}
      </div>
      <div>
        Seconds left {secondsLeft}
      </div>
      {!gameState.InProgress ? <PlayAgain startNewGame={props.startNewGame}/> : null}
      {Debug ? <DebugPanel content={gameState} /> : null}

    </div>
  );

}

function App() {

  const [gameId, setGameId] = useState(1);
  return <Game key={gameId} startNewGame={() => setGameId(gameId + 1)} />   
}

const GameCalculator = {

  isDrawn: (grid) => {

    let output = grid.flat().length === 9;
    console.log(`isDrawn ${output}`);

    return output;
  },

  hasWon : (grid, player) => {

    console.log(grid);
    let won = false; 

    for(let i = 0; i < 3; i++){

      let rowMatched = utils.range(0, 2).reduce((acc, row) => acc && grid[i][row] === player, true);
      let columnMatched = utils.range(0, 2).reduce((acc, column) => acc && grid[column][i] === player, true);

      won = won || rowMatched || columnMatched;
    }

    let diag1Matched = (grid[0][0] === player && grid[1][1] === player && grid[2][2] === player);
    let diag2Matched = (grid[0][2] === player && grid[1][1] === player && grid[2][0] === player);

    won = won || diag1Matched || diag2Matched;

    console.log(`won ${won}`)

    return won;

  }
}

const utils = {
  // Sum an array
  sum: arr => arr.reduce((acc, curr) => acc + curr, 0),

  // create an array of numbers between min and max (edges included)
  range: (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i),

  // pick a random number between min and max (edges included)
  random: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),

};

export default App;
