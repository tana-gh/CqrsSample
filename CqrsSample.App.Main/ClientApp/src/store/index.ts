import * as Redux           from 'redux'
import createSagaMiddleware from 'redux-saga'
import * as Reducers        from './reducers'
import * as Sagas           from './sagas'

const sagaMiddleware = createSagaMiddleware()

export const store = Redux.createStore(Reducers.reducer, Redux.applyMiddleware(sagaMiddleware))

sagaMiddleware.run(Sagas.saga)
