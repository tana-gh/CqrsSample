import * as States from "./states";

export type Action =
    SetLoading   |
    SetAuth0     |
    ReqUserInfo  |
    SetUserInfo  |
    SetName      |
    SetHelloText |
    ReqHello     |
    ResHello

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

export interface ReqUserInfo {
    type   : 'REQ_USER_INFO'
    payload: Record<string, never>
}

export interface SetUserInfo {
    type   : 'SET_USER_INFO'
    payload: {
        userInfo: States.UserInfo
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

export interface ReqHello {
    type   : 'REQ_HELLO'
    payload: {
        name: string
    }
}

export interface ResHello {
    type   : 'RES_HELLO'
    payload: {
        hello: string
    }
}
