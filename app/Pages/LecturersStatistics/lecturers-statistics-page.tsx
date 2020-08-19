import React from 'react'
import {Col, Row} from 'react-bootstrap'
import NavBar from '../../components/NavBar/NavBar'

const LecturersStatisticsPage: React.FC = () => {
  return (
    <div>
      <NavBar/>
      <Row className='text-center mb-5'>
        <Col xs={12}
             md={12}
             className='p-3'
             style={{
               backgroundColor: '#343a40',
               color: '#fff'
             }}>
          <h1>Statistics of Lecturers</h1>
        </Col>
      </Row>
    </div>
  )
}

export default LecturersStatisticsPage
