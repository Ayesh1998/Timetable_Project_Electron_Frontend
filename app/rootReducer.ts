import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import workingDaysHoursReducer from './Pages/WorkingDaysHours/workingDaysHoursSlice';
import buildingsReducer from './Pages/Buildings/buildings-slice';
import roomsReducer from './Pages/Rooms/rooms-slice';
import groupsReducer from './Pages/Groups/groupsSlice';
import tagsReducer from './Pages/Tags/tagsSlice';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    workingDaysHours: workingDaysHoursReducer,
    buildings: buildingsReducer,
    rooms: roomsReducer,
    groups: groupsReducer,
    tags: tagsReducer,
  });
}
