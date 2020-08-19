import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {Spinner, Table} from 'react-bootstrap'
import {proxy} from '../../conf'
import {setLecturersCenterStatistics} from './lecturers-statistics-slice'

let errors_: string = ''

const LecturersCenterStatistics: React.FC = () => {
  const dispatch = useDispatch()

  const [loading, setLoading] = useState<boolean>(false)
  const [lecturersCenterStatisticsArray, setLecturersCenterStatisticsArray] = useState<any>([])

  const getLecturersCenterStatistics = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${proxy}/lecturersStatistics/lecturerCountByCenter`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const responseData = await response.json()
      setLecturersCenterStatisticsArray(responseData)
      await dispatch(setLecturersCenterStatistics(responseData))
      setLoading(false)
    } catch (errors) {
      errors_ = errors
      setLoading(false)
      console.log(errors)
    }
  }

  useEffect(() => {
    getLecturersCenterStatistics().then(() => {
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
          Level
        </th>
        <th style={{
          borderBottom: 'solid darkblue 1px'
        }}>
          Count
        </th>
        </thead>
        <tbody>
        {
          lecturersCenterStatisticsArray && lecturersCenterStatisticsArray.map((lecturersCenterStatisticsArrayElement: any) => {
            return (
              <tr key={lecturersCenterStatisticsArrayElement._id.center}>
                <td>{lecturersCenterStatisticsArrayElement._id.center}</td>
                <td>{lecturersCenterStatisticsArrayElement.lecturersCount}</td>
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

export default LecturersCenterStatistics
