import React from 'react'
import {Route, Switch} from 'react-router-dom'
import routes from './constants/routes.json'
import App from './containers/App'
import HomePage from './containers/HomePage'
import WorkingDaysHoursView from './Pages/WorkingDaysHours/WorkingDaysAndHoursView'
import WorkingDaysHours from './Pages/WorkingDaysHours/WorkingDaysHours'
import WorkingDaysHoursEdit from './Pages/WorkingDaysHours/WorkingDaysHoursEdit'
import GroupsAdd from './Pages/Groups/groupsAdd'
import TagsAdd from './Pages/Tags/tagsAdd'
import TagsEdit from './Pages/Tags/tagsEdit'
import TagsListView from './Pages/Tags/tagsListView'
import BuildingsPage from './Pages/Buildings/buildings-page'
import RoomsPage from './Pages/Rooms/rooms-page'
import LecturersStatisticsPage from './Pages/LecturersStatistics/lecturers-statistics-page'
import StudentsStatisticsPage from './Pages/StudentsStatistics/students-statistics-page'
import SubjectsStatisticsPage from './Pages/SubjectsStatistics/subjects-statistics-page'

const LazyCounterPage = React.lazy(() =>
  import('./containers/CounterPage')
)

const CounterPage = (props: Record<string, any>) => (
  <React.Suspense fallback={<h1>Loading...</h1>}>
    <LazyCounterPage {...props} />
  </React.Suspense>
)

export default function Routes() {
  return (
    <App>
      <Switch>
        <Route path={routes.COUNTER}
               component={CounterPage}/>
        <Route path={routes.WORKING_DAYS_AND_HOURS_VIEW}
               component={WorkingDaysHoursView}/>
        <Route path={routes.WORKING_DAYS_AND_HOURS}
               component={WorkingDaysHours}/>
        <Route path={routes.WORKING_DAYS_AND_HOURS_Edit}
               component={WorkingDaysHoursEdit}/>
        <Route path={routes.GROUPS_ADD}
               component={GroupsAdd}/>
        <Route path={routes.TAGS_ADD}
               component={TagsAdd}/>
        <Route path={routes.TAGS_EDIT}
               component={TagsEdit}/>
        <Route path={routes.TAGS_LIST_VIEW}
               component={TagsListView}/>
        <Route path={routes.BUILDINGS}
               component={BuildingsPage}/>
        <Route path={routes.ROOMS}
               component={RoomsPage}/>
        <Route path={routes.STATISTICS_OF_LECTURERS}
               component={LecturersStatisticsPage}/>
        <Route path={routes.STATISTICS_OF_STUDENTS}
               component={StudentsStatisticsPage}/>
        <Route path={routes.STATISTICS_OF_SUBJECTS}
               component={SubjectsStatisticsPage}/>
        <Route path={routes.HOME}
               component={HomePage}/>
      </Switch>
    </App>
  )
}
