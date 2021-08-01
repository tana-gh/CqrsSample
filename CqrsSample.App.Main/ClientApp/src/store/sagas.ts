import * as Effects      from 'redux-saga/effects'
import { AxiosResponse } from 'axios'
import * as States       from './states'
import * as Actions      from './actions'
import * as Account      from '../utils/account'

export function* saga(): Generator<Effects.ForkEffect<Actions.Action>, void> {
    yield Effects.takeEvery('REQ_USER_INFO', reqUserInfo)
    yield Effects.takeEvery('REQ_HELLO'    , reqHello)
}

function* reqUserInfo(action: Actions.ReqUserInfo) {
    const state: States.State = yield Effects.select()
    const getAccessToken = state.mainReducer.getAccessToken

    if (!getAccessToken) return

    const userInfo: AxiosResponse<any> = yield Effects.call(async () => {
            const customAxios = await Account.customAxios(getAccessToken)
            return await customAxios.get('/api/user/info')
        })

    yield Effects.put({
        type   : 'SET_USER_INFO',
        payload: {
            userInfo: {
                ...userInfo.data
            }
        }
    })
}

function* reqHello(action: Actions.ReqHello) {
    const state: States.State = yield Effects.select()
    const getAccessToken = state.mainReducer.getAccessToken

    if (!getAccessToken) return

    const hello: AxiosResponse<any> = yield Effects.call(async payload => {
            const customAxios = await Account.customAxios(getAccessToken)
            return await customAxios.post('/api/home/hello', {
                name: payload.name
            })
        }, action.payload)

    yield Effects.put({
        type   : 'SET_HELLO_TEXT',
        payload: {
            helloText: hello.data.hello
        }
    })
}
