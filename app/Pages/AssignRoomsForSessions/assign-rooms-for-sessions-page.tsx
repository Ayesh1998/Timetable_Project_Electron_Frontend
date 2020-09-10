import React from 'react'
import {Col, Row} from 'react-bootstrap'
import NavBar from '../../components/NavBar/NavBar'

const AssignRoomsForSessionsPage: React.FC = () => {
  return (
    <div style={{
      minWidth: 'max-content',
      overflowX: 'hidden',
      marginBottom: '3%'
    }}>
      <NavBar/>
      <Row className='text-center mb-5'>
        <Col className='p-3'
             style={{
               backgroundColor: '#343a40',
               color: '#fff'
             }}>
          <h1>Assign Rooms for Sessions</h1>
        </Col>
      </Row>
      <div className='container'>
        Assign Rooms for Sessions
      </div>
    </div>
  )
}

export default AssignRoomsForSessionsPage
