import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
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

    </div>
  )
}

export default LecturersCenterStatistics
