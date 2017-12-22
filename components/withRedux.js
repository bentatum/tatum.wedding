import withRedux from 'next-redux-wrapper'
import nextReduxSaga from 'next-redux-saga'
import createStore from 'store/createStore'

export default (...connectArgs) => BaseComponent =>
  withRedux(createStore, ...connectArgs)(nextReduxSaga(BaseComponent))
