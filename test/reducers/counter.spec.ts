import {AnyAction} from 'redux'
// @ts-ignore
import counterReducer, {decrement, increment} from '../../app/Pages/WorkingDaysHours/workingDaysHoursSlice'

describe('reducers', () => {
  describe('counter', () => {
    it('should handle initial state', () => {
      expect(counterReducer(undefined, {} as AnyAction)).toMatchSnapshot()
    })

    it('should handle INCREMENT_COUNTER', () => {
      // @ts-ignore
      expect(
        counterReducer({value: 1}, {type: increment})
      ).toMatchSnapshot()
    })

    it('should handle DECREMENT_COUNTER', () => {
      // @ts-ignore
      expect(
        counterReducer({value: 1}, {type: decrement})
      ).toMatchSnapshot()
    })

    it('should handle unknown action type', () => {
      // @ts-ignore
      expect(
        counterReducer({value: 1}, {type: 'unknown'})
      ).toMatchSnapshot()
    })
  })
})
