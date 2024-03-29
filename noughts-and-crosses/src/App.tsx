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
  const [initialized, setInitialized] = useState<boolean>(false);


  useEffect(() => {
    const storedSide = localStorage.getItem('selectedSide');

    if (storedSide && (storedSide === PlayerSide.Cross || storedSide === PlayerSide.Nought)) {
      setSelectedSide(storedSide as PlayerSide);
      if (!initialized) {
        console.log('Initializing stored game');
        initializeStoredGame(storedSide as PlayerSide);
        setInitialized(true);
      }
    }
  }, [initialized]);

  useEffect(() => {

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
      const data = (await hitCell(gameId!, cellId)).data;
      if (data){
          console.log("Test!");
//        try to use both for my own understanding
          setField([...data.game.field]);
//        setField(updatedGame!.field.map((cell) => ({ ...cell })));
      }
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
                { cell.Side == null ? 'A' : cell.Side === 0 ? 'X' : 'O' }
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
