import { Dispatch } from 'redux'
import { Action }   from '../store/actions'

export const helloSocket = new WebSocket('wss://echo.websocket.org')

export type EventListener = { func: (ev: MessageEvent<any>) => void }

export const addEventListener = (dispatch: Dispatch<Action>): EventListener => {
    helloSocket.addEventListener('open', () => {
        dispatch({
            type   : 'SET_LOADING',
            payload: {
                loading: false
            }
        })
    })
    
    const func = (ev: MessageEvent<any>) => {
        dispatch({
            type   : 'RECEIVE_HELLO',
            payload: {
                hello: ev.data
            }
        })
    }

    helloSocket.addEventListener('message', func)

    return { func }
}

export const removeEventListener = (listener: EventListener): void => {
    helloSocket.removeEventListener('message', listener.func)
}
