import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {proxy} from '../../conf'
import {setSubjectsTotalCountStatistics} from './subjects-statistics-slice'

let errors_: string = ''

const SubjectsTotalCountStatistics: React.FC = () => {
  const dispatch = useDispatch()

  const [loading, setLoading] = useState<boolean>(false)
  const [subjectsTotalCountStatisticsObject, setSubjectsTotalCountStatisticsObject] = useState<any>([])

  const getSubjectsTotalCountStatistics = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${proxy}/subjectsStatistics/totalSubjectsCount`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const responseData = await response.json()
      setSubjectsTotalCountStatisticsObject(responseData)
      await dispatch(setSubjectsTotalCountStatistics(responseData))
      setLoading(false)
    } catch (errors) {
      errors_ = errors
      setLoading(false)
      console.log(errors)
    }
  }

  useEffect(() => {
    getSubjectsTotalCountStatistics().then(() => {
    })
  }, [])

  return (
    <div>

    </div>
  )
}

export default SubjectsTotalCountStatistics
