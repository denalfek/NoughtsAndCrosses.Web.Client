import axios from "axios";

const API_BASE_URL = "http://localhost:5169/api/game";

export const initializeGame = async (side: number) => {
  try {
    const response = await axios.post(`${API_BASE_URL}`, {side: side});
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const hitCell = async (gameId: string, cellId: number) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}`, {gameId: gameId, cellId: cellId});
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};