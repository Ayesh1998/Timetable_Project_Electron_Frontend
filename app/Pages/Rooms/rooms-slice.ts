import {createSlice} from '@reduxjs/toolkit'

const setRoomsSlice = createSlice({
  name: 'rooms',
  initialState: {rooms: {}, editRoom: true},
  reducers: {
    setRooms: (state, action: any) => {
      state.rooms = action.payload
    },
    setEditRoom: (state, action: any) => {
      state.editRoom = action.payload
    }
  }
})

export const {setRooms} = setRoomsSlice.actions
export const {setEditRoom} = setRoomsSlice.actions

export default setRoomsSlice.reducer
