import {createSlice} from '@reduxjs/toolkit'

const setRoomsUnavailabilitySlice = createSlice({
  name: 'roomsUnavailability',
  initialState: {
    roomUnavailability: false,
    unavailableRoom: null
  },
  reducers: {
    setUnavailableRoom: (state, action: any) => {
      state.unavailableRoom = action.payload
    },
    setRoomUnavailability: (state, action: any) => {
      state.roomUnavailability = action.payload
    }
  }
})

export const {setUnavailableRoom} = setRoomsUnavailabilitySlice.actions
export const {setRoomUnavailability} = setRoomsUnavailabilitySlice.actions

export default setRoomsUnavailabilitySlice.reducer
