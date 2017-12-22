import faker from 'faker'
import { mapError } from '..'

describe('mapError', () => {
  let foo
  let type
  let results
  let message
  let payload

  beforeEach(() => {
    foo = 'bar'
    message = faker.lorem.words()
    type = faker.lorem.slug()
    const errors = { [type]: message }
    const state = { foo, errors }

    const payload = faker.lorem.words()
    const action = { payload }
    results = mapError(state, action)
  })

  test('defaults', () => {
    expect(results).toHaveProperty('errors')
    expect(results).toHaveProperty('foo', foo)
  })

  test('errors', () => {
    expect(results.errors).toHaveProperty(type, message)
  })
})
