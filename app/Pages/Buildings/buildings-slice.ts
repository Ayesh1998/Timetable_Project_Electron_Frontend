import {createSlice} from '@reduxjs/toolkit'

const setBuildingsSlice = createSlice({
  name: 'buildings',
  initialState: {buildings: {}},
  reducers: {
    setBuildings: (state, action: any) => {
      state.buildings = action.payload
    }
  }
})

export const {setBuildings} = setBuildingsSlice.actions

export default setBuildingsSlice.reducer
