import * as React  from 'react'
import ReactDOM    from 'react-dom'
import * as Redux  from 'react-redux'
import * as Router from 'react-router-dom'
import * as Auth0  from '@auth0/auth0-react'
import * as Store  from './store'
import App         from './components/App'
import * as Http   from './utils/http'
import '../assets/scss/style.scss'

Http.getJson('/api/auth0/keys')
.then(obj => {
    ReactDOM.render(<Main keys={obj as Auth0Keys}/>, document.getElementById('app'))
})

export interface Auth0Keys {
    domain  : string
    clientId: string
    audience: string
    scope   : string
}

export interface AppContextValue {
    keys: Auth0Keys
}

export const AppContext = React.createContext({} as AppContextValue)

type Props = AppContextValue

const Main = (props: Props) => {
    return (
        <Redux.Provider store={Store.store}>
            <Auth0.Auth0Provider
                domain     ={props.keys.domain}
                clientId   ={props.keys.clientId}
                audience   ={props.keys.audience}
                scope      ={props.keys.scope}
                redirectUri={window.location.origin}
            >
                <AppContext.Provider value={{ keys: props.keys }}>
                    <Router.HashRouter basename="/" hashType="slash">
                        <App/>
                    </Router.HashRouter>
                </AppContext.Provider>
            </Auth0.Auth0Provider>
        </Redux.Provider>
    )
}
