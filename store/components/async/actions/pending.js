import { STATUS } from '../actionTypes'

export default (type, payload) => ({
  type: STATUS,
  payload: { type, status: 'pending', ...payload }
})
