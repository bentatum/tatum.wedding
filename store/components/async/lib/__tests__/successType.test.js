import faker from 'faker'
import { successType } from '..'

describe('async/lib/successType', () => {
  test('defaults', () => {
    const result = successType()
    expect(result).toBe(null)
  })

  test('with actionType', () => {
    const actionType = faker.lorem.slug()
    const result = successType(actionType)
    expect(result).toBe(`${actionType}/success`)
  })
})
