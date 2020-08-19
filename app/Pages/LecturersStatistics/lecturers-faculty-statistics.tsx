import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {Spinner, Table} from 'react-bootstrap'
import {proxy} from '../../conf'
import {setLecturersFacultyStatistics} from './lecturers-statistics-slice'

let errors_: string = ''

const LecturersFacultyStatistics: React.FC = () => {
  const dispatch = useDispatch()

  const [loading, setLoading] = useState<boolean>(false)
  const [lecturersFacultyStatisticsArray, setLecturersFacultyStatisticsArray] = useState<any>([])

  const getLecturersFacultyStatistics = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${proxy}/lecturersStatistics/lecturerCountByFaculty`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const responseData = await response.json()
      setLecturersFacultyStatisticsArray(responseData)
      await dispatch(setLecturersFacultyStatistics(responseData))
      setLoading(false)
    } catch (errors) {
      errors_ = errors
      setLoading(false)
      console.log(errors)
    }
  }

  useEffect(() => {
    getLecturersFacultyStatistics().then(() => {
    })
  }, [])

  return (
    <div>
      {
        loading && (
          <Spinner animation='border'
                   style={{
                     textAlign: 'center',
                     marginLeft: '50%'
                   }}/>
        )
      }
      <Table responsive
             striped
             bordered
             hover
             size='sm'
             style={{
               border: 'solid darkblue 1px'
             }}>
        <thead style={{
          backgroundColor: '#0350a2'
        }}>
        <th style={{
          borderBottom: 'solid darkblue 1px'
        }}>
          Faculty
        </th>
        <th style={{
          borderBottom: 'solid darkblue 1px'
        }}>
          Count
        </th>
        </thead>
        <tbody>
        {
          lecturersFacultyStatisticsArray && lecturersFacultyStatisticsArray.map((lecturersFacultyStatisticsArrayElement: any) => {
            return (
              <tr key={lecturersFacultyStatisticsArrayElement._id.faculty}>
                <td>{lecturersFacultyStatisticsArrayElement._id.faculty}</td>
                <td>{lecturersFacultyStatisticsArrayElement.lecturersCount}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
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

export default LecturersFacultyStatistics
