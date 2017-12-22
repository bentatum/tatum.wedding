import { mapLocationChange } from '..'
import { isObject } from 'lodash'

describe('mapLocationChange', () => {
  test('defaults', () => {
    const foo = 'bar'
    const state = { foo }
    const result = mapLocationChange(state)
    expect(isObject(result)).toBe(true)
    expect(result).not.toHaveProperty('foo')
    expect(result).toHaveProperty('statuses', {})
    expect(result).toHaveProperty('errors', {})
  })
})
