import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { Game, PlayerSide, ProcessGame } from '../Types'

const API_BASE_URL = 'http://localhost:5169/api/game';

interface ServiceResult<T> {
  data?: T;
  errorMessage?: string | undefined;
  statusCode?: number;
}

const RequestConfig = { headers: { 'Content-Type': 'application/json' }, withCredentials: true };

export const initializeGame = async ( side: PlayerSide ): Promise<ServiceResult<Game>> => {
  try {
    const response = await axios.post(`${API_BASE_URL}`, { side: side }, RequestConfig);
    const game: Game = response.data;
    return { data: game };
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const hitCell = async (gameId: string, cellId: number): Promise<ServiceResult<ProcessGame>> => {
  try {
    const response = await axios.patch(`${API_BASE_URL}`, { gameId, cellId }, RequestConfig);
    const data: ProcessGame = response.data;
    data.game.field.map((cell) => {console.log(cell.Id, cell.Side)});
    return { data: data };
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
