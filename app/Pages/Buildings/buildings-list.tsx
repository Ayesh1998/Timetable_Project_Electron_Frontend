import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Button, Card, CardColumns, Form, Modal, Row, Spinner} from 'react-bootstrap'
import {FaEdit, FaTrashAlt} from 'react-icons/fa'
import {proxy} from '../../conf'
import {
  setBuildings,
  setCenters,
  setEditBuilding,
  setEditingBuilding,
  setEditingBuildingId,
  setExistingBuilding
} from './buildings-slice'

let errors_: string = ''

const BuildingsList: React.FC = () => {
  const dispatch = useDispatch()

  let buildingList = useSelector(
    (state: {
      buildings: any
    }) => state.buildings.buildings
  )

  const [loading, setLoading] = useState<boolean>(false)
  const [show, setShow] = useState<boolean>(false)
  const [deleteId, setDeleteId] = useState<string>('')
  const [centers, setCentersList] = useState<any>([])
  const [buildings, setBuildingsList] = useState<any>([])
  const [building, setBuilding] = useState<{
    buildingName: string,
    centerName: string
  }>({
    buildingName: '',
    centerName: ''
  })

  const getBuildings = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${proxy}/buildings/searchBuildings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(building)
      })
      const responseData = await response.json()
      setBuildingsList(responseData)
      await dispatch(setBuildings(responseData))
      setLoading(false)
    } catch (errors) {
      errors_ = errors
      setLoading(false)
      console.log(errors)
    }
  }

  const getCenters = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${proxy}/centers/centers`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const responseData = await response.json()
      setCentersList(responseData)
      await dispatch(setCenters(responseData))
      setLoading(false)
    } catch (errors) {
      errors_ = errors
      setLoading(false)
      console.log(errors)
    }
  }

  useEffect(() => {
    getCenters().then(() => {
    })
    getBuildings().then(() => {
    })
  }, [buildings])

  const handleChangeBuildingNameSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true)
    setBuilding({...building, buildingName: e.target.value})
    setLoading(false)
  }

  const handleChangeCenterNameSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true)
    setBuilding({...building, centerName: e.target.value})
    setLoading(false)
  }

  const handleClose = () => {
    setLoading(true)
    setShow(false)
    setLoading(false)
  }

  const handleDelete = () => {
    setLoading(true)
    deleteBuilding(deleteId).then(() => setShow(false))
    setLoading(false)
  }

  const handleShow = (id: string) => {
    setLoading(true)
    setShow(true)
    setDeleteId(id)
    setLoading(false)
  }

  const editBuilding = async (id: string) => {
    setLoading(true)
    try {
      const response = await fetch(`${proxy}/buildings/buildings/` + id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const responseData = await response.json()
      await dispatch(setExistingBuilding(false))
      await dispatch(setEditingBuildingId(id))
      await dispatch(setEditingBuilding(responseData))
      await dispatch(setEditBuilding(true))
      setLoading(false)
    } catch (errors) {
      errors_ = errors
      setLoading(false)
      console.log(errors)
    }
  }

  const deleteBuilding = async (id: string) => {
    setLoading(true)
    try {
      const response = await fetch(`${proxy}/buildings/buildings/` + id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      await response.json()
      buildingList = buildingList.filter((building: any) => building._id !== id)
      await dispatch(setBuildings(buildingList))
      await dispatch(setEditBuilding(false))
      await dispatch(setExistingBuilding(false))
      setLoading(false)
    } catch (errors) {
      errors_ = errors
      setLoading(false)
      console.log(errors)
    }
  }

  return (
    <div>
      <div>
        <Form>
          <Form.Row>
            <Form.Group controlId='formBuildingName'>
              <Form.Label>Building Name</Form.Label>
              <Form.Control type='text'
                            value={building.buildingName}
                            onChange={handleChangeBuildingNameSearch}
                            placeholder='Search by Building Name'
                            title='Search by building name.'/>
            </Form.Group>
            <Form.Group controlId='formLocatedCenter'>
              <Form.Label>Located Center</Form.Label>
              <Form.Control as='select'
                            value={building.centerName}
                            onChange={handleChangeCenterNameSearch}
                            title='Search by located center.'>
                <option value="">Search by Located Center</option>
                {
                  centers && centers.map((center: any) => {
                    return (
                      <option key={center._id}
                              value={center.centerName}>
                        {center.centerName}
                      </option>
                    )
                  })
                }
              </Form.Control>
            </Form.Group>
          </Form.Row>
        </Form>
      </div>
      <div>
        <Modal show={show}
               onHide={handleClose}
               deleteId={deleteId}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Building</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this building?</Modal.Body>
          <Modal.Footer>
            <Button variant='success'
                    onClick={handleClose}>
              Close
            </Button>
            <Button variant='danger'
                    onClick={handleDelete}>
              Delete
            </Button>
          </Modal.Footer>
          {
            loading && (
              <Spinner animation='border'
                       style={{
                         textAlign: 'center',
                         marginLeft: '50%'
                       }}/>
            )
          }
        </Modal>
        <CardColumns>
          {
            buildings && buildings.map((building: any) => {
              return (
                <Card key={building._id}>
                  <Card.Body>
                    <Card.Title>
                      {building.buildingName}
                    </Card.Title>
                    <Card.Text>
                      <small className='text-muted'>
                        {building.centerName}
                      </small>
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <Row>
                      <Button onClick={() => editBuilding(building._id)}
                              style={{
                                color: 'darkgreen',
                                backgroundColor: 'white'
                              }}>
                        <FaEdit size={25}/>
                      </Button>
                      <Button onClick={() => handleShow(building._id)}
                              style={{
                                color: 'indianred',
                                backgroundColor: 'white'
                              }}>
                        <FaTrashAlt size={25}/>
                      </Button>
                      {
                        loading && (
                          <Spinner animation='border'
                                   style={{
                                     textAlign: 'center',
                                     marginLeft: '50%'
                                   }}/>
                        )
                      }
                    </Row>
                  </Card.Footer>
                </Card>
              )
            })
          }
        </CardColumns>
      </div>
      {
        errors_ && (
          <div style={{
            color: 'red',
            fontSize: '18px',
            marginTop: '7px',
            textAlign: 'center'
          }}>
            {errors_}
          </div>
        )
      }
    </div>
  )
}

export default BuildingsList
