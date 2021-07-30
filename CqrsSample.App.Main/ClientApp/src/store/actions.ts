
export type Action =
    SetLoading     |
    SetName        |
    SetHelloText   |
    SetContentText |
    AddContent     |
    RemoveContent  |
    SendHello      |
    ReceiveHello

export interface SetLoading {
    type   : 'SET_LOADING'
    payload: {
        loading: boolean
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

export interface SetContentText {
    type   : 'SET_CONTENT_TEXT'
    payload: {
        contentText: string
    }
}

export interface AddContent {
    type   : 'ADD_CONTENT'
    payload: {
    }
}

export interface RemoveContent {
    type   : 'REMOVE_CONTENT'
    payload: {
        index: number
    }
}

export interface SendHello {
    type   : 'SEND_HELLO'
    payload: {
        hello: string
    }
}

export interface ReceiveHello {
    type   : 'RECEIVE_HELLO'
    payload: {
        hello: string
    }
}
