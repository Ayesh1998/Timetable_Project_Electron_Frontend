import React from 'react'
// import RoomsAdd from './rooms-add'
// import RoomsEdit from './rooms-edit'
import RoomsList from './rooms-list'

const Rooms: React.FC = () => {
  return (
    <div className='container'>
      <h1>Rooms</h1>
      {/*<RoomsAdd/>*/}
      {/*<RoomsEdit/>*/}
      <RoomsList/>
    </div>
  )
}

export default Rooms
