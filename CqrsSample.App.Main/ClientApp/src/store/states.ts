import { helloString } from '../utils/strings'

export interface MainState {
    loading    : boolean
    name       : string
    helloText  : string
    contentText: string
    contents   : string[]
}

export interface State {
    mainReducer: MainState
}

export const initialMainState: MainState = {
    loading    : true,
    name       : 'world',
    helloText  : helloString('world'),
    contentText: 'content',
    contents   : []
}

export const initialState: State = {
    mainReducer: initialMainState
}
