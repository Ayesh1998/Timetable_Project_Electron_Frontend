import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {Spinner, Table} from 'react-bootstrap'
import {proxy} from '../../conf'
import {setLecturersLevelStatistics} from './lecturers-statistics-slice'

let errors_: string = ''

const LecturersLevelStatistics: React.FC = () => {
  const dispatch = useDispatch()

  const [loading, setLoading] = useState<boolean>(false)
  const [lecturersLevelStatisticsArray, setLecturersLevelStatisticsArray] = useState<any>([])

  const getLecturersLevelStatistics = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${proxy}/lecturersStatistics/lecturerCountByLevel`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const responseData = await response.json()
      setLecturersLevelStatisticsArray(responseData)
      await dispatch(setLecturersLevelStatistics(responseData))
      setLoading(false)
    } catch (errors) {
      errors_ = errors
      setLoading(false)
      console.log(errors)
    }
  }

  useEffect(() => {
    getLecturersLevelStatistics().then(() => {
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
          lecturersLevelStatisticsArray && lecturersLevelStatisticsArray.map((lecturersLevelStatisticsArrayElement: any) => {
            return (
              <tr key={lecturersLevelStatisticsArrayElement._id.level}>
                <td>{lecturersLevelStatisticsArrayElement._id.level}</td>
                <td>{lecturersLevelStatisticsArrayElement.lecturersCount}</td>
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

export default LecturersLevelStatistics
