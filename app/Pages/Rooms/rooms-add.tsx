import React, {useEffect, useState} from 'react'
import {Button, Form} from 'react-bootstrap'
import {proxy} from '../../conf'
import {useDispatch} from 'react-redux'
import {setBuildings} from '../Buildings/buildings-slice'
import {type} from 'os'

let errors_: string = ''

const RoomsAdd: React.FC = () => {
  const dispatch = useDispatch()
  const [buildings, setBuildingsList] = useState<any>([])
  const [room, setRoom] = useState<{
    roomName: string,
    buildingName: string,
    roomType: string,
    roomCapacity: number | undefined
  }>({
    roomName: '',
    buildingName: '',
    roomType: '',
    roomCapacity: undefined
  })
  const [existingRoom, setExistingRoom] = useState<boolean>(false)

  const getBuildings = async () => {
    try {
      const response = await fetch(`${proxy}/buildings/buildings`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const responseData = await response.json()
      setBuildingsList(responseData)
      await dispatch(setBuildings(responseData))
    } catch (errors) {
      console.log(errors)
    }
  }

  useEffect(() => {
    getBuildings().then(() => {
    })
  }, [])

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      const response = await fetch(`${proxy}/rooms/rooms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(room)
      })
      const responseData = await response.json()
      if (responseData.exists) {
        errors_ = responseData.message
        setExistingRoom(true)
      } else {
        setExistingRoom(false)
      }
    } catch (errors) {
      console.log(errors)
    }
  }

  const handleChangeRoomName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoom({...room, roomName: e.target.value})
  }

  const handleChangeBuildingName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoom({...room, buildingName: e.target.value})
  }

  const handleChangeRoomType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoom({...room, roomType: e.target.value})
  }

  const handleChangeRoomCapacity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoom({...room, roomCapacity: parseInt(e.target.value)})
  }

  return (
    <Form>
      <Form.Group controlId='formRoomName'>
        <Form.Label>Room Name</Form.Label>
        <Form.Control type='text'
                      value={room.roomName}
                      onChange={handleChangeRoomName}
                      placeholder='Enter room name'
                      pattern='[A-Za-z]{2,32}'
                      title='Please enter a valid room name.'
                      required/>
      </Form.Group>
      <Form.Group controlId='formLocatedBuilding'>
        <Form.Label>Located Building</Form.Label>
        <Form.Control as='select'
                      value={room.buildingName}
                      onChange={handleChangeBuildingName}
                      placeholder='Select building'
                      title='Please select the building.'
                      required>
          <option/>
          {
            buildings && buildings.map((building: any) => {
              return (
                <option key={building._id}
                        value={building.buildingName}>
                  {building.buildingName}
                </option>
              )
            })
          }
        </Form.Control>
      </Form.Group>
      <Form.Group controlId='formRoomType'>
        <Form.Label>Room Type</Form.Label>
        <div key={`inline-${type}`}
             className='mb-3'
             onChange={handleChangeRoomType}
             title='Please select the room type.'>
          <Form.Check inline
                      type='radio'
                      label='Lecture Hall'
                      value='Lecture Hall'
                      name='roomType'
                      id='roomTypeLectureHall'/>
          <Form.Check inline
                      type='radio'
                      label='Laboratory'
                      value='Laboratory'
                      name='roomType'
                      id='roomTypeLaboratory'/>
        </div>
      </Form.Group>
      <Form.Group controlId='formRoomCapacity'>
        <Form.Label>Room Capacity</Form.Label>
        <Form.Control type='text'
                      value={room.roomCapacity}
                      onChange={handleChangeRoomCapacity}
                      placeholder='Enter room capacity'
                      pattern='[0-9]'
                      title='Please enter a valid room capacity.'
                      required/>
      </Form.Group>
      <Button variant='primary'
              type='submit'
              onClick={handleSubmit}>
        ADD
      </Button>
      {existingRoom && errors_ && (
        <div style={{
          color: 'red',
          fontSize: '18px',
          marginTop: '7px',
          textAlign: 'center'
        }}>
          {errors_}
        </div>
      )}
    </Form>
  )
}

export default RoomsAdd
