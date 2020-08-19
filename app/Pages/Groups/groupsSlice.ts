import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../../store';

const setGroupsSlice = createSlice({
  name: 'groups',
  initialState: { groups: [] },
  reducers: {
    setGroups: (state, action: any) => {
      state.groups = action.payload;
    },
  },
});

export const { setGroups } = setGroupsSlice.actions;

export default setGroupsSlice.reducer;

export const selectCount = (state: RootState) => state.groups.groups;
