import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Col, Row, Spinner, Table } from 'react-bootstrap'
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, Tooltip, XAxis, YAxis } from 'recharts'
import { proxy } from '../../conf'
import { setLecturersCenterStatistics } from './lecturers-statistics-slice'

let errors_: string = ''
let data: any = []
const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#D0ED57',
  '#8884D8',
  '#8DD1E1',
  '#50fa00'
]

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
      <h5 className='text-center'>
        Number of Lecturers per Center
      </h5>
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
            borderBottom: 'solid darkblue 1px',
            borderLeft: 'solid darkblue 1px',
            borderTop: 'solid darkblue 1px',
            textAlign: 'center',
            fontSize: 'large',
            fontWeight: 'lighter',
            color: 'white'
          }}>
            Center
          </th>
          <th style={{
            borderBottom: 'solid darkblue 1px',
            borderTop: 'solid darkblue 1px',
            borderRight: 'solid darkblue 1px',
            textAlign: 'center',
            fontSize: 'large',
            fontWeight: 'lighter',
            color: 'white'
          }}>
            Count
          </th>
          </thead>
          <tbody>
          {
            lecturersCenterStatisticsArray && lecturersCenterStatisticsArray.map((lecturersCenterStatisticsArrayElement: any) => {
              return (
                <tr key={lecturersCenterStatisticsArrayElement._id.center}>
                  <td style={{
                    textAlign: 'center'
                  }}>
                    {lecturersCenterStatisticsArrayElement._id.center}
                  </td>
                  <td style={{
                    textAlign: 'center'
                  }}>
                    {lecturersCenterStatisticsArrayElement.lecturersCount}
                  </td>
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
      <div style={{
        marginLeft: '-20px',
        marginTop: '20px'
      }}>
        <Row>
          <Col sm='7'>
            <div>
              <BarChart width={340}
                        height={320}
                        data={data}>
                <CartesianGrid strokeDasharray='3 3'/>
                <XAxis dataKey='name'/>
                <YAxis/>
                <Tooltip/>
                <Bar dataKey='count'
                     fill='#8884d8'
                     label={{
                       position: 'center',
                       color: 'black'
                     }}>
                  {
                    data.map((_entry: any, index: number) => (
                      <Cell key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}/>
                    ))
                  }
                </Bar>
              </BarChart>
            </div>
          </Col>
          <Col sm='5'>
            <div>
              <PieChart width={500}
                        height={500}>
                <Pie data={data}
                     cx={130}
                     cy={150}
                     outerRadius={110}
                     fill='#8884d8'
                     dataKey='value'
                     isAnimationActive={true}
                     labelLine={false}
                     label>
                  {
                    data.map((_entry: any, index: number) => (
                      <Cell key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}/>
                    ))
                  }
                </Pie>
                <Tooltip/>
              </PieChart>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default LecturersCenterStatistics
