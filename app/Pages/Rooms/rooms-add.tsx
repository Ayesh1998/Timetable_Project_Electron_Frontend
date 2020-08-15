// import React, {useEffect, useState} from 'react'
// import {Button, Form} from 'react-bootstrap'
// import {proxy} from '../../conf'
// import {useDispatch} from 'react-redux'
// import {setBuildings} from '../Buildings/buildings-slice'
//
// let errors_: string = ''
//
// const AddRooms: React.FC = () => {
//   const dispatch = useDispatch()
//   const [buildings, setBuildingsList] = useState<any>([])
//   const [room, setRoom] = useState<{
//     roomName: string,
//     buildingName: string,
//     roomType: string,
//     roomCapacity: number
//   }>({
//     roomName: '',
//     buildingName: '',
//     roomType: '',
//     roomCapacity: 0
//   })
//   const [existingRoom, setExistingRoom] = useState<boolean>(false)
//
//   const getBuildings = async () => {
//     try {
//       const response = await fetch(`${proxy}/buildings/buildings`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       })
//       const responseData = await response.json()
//       setBuildingsList(responseData)
//       await dispatch(setBuildings(responseData))
//     } catch (errors) {
//       console.log(errors)
//     }
//   }
//
//   useEffect(() => {
//     getBuildings().then(() => {
//     })
//   }, [])
//
//   const handleSubmit = async (e: any) => {
//     e.preventDefault()
//     try {
//       const response = await fetch(`${proxy}/rooms/rooms`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(room)
//       })
//       const responseData = await response.json()
//       if (responseData.exists) {
//         errors_ = responseData.message
//         setExistingRoom(true)
//       } else {
//         setExistingRoom(false)
//       }
//     } catch (errors) {
//       console.log(errors)
//     }
//   }
//
//   const handleChangeRoomName = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setRoom({...room, roomName: e.target.value})
//   }
//
//   const handleChangeCenterName = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setRoom({...room, buildingName: e.target.value})
//   }
//
//   return (
//     <Form>
//       <Form.Group controlId='formRoomName'>
//         <Form.Label>Room Name</Form.Label>
//         <Form.Control type='text'
//                       value={room.roomName}
//                       onChange={handleChangeRoomName}
//                       placeholder='Enter room name'
//                       pattern='[A-Za-z]{2,32}'
//                       title='Please enter a valid room name.'
//                       required/>
//       </Form.Group>
//       <Form.Group controlId='formLocatedCenter'>
//         <Form.Label>Located Building</Form.Label>
//         <Form.Control as='select'
//                       value={room.buildingName}
//                       onChange={handleChangeCenterName}
//                       required>
//           <option>Choose...</option>
//           {
//             buildings && buildings.map((building: any) => {
//               return (
//                 <option key={building._id} value={building.buildingName}>
//                   {building.buildingName}
//                 </option>
//               )
//             })
//           }
//         </Form.Control>
//       </Form.Group>
//       <Button variant='primary'
//               type='submit'
//               onClick={handleSubmit}>
//         ADD
//       </Button>
//       {existingRoom && errors_ && (
//         <div style={{
//           color: 'red',
//           fontSize: '18px',
//           marginTop: '7px',
//           textAlign: 'center'
//         }}>
//           {errors_}
//         </div>
//       )}
//     </Form>
//   )
// }
//
// export default AddRooms
