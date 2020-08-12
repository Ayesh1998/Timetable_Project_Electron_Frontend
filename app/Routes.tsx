/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';
import App from './containers/App';
import HomePage from './containers/HomePage';
import WorkingDaysHoursView from './Pages/WorkingDaysHours/WorkingDaysAndHoursView';
import WorkingDaysHours from './Pages/WorkingDaysHours/WorkingDaysHours';
import WorkingDaysHoursEdit from './Pages/WorkingDaysHours/WorkingDaysHoursEdit';

// Lazily load routes and code split with webpacck
const LazyCounterPage = React.lazy(() =>
  import(/* webpackChunkName: "CounterPage" */ './containers/CounterPage')
);

const CounterPage = (props: Record<string, any>) => (
  <React.Suspense fallback={<h1>Loading...</h1>}>
    <LazyCounterPage {...props} />
  </React.Suspense>
);

export default function Routes() {
  return (
    <App>
      <Switch>
        <Route path={routes.COUNTER} component={CounterPage} />
        <Route
          path={routes.WORKING_DAYS_AND_HOURS_VIEW}
          component={WorkingDaysHoursView}
        />
        <Route
          path={routes.WORKING_DAYS_AND_HOURS}
          component={WorkingDaysHours}
        />
        <Route
          path={routes.WORKING_DAYS_AND_HOURS_Edit}
          component={WorkingDaysHoursEdit}
        />
        <Route path={routes.HOME} component={HomePage} />
      </Switch>
    </App>
  );
}
