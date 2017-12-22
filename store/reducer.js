import { combineReducers } from 'redux'
import {responsiveStateReducer} from 'redux-responsive'

const reducers = {
  // form: require('redux-form').reducer,
  // user: require('./modules/user').reducer,
  async: require('./components/async').reducer,
  gallery: require('./components/gallery').reducer,
  browser: responsiveStateReducer
  // sales: require('./modules/sales').reducer,
  // products: require('./modules/products').reducer
}

export default combineReducers(reducers)
