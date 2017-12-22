import { rsfb } from 'lib'
import { all, call, put } from 'redux-saga/effects'
import {
  pending,
  success,
  failure,
  error
} from 'store/components/async/actions'
import { READ } from '../actionTypes'
import { set } from '../actions'
// import { compact } from 'lodash'

export default function * (action) {
  try {
    yield put(pending(READ))
    const images = yield call(rsfb.database.read, 'wedding-photos')
    console.log(images)
    yield all([put(success(READ)), put(set({ images }))])
    yield put(success(READ))
  } catch (err) {
    console.log(err)
    yield all([put(error(READ, err)), put(failure(READ))])
  }
}
