import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {Spinner, Table} from 'react-bootstrap'
import {proxy} from '../../conf'
import {setLecturersCenterStatistics} from './lecturers-statistics-slice'
import {Bar, BarChart, CartesianGrid, Legend, Pie, PieChart, Tooltip, XAxis, YAxis} from 'recharts'

let errors_: string = ''
let data: any = []

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
      data = []
      for (let i = 0; i < responseData.length; i++) {
        data = [...data,
          {
            name: responseData[i]._id.center,
            value: responseData[i].lecturersCount,
            count: responseData[i].lecturersCount
          }
        ]
      }
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
      <h4>Number of Lecturers per Center</h4>
      {
        loading && (
          <Spinner animation='border'
                   style={{
                     textAlign: 'center',
                     marginLeft: '50%'
                   }}/>
        )
      }
      <div>
        <Table responsive
               striped
               bordered
               hover
               size='sm'
               style={{
                 border: 'solid darkblue 1px',
                 marginTop: '10px'
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
            })
          }
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
      <div>
        <BarChart width={350}
                  height={300}
                  data={data}
                  margin={{
                    top: 10,
                    right: 5,
                    left: 5,
                    bottom: 10
                  }}>
          <CartesianGrid strokeDasharray='3 3'/>
          <XAxis dataKey='name'/>
          <YAxis/>
          <Tooltip/>
          <Legend/>
          <Bar dataKey='count'
               fill='#8884d8'/>
        </BarChart>
      </div>
      <div>
        <PieChart width={500}
                  height={500}>
          <Pie dataKey='value'
               isAnimationActive={true}
               data={data}
               cx={200}
               cy={150}
               outerRadius={130}
               fill='#8884d8'
               label>
          </Pie>
          <Tooltip/>
        </PieChart>
      </div>
    </div>
  )
}

export default LecturersCenterStatistics
