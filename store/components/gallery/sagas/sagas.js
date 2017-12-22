import { takeLatest } from 'redux-saga/effects'

export default function * () {
  yield takeLatest(require('../actionTypes').READ, require('./read').default)
}
