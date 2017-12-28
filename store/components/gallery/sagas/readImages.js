import { rsfb } from 'lib'
import { shuffle } from 'lodash'
import { all, call, put } from 'redux-saga/effects'
import {
  pending,
  success,
  failure,
  error
} from 'store/components/async/actions'
import { READ_IMAGES } from '../actionTypes'
import { set } from '../actions'

export default function * (action) {
  try {
    yield put(pending(READ_IMAGES))
    let images = []
    const snapshot = yield call(rsfb.firestore.getCollection, 'wedding-photos')
    snapshot.forEach(img => {
      images.push(img.data())
    })
    images = shuffle(images)
    yield all([put(success(READ_IMAGES)), put(set({ images }))])
    yield put(success(READ_IMAGES))
  } catch (err) {
    yield all([put(error(READ_IMAGES, err)), put(failure(READ_IMAGES))])
  }
}
