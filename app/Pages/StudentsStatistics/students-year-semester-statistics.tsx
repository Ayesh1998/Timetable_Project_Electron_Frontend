import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {proxy} from '../../conf'
import {setStudentsYearSemesterStatistics} from './students-statistics-slice'

let errors_: string = ''

const StudentsYearSemesterStatistics: React.FC = () => {
  const dispatch = useDispatch()

  const [loading, setLoading] = useState<boolean>(false)
  const [studentsYearSemesterStatisticsArray, setStudentsYearSemesterStatisticsArray] = useState<any>([])

  const getStudentsYearSemesterStatistics = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${proxy}/studentsStatistics/groupsCountByAcademicYearAndSemester`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const responseData = await response.json()
      setStudentsYearSemesterStatisticsArray(responseData)
      await dispatch(setStudentsYearSemesterStatistics(responseData))
      setLoading(false)
    } catch (errors) {
      errors_ = errors
      setLoading(false)
      console.log(errors)
    }
  }

  useEffect(() => {
    getStudentsYearSemesterStatistics().then(() => {
    })
  }, [])

  return (
    <div>

    </div>
  )
}

export default StudentsYearSemesterStatistics
