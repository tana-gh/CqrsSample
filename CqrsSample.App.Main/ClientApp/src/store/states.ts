import * as Utils from '../utils/strings'

export interface MainState {
    loading       : boolean
    getAccessToken: (() => Promise<string>) | undefined
    userInfo      : UserInfo
    name          : string
    helloText     : string
}

export interface UserInfo {
    name      : string
    pictureUrl: string
}

export interface State {
    mainReducer: MainState
}

export const initialMainState: MainState = {
    loading       : true,
    getAccessToken: undefined,
    userInfo: {
        name      : '',
        pictureUrl: ''
    },
    name     : 'world',
    helloText: Utils.helloString('world')
}

export const initialState: State = {
    mainReducer: initialMainState
}
