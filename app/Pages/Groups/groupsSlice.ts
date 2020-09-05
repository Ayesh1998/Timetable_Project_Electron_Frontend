import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../store';

const setGroupsSlice = createSlice({
  name: 'groups',
  initialState: {
    groups: {},
    subGroups: {},
    editGroup: false,
    editingGroupId: '',
    editingGroup: null
  },
  reducers: {
    setGroups: (state, action: any) => {
      state.groups = action.payload;
    },
    setSubGroups: (state, action: any) => {
      state.subGroups = action.payload;
    },
    setEditGroup: (state, action: any) => {
      state.editGroup = action.payload;
    },
    setEditingGroupId: (state, action: any) => {
      state.editingGroupId = action.payload;
    },
    setEditingGroup: (state, action: any) => {
      state.editingGroup = action.payload;
    }
  }
});

export const {setGroups} = setGroupsSlice.actions;
export const {setSubGroups} = setGroupsSlice.actions;
export const {setEditGroup} = setGroupsSlice.actions;
export const {setEditingGroupId} = setGroupsSlice.actions;
export const {setEditingGroup} = setGroupsSlice.actions;

export default setGroupsSlice.reducer;

export const selectCount = (state: RootState) => state.groups.groups;
