import * as React from 'react'
import ReactDOM   from 'react-dom'
import * as Redux from 'react-redux'
import * as Auth0 from '@auth0/auth0-react'
import axios      from 'axios'
import * as Store from './store'
import App        from './components/App'
import '../assets/scss/style.scss'

axios.get('/api/auth0/keys')
    .then(keys => {
        ReactDOM.render(<Main keys={keys.data}/>, document.getElementById('app'))
    })

export interface AppContextValue {
    keys: {
        domain  : string
        clientId: string
        audience: string
        scope   : string
    }
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
                    <App/>
                </AppContext.Provider>
            </Auth0.Auth0Provider>
        </Redux.Provider>
    )
}
