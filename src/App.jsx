import { useState, useEffect } from "react";
import "./App.css";
import Block from "./Components/Blocks";
import Buttons from "./Components/Buttons";

function App() {
  const [blocks, setBlocks] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [moves, setMoves] = useState([]);

  let switchPlayer = true;
  // console.log("Switch ", switchPlayer);

  const calculateWinnerFlag =
    blocks.filter((block) => block !== null).length > 4;

  // To Decide Winner
  const calculateWinner = (move) => {
    const winnercombo = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    let winner = false;

    for (let items of winnercombo) {
      const winnerlist = items.map((item) => blocks[item]);

      const winnerCheck = winnerlist.every((item) => item == move);

      if (winnerCheck) {
        console.log(winnerlist);
        console.log(items);
        console.log(currentPlayer);
        
        winner = true;
        break;
      }
    }

    if (!winner && switchPlayer) {
      setCurrentPlayer((prev) => (prev === "X" ? "O" : "X"));
    }

    return winner;
  };

  const handleBlocksMapping = (prev, clickedIndex) => {
    return prev.map((item, index) => {
      if (index === clickedIndex && item === null) {
        return currentPlayer;
      }
      return item;
    });
  };

  // To Handle Game board Click
  function handleBlockClick(clickedIndex) {
    // setClickeduser(clickedIndex);
    if (winner || blocks[clickedIndex]) {
      return;
    }
    // console.log(clickedIndex);
    const blocksVal = blocks.filter((item) => item !== null);
    // console.log(blocksVal.length);
    // console.log(moves.length);

    if (blocksVal.length == moves.length) {
      setMoves((prev) => [
        ...prev,
        {
          val: handleBlocksMapping(blocks, clickedIndex),
          player: currentPlayer,
        },
      ]);
    } else {
      setMoves((prev) => [
        ...prev.slice(0, blocksVal.length),
        {
          val: handleBlocksMapping(blocks, clickedIndex),
          player: currentPlayer,
        },
      ]);
    }
    setBlocks((prev) => handleBlocksMapping(prev, clickedIndex));
  }
  // console.log(blocks);
  // console.log(moves);
  useEffect(() => {
    if (!calculateWinnerFlag && switchPlayer) {
      setCurrentPlayer((prev) => (prev === "X" ? "O" : "X"));
    }

    if (calculateWinnerFlag && calculateWinner(currentPlayer)) {
      setWinner(currentPlayer);
    }
  }, [blocks, calculateWinnerFlag]);
  // console.log(blocks);

  // Handle back button Click
  const handleButtonClick = (move) => {
    if (move == 0) {
      setWinner(null);
      setBlocks(Array(9).fill(null));
      setCurrentPlayer("O");
    } else {
      setWinner(null);
      setBlocks([...moves[move - 1].val]);
      setCurrentPlayer(moves[move - 1].player);
      switchPlayer = false;
    }
  };

  return (
    <div className="container">
      <div className="left-section">
        <p>
          {winner
            ? `Winner is : ${winner}`
            : `Current Player is : ${currentPlayer}`}
        </p>

        {blocks.map((block, ind) => {
          if ((ind + 1) % 3 === 0) {
            return (
              <span key={ind}>
                <Block
                  onBlockClick={handleBlockClick}
                  blockdata={block}
                  clickedIndex={ind}
                />
                <br />
              </span>
            );
          }
          return (
            <Block
              key={ind}
              onBlockClick={handleBlockClick}
              blockdata={block}
              clickedIndex={ind}
            />
          );
        })}
      </div>
      <div className="right-section">
        <Buttons onButtonClick={handleButtonClick} move={0} />
        {moves.map((item, index) => {
          return (
            <Buttons
              onButtonClick={handleButtonClick}
              key={index}
              move={++index}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
