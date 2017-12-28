import { all, takeLatest } from 'redux-saga/effects'

export default function * () {
  yield all([
    takeLatest(
      require('../actionTypes').READ_IMAGES,
      require('./readImages').default
    ),
    takeLatest(
      require('../actionTypes').READ_VIDEOS,
      require('./readVideos').default
    )
  ])
}
