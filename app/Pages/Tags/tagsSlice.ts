import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../store';

const setTagsSlice = createSlice({
  name: 'tags',
  initialState: { tags: [] },
  reducers: {
    setTags: (state, action: any) => {
      state.tags = action.payload;
    },
  },
});

export const { setTags } = setTagsSlice.actions;

export default setTagsSlice.reducer;

export const selectCount = (state: RootState) => state.tags.tags;
