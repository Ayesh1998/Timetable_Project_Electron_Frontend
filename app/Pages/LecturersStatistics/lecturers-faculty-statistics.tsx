import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {proxy} from '../../conf'
import {setLecturersFacultyStatistics} from './lecturers-statistics-slice'

let errors_: string = ''

const LecturersFacultyStatistics: React.FC = () => {
  const dispatch = useDispatch()

  const [loading, setLoading] = useState<boolean>(false)
  const [lecturersFacultyStatisticsArray, setLecturersFacultyStatisticsArray] = useState<any>([])

  const getLecturersFacultyStatistics = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${proxy}/lecturersStatistics/lecturerCountByFaculty`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const responseData = await response.json()
      setLecturersFacultyStatisticsArray(responseData)
      await dispatch(setLecturersFacultyStatistics(responseData))
      setLoading(false)
    } catch (errors) {
      errors_ = errors
      setLoading(false)
      console.log(errors)
    }
  }

  useEffect(() => {
    getLecturersFacultyStatistics().then(() => {
    })
  }, [])

  return (
    <div>

    </div>
  )
}

export default LecturersFacultyStatistics
