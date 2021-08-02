import * as Utils from '../utils/strings'

export interface MainState {
    loading       : boolean
    getAccessToken: (() => Promise<string>) | undefined
    userInfo      : UserInfo
    name          : string
    helloText     : string
}

export interface UserInfo {
    username  : string
    pictureUrl: string
    providers : string[]
}

export interface State {
    mainReducer: MainState
}

export const initialMainState: MainState = {
    loading       : true,
    getAccessToken: undefined,
    userInfo: {
        username  : '',
        pictureUrl: '',
        providers : []
    },
    name     : 'world',
    helloText: Utils.helloString('world')
}

export const initialState: State = {
    mainReducer: initialMainState
}
