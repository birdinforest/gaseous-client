import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getRoms } from '@app/api/game.api';
import { Rom } from '@app/types/generalTypes';

interface RomSlice {
  roms: Rom[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: RomSlice = {
  roms: [],
  status: 'idle',
  error: null,
};

export const fetchRoms = createAsyncThunk(
  'games/fetchRoms',
  async (params: { gameId: number; pageNumber: number; pageSize: number }) => {
    return await getRoms(params.gameId, params.pageNumber, params.pageSize);
  },
);

const romSlice = createSlice({
  name: 'roms',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRoms.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchRoms.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.roms = action.payload.gameRomItems;
    });
    builder.addCase(fetchRoms.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message || 'An error occurred while fetching roms';
    });
  },
});

export default romSlice.reducer;
