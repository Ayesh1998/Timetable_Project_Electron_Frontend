import React, {useEffect, useState} from 'react'
import {Button, Form} from 'react-bootstrap'
import {proxy} from '../../conf'
import {useDispatch} from 'react-redux'
import {setCenters, setEditBuilding} from './buildings-slice'

let errors_: string = ''

const EditBuildings: React.FC = () => {
  const dispatch = useDispatch()
  const [centers, setCentersList] = useState<any>([])
  const [building, setBuilding] = useState<{
    buildingName: string,
    centerName: string
  }>({
    buildingName: '',
    centerName: ''
  })
  const [existingBuilding, setExistingBuilding] = useState<boolean>(false)

  const getCenters = async () => {
    try {
      const response = await fetch(`${proxy}/centers/centers`)
      const responseData = await response.json()
      setCentersList(responseData)
      await dispatch(setCenters(responseData))
    } catch (errors) {
      console.log(errors)
    }
  }

  useEffect(() => {
    getCenters().then(() => {
    })
  }, [])

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      const response = await fetch(`${proxy}/buildings/buildings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(building)
      })
      const responseData = await response.json()
      if (responseData.exists) {
        errors_ = responseData.message
        setExistingBuilding(true)
      } else {
        setExistingBuilding(false)
        await dispatch(setEditBuilding(false))
      }
    } catch (errors) {
      console.log(errors)
    }
  }

  const handleChangeBuildingName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuilding({...building, buildingName: e.target.value})
  }

  const handleChangeCenterName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuilding({...building, centerName: e.target.value})
  }

  const handleBack = async () => {
    await dispatch(setEditBuilding(false))
  }

  return (
    <Form>
      <Form.Group controlId='formBuildingName'>
        <Form.Label>Building Name</Form.Label>
        <Form.Control type='text'
                      value={building.buildingName}
                      onChange={handleChangeBuildingName}
                      placeholder='Enter building name'
                      pattern='[A-Za-z]{2,32}'
                      title='Please enter a valid building name.'
                      required/>
      </Form.Group>
      <Form.Group controlId='formLocatedCenter'>
        <Form.Label>Located Center</Form.Label>
        <Form.Control as='select'
                      value={building.centerName}
                      onChange={handleChangeCenterName}
                      required>
          {centers && centers.map((center: any) => {
            console.log(center)
            return (
              <option key={center._id} value={center.centerName}>{center.centerName}</option>)
          })
          }
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Button variant='primary'
                type='submit'
                onClick={handleBack}>
          BACK
        </Button>
        <Button variant='success'
                type='submit'
                onClick={handleSubmit}>
          EDIT
        </Button>
      </Form.Group>
      {existingBuilding && errors_ && (
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

export default EditBuildings
