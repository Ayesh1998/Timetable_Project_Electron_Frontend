import {combineReducers} from 'redux'
import {connectRouter} from 'connected-react-router'
import {History} from 'history'
import workingDaysHoursReducer from './Pages/WorkingDaysHours/workingDaysHoursSlice'
import groupsReducer from './Pages/Groups/groupsSlice'
import tagsReducer from './Pages/Tags/tagsSlice'
import buildingsReducer from './Pages/Buildings/buildings-slice'
import roomsReducer from './Pages/Rooms/rooms-slice'
import lecturersStatisticsReducer from './Pages/LecturersStatistics/lecturers-statistics-slice'
import studentsStatisticsReducer from './Pages/StudentsStatistics/students-statistics-slice'
import subjectsStatisticsReducer from './Pages/SubjectsStatistics/subjects-statistics-slice'

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    workingDaysHours: workingDaysHoursReducer,
    groups: groupsReducer,
    tags: tagsReducer,
    buildings: buildingsReducer,
    rooms: roomsReducer,
    lecturersStatistics: lecturersStatisticsReducer,
    studentsStatistics: studentsStatisticsReducer,
    subjectsStatistics: subjectsStatisticsReducer
  })
}
