import { rsfb } from 'lib'
import { shuffle } from 'lodash'
import { all, call, put } from 'redux-saga/effects'
import {
  pending,
  success,
  failure,
  error
} from 'store/components/async/actions'
import { READ_VIDEOS } from '../actionTypes'
import { set } from '../actions'

export default function * (action) {
  try {
    yield put(pending(READ_VIDEOS))
    const videos = []
    const snapshot = yield call(rsfb.firestore.getCollection, 'wedding-videos')
    snapshot.forEach(video => { videos.push(video.data()) })
    yield all([put(success(READ_VIDEOS)), put(set({ videos: shuffle(videos) }))])
    yield put(success(READ_VIDEOS))
  } catch (err) {
    yield all([put(error(READ_VIDEOS, err)), put(failure(READ_VIDEOS))])
  }
}
