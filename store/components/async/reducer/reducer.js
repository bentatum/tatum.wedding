import { ERROR, STATUS } from '../actionTypes'
import { INITIAL_STATE } from './config'
import { mapStatus, mapError } from './lib'

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case STATUS:
      return mapStatus(state, action)
    case ERROR:
      return mapError(state, action)
    default:
      return state
  }
}
