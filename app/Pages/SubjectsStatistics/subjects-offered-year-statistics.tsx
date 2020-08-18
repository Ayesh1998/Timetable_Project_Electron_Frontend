import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {proxy} from '../../conf'
import {setSubjectsOfferedYearStatistics} from './subjects-statistics-slice'

let errors_: string = ''

const SubjectsOfferedYearStatistics: React.FC = () => {
  const dispatch = useDispatch()

  const [loading, setLoading] = useState<boolean>(false)
  const [subjectsOfferedYearStatisticsArray, setSubjectsOfferedYearStatisticsArray] = useState<any>([])

  const getSubjectsOfferedYearStatistics = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${proxy}/subjectsStatistics/subjectsCountByOfferedYear`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const responseData = await response.json()
      setSubjectsOfferedYearStatisticsArray(responseData)
      await dispatch(setSubjectsOfferedYearStatistics(responseData))
      setLoading(false)
    } catch (errors) {
      errors_ = errors
      setLoading(false)
      console.log(errors)
    }
  }

  useEffect(() => {
    getSubjectsOfferedYearStatistics().then(() => {
    })
  }, [])

  return (
    <div>

    </div>
  )
}

export default SubjectsOfferedYearStatistics
