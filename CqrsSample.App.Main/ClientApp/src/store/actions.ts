
export type Action =
    SetLoading   |
    SetAuth0     |
    SetName      |
    SetHelloText |
    SendName     |
    ReceiveHello

export interface SetLoading {
    type   : 'SET_LOADING'
    payload: {
        loading: boolean
    }
}

export interface SetAuth0 {
    type   : 'SET_AUTH0'
    payload: {
        getAccessToken: () => Promise<string>
    }
}

export interface SetName {
    type   : 'SET_NAME'
    payload: {
        name: string
    }
}

export interface SetHelloText {
    type   : 'SET_HELLO_TEXT'
    payload: {
        helloText: string
    }
}

export interface SendName {
    type   : 'SEND_NAME'
    payload: {
        name: string
    }
}

export interface ReceiveHello {
    type   : 'RECEIVE_HELLO'
    payload: {
        hello: string
    }
}
