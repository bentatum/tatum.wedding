import faker from 'faker'
import { failureType } from '..'

describe('async/lib/failureType', () => {
  test('defaults', () => {
    const result = failureType()
    expect(result).toBe(null)
  })

  test('with actionType', () => {
    const actionType = faker.lorem.slug()
    const result = failureType(actionType)
    expect(result).toBe(`${actionType}/failure`)
  })
})
