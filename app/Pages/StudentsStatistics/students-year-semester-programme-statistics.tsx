import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {proxy} from '../../conf'
import {setStudentsYearSemesterProgrammeStatistics} from './students-statistics-slice'

let errors_: string = ''

const StudentsYearSemesterProgrammeStatistics: React.FC = () => {
  const dispatch = useDispatch()

  const [loading, setLoading] = useState<boolean>(false)
  const [studentsYearSemesterProgrammeStatisticsArray, setStudentsYearSemesterProgrammeStatisticsArray] = useState<any>([])

  const getStudentsYearSemesterProgrammeStatistics = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${proxy}/studentsStatistics/groupsCountByAcademicYearSemesterAndProgramme`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const responseData = await response.json()
      setStudentsYearSemesterProgrammeStatisticsArray(responseData)
      await dispatch(setStudentsYearSemesterProgrammeStatistics(responseData))
      setLoading(false)
    } catch (errors) {
      errors_ = errors
      setLoading(false)
      console.log(errors)
    }
  }

  useEffect(() => {
    getStudentsYearSemesterProgrammeStatistics().then(() => {
    })
  }, [])

  return (
    <div>

    </div>
  )
}

export default StudentsYearSemesterProgrammeStatistics
