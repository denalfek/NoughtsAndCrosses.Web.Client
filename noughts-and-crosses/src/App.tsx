import React, { useEffect, useState } from 'react';
import { PlayerSide, Cell } from './Types';
import { initializeGame, hitCell } from './services/apiService';
import './App.css';


interface GameComponentProps {
  gameId: string;
}

function App() {
  const [field, setField] = useState<Cell[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const game = (await initializeGame(PlayerSide.Cross)).data;
        setField(game!.field);
      } catch (error) {
        // Handle error
      }
    };

    fetchData();
  }, []);

  const handleCellClick = async (cellId: number) => {
    try {
      const updatedGame = await hitCell('1', cellId);
      setField(updatedGame.Field);
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div>
      <h1>Tic Tac Toe Game</h1>
      <div>
        {field.map((cell, index) => (
          <button key={index} onClick={() => handleCellClick(index)}>
            {cell.Side == null ? '-' : cell.Side}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
