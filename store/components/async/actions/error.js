import { ERROR } from '../actionTypes'

export default (type, payload) => ({
  type: ERROR,
  payload: { type, payload }
})
