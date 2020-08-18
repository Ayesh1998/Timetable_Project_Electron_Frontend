import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
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

    </div>
  )
}

export default LecturersLevelStatistics
