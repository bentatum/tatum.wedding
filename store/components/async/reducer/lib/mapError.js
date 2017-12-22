import { get } from 'lodash'

export default (state, action) => {
  const payload = get(action, 'payload.payload')
  const type = get(action, 'payload.type')
  const errors = get(state, 'errors', {})
  errors[type] = payload
  return { ...state, errors }
}
