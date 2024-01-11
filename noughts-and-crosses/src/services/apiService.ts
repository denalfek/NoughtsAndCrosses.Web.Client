import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { Game, PlayerSide } from '../Types'

const API_BASE_URL = 'http://localhost:5169/api/game';

interface ServiceResult<T> {
  data?: T;
  errorMessage?: string | undefined;
  statusCode?: number;
}

export const initializeGame = async ( side: PlayerSide ): Promise<ServiceResult<Game>> => {
  try {
    const response = await axios.post(`${API_BASE_URL}`, { side: side });    
    const game: Game = response.data;
    return { data: game };
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const hitCell = async (gameId: string, cellId: number) => {
  try {
    console.log(`gameId: ${gameId}, cellId: ${cellId}`);
    const response = await axios.patch(`${API_BASE_URL}`, { gameId, cellId });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
