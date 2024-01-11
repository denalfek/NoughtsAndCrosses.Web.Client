import React, { useEffect, useState } from 'react';
import { Cell } from './Types';
import { initializeGame, hitCell } from './services/apiService';
import './App.css';


interface GameComponentProps {
  gameId: string;
}

enum PlayerSide {
  Cross = 'Cross',
  Nought = 'Nought',
}

function App() {
  const [field, setField] = useState<Cell[]>([]);
  const [selectedSide, setSelectedSide] = useState<PlayerSide | null>(null);
  const [gameId, setGameId] = useState<string | null>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const storedSide = localStorage.getItem('selectedSide');

    if (storedSide && (storedSide === PlayerSide.Cross || storedSide === PlayerSide.Nought)) {
      setCount(count + 1);
      console.log(`Count is: ${count}`);
      setSelectedSide(storedSide as PlayerSide);
      initializeStoredGame(storedSide as PlayerSide);
    }
  }, []);

  const initializeStoredGame = async (side: PlayerSide) => {
    try {
      const game = (await initializeGame(convertToApiSide(side))).data;
      setField(game!.field);
      setGameId(game!.gameId);
    } catch (error) {
      // Handle error
    }
  };

  const handleSideSelect = async (side: PlayerSide) => {
    try {
      initializeStoredGame(side);
      setSelectedSide(side);
      localStorage.setItem('selectedSide', side);
    } catch (error) {
      // Handle error
    }
  };

  const handleCellClick = async (cellId: number) => {
    try {
      const updatedGame = await hitCell(gameId!, cellId);
      setField(updatedGame.Field);
    } catch (error) {
      // Handle error
    }
  };

  // Helper function to convert UI side to API side
  const convertToApiSide = (uiSide: PlayerSide): number => {
    switch (uiSide) {
      case PlayerSide.Cross:
        return 0;
      case PlayerSide.Nought:
        return 1;
      default:
        throw new Error('Invalid UI side');
    }
  };

  return (
    <div>
      <h1>Tic Tac Toe Game</h1>
      {selectedSide ? (
        <div>
          <p>Selected Side: {selectedSide}</p>
          <div>
            {field.map((cell, index) => (
              <button key={index} onClick={() => handleCellClick(index)}>
                {cell.Side == null ? '-' : cell.Side}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <p>Choose Your Side:</p>
          <button onClick={() => handleSideSelect(PlayerSide.Cross)}>Cross</button>
          <button onClick={() => handleSideSelect(PlayerSide.Nought)}>Nought</button>
        </div>
      )}
    </div>
  );
}


export default App;
