import React from 'react'
import {useSelector} from 'react-redux'
// import RoomsAdd from './rooms-add'
// import RoomsEdit from './rooms-edit'
import RoomsList from './rooms-list'

const RoomsPage: React.FC = () => {
  const editRoom = useSelector(
    (state: {
      rooms: any;
      editRoom: boolean
    }) => state.rooms.editRoom
  )

  return (
    <div className='container'>
      <h1>Rooms</h1>
      {/*<RoomsAdd/>*/}
      {/*<RoomsEdit/>*/}
      <RoomsList/>
    </div>
  )
}

export default RoomsPage
