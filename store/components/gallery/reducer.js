import { SET } from './actionTypes'

const INITIAL_STATE = {
  images: [],
  videos: []
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}
