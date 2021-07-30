import { call, ForkEffect, put, takeEvery } from 'redux-saga/effects'
import { Action, SendHello, ReceiveHello }  from './actions'
import { helloSocket }                      from '../utils/webSockets'

export function* saga(): Generator<ForkEffect<Action>, void> {
    yield takeEvery('SEND_HELLO'   , sendHello)
    yield takeEvery('RECEIVE_HELLO', receiveHello)
}

function* sendHello(action: Action) {
    yield call(data => helloSocket.send(data), (action as SendHello).payload.hello)
}

function* receiveHello(action: Action) {
    yield put({
        type   : 'SET_HELLO_TEXT',
        payload: {
            helloText: (action as ReceiveHello).payload.hello
        }
    })
}
