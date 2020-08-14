import React, {useEffect, useState} from 'react'
import {Button, Form} from 'react-bootstrap'
import {proxy} from '../../conf'

let errors_: string = ''

const AddBuildings: React.FC = () => {
  // const [centers, setCenters] = useState<[{
  //   _id: string
  //   centerName: string
  // }]>([{
  //   _id: '',
  //   centerName: ''
  // }])
  // const [centers, setCenters] = useState<object>([])

  const [building, setBuilding] = useState<{
    buildingName: string,
    centerName: string
  }>({
    buildingName: '',
    centerName: ''
  })

  const getCenters = async () => {
    try {
      const response = await fetch(`${proxy}/centers/centers`)
      const responseData = await response.json()
      console.log(responseData)
      // setCenters({responseData[0]})
      // console.log(centers)
    } catch (errors) {
      console.log(errors)
    }
  }

  useEffect(() => {
    getCenters().then(() => {
    })
  }, [])

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
      if (responseData.exists) {
        errors_ = responseData.message
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
        <Form.Control as="select"
                      value={building.centerName}
                      onChange={handleChangeCenterName}>
          <option>Choose...</option>
          <option value='Malabe'>Malabe</option>
          <option value='Matara'>Matara</option>
          <option value='Metro'>Metro</option>
          <option value='Kurunagala'>Kurunagala</option>
          <option value='Jaffna'>Jaffna</option>
          {/*{centers.map((center: { _id: string | number | readonly string[] | undefined; centerName: React.ReactNode }) => {*/}
          {/*  return (*/}
          {/*    <option value={center._id}>{center.centerName}</option>)*/}
          {/*  )}*/}
          {/*}*/}
        </Form.Control>
      </Form.Group>
      <Button variant="primary"
              type="submit"
              onClick={handleSubmit}>
        Submit
      </Button>
      {errors_ && (
        <div style={{
          color: "red",
          fontSize: "18px",
          marginTop: "7px",
          textAlign: "center"
        }}>
          {errors_}
        </div>
      )}
    </Form>
  )
}

export default AddBuildings
