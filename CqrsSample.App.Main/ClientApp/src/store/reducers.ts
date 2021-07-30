import * as Redux   from 'redux'
import * as States  from './states'
import * as Actions from './actions'

const mainReducer = (state = States.initialMainState, action: Actions.Action) => {
    switch (action.type) {
        case 'SET_LOADING':
            return {
                ...state,
                loading: action.payload.loading
            }
        case 'SET_AUTH0':
            return {
                ...state,
                getAccessToken: action.payload.getAccessToken
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
        default:
            return state
    }
}

export const reducer = Redux.combineReducers({
    mainReducer
})
