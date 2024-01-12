// GameComponent.tsx
import React, { useEffect, useState } from 'react';
import { PlayerSide, Cell } from '../Types';
import { initializeGame, hitCell } from '../services/apiService';

interface GameComponentProps {
  gameId: string;
}

const GameComponent: React.FC<GameComponentProps> = ({ gameId }) => {
  const [field, setField] = useState<Cell[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await initializeGame(PlayerSide.Cross);
        const game = result.data;
        console.log(game);
        setField(game!.field);
      } catch (error) {
        // Handle error
      }
    };

    fetchData();
  }, []);

  const handleCellClick = async (cellId: number) => {
    try {
      const data = (await hitCell(gameId, cellId)).data;
      setField(data!.game.field);
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
            {cell.Side || '-'}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GameComponent;
