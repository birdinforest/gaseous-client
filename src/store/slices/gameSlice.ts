import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getGames } from '@app/api/game.api';
import { Game } from '@app/types/generalTypes';

interface GameSlice {
  games: Game[];
  // roms: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: GameSlice = {
  games: [],
  // roms: [],
  status: 'idle',
  error: null,
};

export const fetchGames = createAsyncThunk(
  'games/fetchGames',
  async (params: { pageNumber: number; pageSize: number }) => {
    return await getGames(undefined, params.pageNumber, params.pageSize);
  },
);

const gameSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGames.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchGames.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.games = action.payload.games;
    });
    builder.addCase(fetchGames.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || 'An error occurred while fetching games';
    });
  },
});

export default gameSlice.reducer;
