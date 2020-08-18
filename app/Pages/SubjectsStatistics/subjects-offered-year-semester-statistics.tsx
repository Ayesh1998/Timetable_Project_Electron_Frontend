import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {proxy} from '../../conf'
import {setSubjectsOfferedYearSemesterStatistics} from './subjects-statistics-slice'

let errors_: string = ''

const SubjectsOfferedYearSemesterStatistics: React.FC = () => {
  const dispatch = useDispatch()

  const [loading, setLoading] = useState<boolean>(false)
  const [subjectsOfferedYearSemesterStatisticsArray, setSubjectsOfferedYearSemesterStatisticsArray] = useState<any>([])

  const getSubjectsOfferedYearSemesterStatistics = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${proxy}/subjectsStatistics/subjectsCountByOfferedYearAndSemester`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const responseData = await response.json()
      setSubjectsOfferedYearSemesterStatisticsArray(responseData)
      await dispatch(setSubjectsOfferedYearSemesterStatistics(responseData))
      setLoading(false)
    } catch (errors) {
      errors_ = errors
      setLoading(false)
      console.log(errors)
    }
  }

  useEffect(() => {
    getSubjectsOfferedYearSemesterStatistics().then(() => {
    })
  }, [])

  return (
    <div>

    </div>
  )
}

export default SubjectsOfferedYearSemesterStatistics
