import * as Effects from 'redux-saga/effects'
import * as States  from './states'
import * as Actions from './actions'
import * as Http    from '../utils/http'

export function* saga(): Generator<Effects.ForkEffect<Actions.Action>, void> {
    yield Effects.takeEvery('REQ_USER_INFO', reqUserInfo)
    yield Effects.takeEvery('REQ_HELLO'    , reqHello)
}

function* reqUserInfo(action: Actions.ReqUserInfo) {
    const state: States.State = yield Effects.select()
    const getAccessToken = state.mainReducer.getAccessToken

    if (!getAccessToken) return

    const userInfo: Record<string, unknown> = yield Effects.call(async () =>
        await Http.getAuthJson('/api/user/info', getAccessToken)
    )

    yield Effects.put({
        type   : 'SET_USER_INFO',
        payload: {
            userInfo: {
                ...userInfo
            }
        }
    })
}

function* reqHello(action: Actions.ReqHello) {
    const state: States.State = yield Effects.select()
    const getAccessToken = state.mainReducer.getAccessToken

    if (!getAccessToken) return

    const hello: Record<string, unknown> = yield Effects.call(async payload =>
        await Http.postAuthJson('/api/home/hello', getAccessToken, {
            name: payload.name
        })
    , action.payload)

    yield Effects.put({
        type   : 'SET_HELLO_TEXT',
        payload: {
            helloText: hello.hello
        }
    })
}
