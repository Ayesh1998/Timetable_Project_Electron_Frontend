import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {proxy} from '../../conf'
import {setStudentsYearStatistics} from './students-statistics-slice'

let errors_: string = ''

const StudentsYearStatistics: React.FC = () => {
  const dispatch = useDispatch()

  const [loading, setLoading] = useState<boolean>(false)
  const [studentsYearStatisticsArray, setStudentsYearStatisticsArray] = useState<any>([])

  const getStudentsYearStatistics = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${proxy}/studentsStatistics/groupsCountByAcademicYear`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const responseData = await response.json()
      setStudentsYearStatisticsArray(responseData)
      await dispatch(setStudentsYearStatistics(responseData))
      setLoading(false)
    } catch (errors) {
      errors_ = errors
      setLoading(false)
      console.log(errors)
    }
  }

  useEffect(() => {
    getStudentsYearStatistics().then(() => {
    })
  }, [])

  return (
    <div>

    </div>
  )
}

export default StudentsYearStatistics
