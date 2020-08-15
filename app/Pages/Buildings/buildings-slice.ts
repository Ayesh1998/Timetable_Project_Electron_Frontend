import {createSlice} from '@reduxjs/toolkit'

const setBuildingsSlice = createSlice({
  name: 'buildings',
  initialState: {buildings: {}, centers: {}},
  reducers: {
    setBuildings: (state, action: any) => {
      state.buildings = action.payload
    },
    setCenters: (state, action: any) => {
      state.centers = action.payload
    }
  }
})

export const {setBuildings} = setBuildingsSlice.actions
export const {setCenters} = setBuildingsSlice.actions

export default setBuildingsSlice.reducer
