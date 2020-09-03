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
import GroupsListView from './Pages/Groups/groupsListView'
import GroupsListViewEdit from './Pages/Groups/groupsListViewEdit'
import GroupsSingleView from './Pages/Groups/groupsSingleView'
import GroupsEdit from './Pages/Groups/groupsEdit'
import YearSemsAdd from './Pages/YearSems/yearsemsAdd'
import YearSemsEdit from './Pages/YearSems/yearsemsEdit'
import YearSemsListView from './Pages/YearSems/yearsemsListView'
import GroupNumsListView from './Pages/GroupNum/groupNumsListView'
import SubGroupNumsListView from './Pages/SubGroupNum/subGroupNumsListView'
import ProgramsListView from './Pages/Programme/programsListView'
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
        <Route path={routes.GROUPS_LIST_VIEW}
               component={GroupsListView}/>
        <Route path={routes.GROUPS_LIST_VIEW_EDIT}
               component={GroupsListViewEdit}/>
        <Route path={routes.GROUPS_EDIT}
               component={GroupsEdit}/>
        <Route path={routes.GROUPS_SINGLE_VIEW}
               component={GroupsSingleView}/>
        <Route path={routes.TAGS_ADD}
               component={TagsAdd}/>
        <Route path={routes.TAGS_EDIT}
               component={TagsEdit}/>
        <Route path={routes.TAGS_LIST_VIEW}
               component={TagsListView}/>
        <Route path={routes.YEARSEMS_ADD}
               component={YearSemsAdd}/>
        <Route path={routes.YEARSEMS_EDIT}
               component={YearSemsEdit}/>
        <Route path={routes.YEARSEMS_LIST_VIEW}
               component={YearSemsListView}/>
        <Route path={routes.GROUPNUMS_LIST_VIEW}
               component={GroupNumsListView}/>
        <Route path={routes.SUBGROUPNUMS_LIST_VIEW}
               component={SubGroupNumsListView}/>
        <Route path={routes.PROGRAMS_LIST_VIEW}
               component={ProgramsListView}/>
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
