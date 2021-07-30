import * as Utils from '../utils/strings'

export interface MainState {
    loading       : boolean
    getAccessToken: (() => Promise<string>) | undefined
    name          : string
    helloText     : string
}

export interface State {
    mainReducer: MainState
}

export const initialMainState: MainState = {
    loading       : true,
    getAccessToken: undefined,
    name          : 'world',
    helloText     : Utils.helloString('world')
}

export const initialState: State = {
    mainReducer: initialMainState
}
