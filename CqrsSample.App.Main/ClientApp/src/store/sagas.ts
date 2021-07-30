import * as Effects      from 'redux-saga/effects'
import { AxiosResponse } from 'axios'
import * as States       from './states'
import * as Actions      from './actions'
import * as Account      from '../utils/account'

export function* saga(): Generator<Effects.ForkEffect<Actions.Action>, void> {
    yield Effects.takeEvery('SEND_NAME'    , sendHello)
}

function* sendHello(action: Actions.Action) {
    const state: States.State = yield Effects.select()
    const getAccessToken = state.mainReducer.getAccessToken

    if (!getAccessToken) return

    const hello: AxiosResponse<any> = yield Effects.call(async payload => {
            const customAxios = await Account.customAxios(getAccessToken)
            return await customAxios.post('/api/home/hello', {
                name: payload.name
            })
        }, (action as Actions.SendName).payload)

    yield Effects.put({
        type   : 'SET_HELLO_TEXT',
        payload: {
            helloText: hello.data.hello
        }
    })
}
