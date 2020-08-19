import React from 'react'
import {Col, Row} from 'react-bootstrap'
import NavBar from '../../components/NavBar/NavBar'
import SubjectsTotalCountStatistics from './subjects-total-count-statistics'
import SubjectsOfferedYearStatistics from './subjects-offered-year-statistics'
import SubjectsOfferedYearSemesterStatistics from './subjects-offered-year-semester-statistics'

const SubjectsStatisticsPage: React.FC = () => {
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
          <h1>Statistics of Subjects</h1>
        </Col>
      </Row>
      <div className='container'>
        <SubjectsTotalCountStatistics/>
        <SubjectsOfferedYearStatistics/>
        <SubjectsOfferedYearSemesterStatistics/>
      </div>
    </div>
  )
}

export default SubjectsStatisticsPage
