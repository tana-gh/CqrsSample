import { combineReducers }  from 'redux'
import { initialMainState } from './states'
import { Action }           from './actions'

const mainReducer = (state = initialMainState, action: Action) => {
    switch (action.type) {
        case 'SET_LOADING':
            return {
                ...state,
                loading: action.payload.loading
            }
        case 'SET_NAME':
            return {
                ...state,
                name: action.payload.name
            }
        case 'SET_HELLO_TEXT':
            return {
                ...state,
                helloText: action.payload.helloText
            }
        case 'SET_CONTENT_TEXT':
            return {
                ...state,
                contentText: action.payload.contentText
            }
        case 'ADD_CONTENT':
            return {
                ...state,
                contents: [
                    ...state.contents,
                    state.contentText
                ]
            }
        case 'REMOVE_CONTENT':
            return {
                ...state,
                contents: [
                    ...(
                        action.payload.index > 0
                            ? state.contents.slice(0, action.payload.index)
                            : []
                    ),
                    ...(
                        action.payload.index < state.contents.length
                            ? state.contents.slice(action.payload.index + 1, state.contents.length)
                            : []
                    )
                ]
            }
        default:
            return state
    }
}

export const reducer = combineReducers({
    mainReducer
})
