import React, {useState} from 'react'
import {Button, Form} from 'react-bootstrap'
import {proxy} from '../../conf'

const AddBuildings: React.FC = () => {
  const [building, setBuilding] = useState<{
    buildingName: string,
    centerName: string
  }>({
    buildingName: '',
    centerName: ''
  })

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${proxy}/buildings/buildings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(building)
      })
      const responseData = await response.json()
      console.log(responseData)
    } catch (error) {
      console.log(error)
    }
  }

  const handleChangeBuildingName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuilding({...building, buildingName: e.target.value})
  }

  const handleChangeCenterName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBuilding({...building, centerName: e.target.value})
  }

  return (
    <Form>
      <Form.Group controlId="formBuildingName">
        <Form.Label>Building Name</Form.Label>
        <Form.Control type="text"
                      value={building.buildingName}
                      onChange={handleChangeBuildingName}
                      placeholder="Enter building name"/>
      </Form.Group>
      <Form.Group controlId="formLocatedCenter">
        <Form.Label>Located Center</Form.Label>
        <Form.Control type="text"
                      value={building.centerName}
                      onChange={handleChangeCenterName}
                      placeholder="Select center"/>
      </Form.Group>
      <Button variant="primary"
              type="submit"
              onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  )
}

export default AddBuildings
