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
        ReactDOM.render(
            <Redux.Provider store={Store.store}>
                <Auth0.Auth0Provider
                    domain={keys.data.domain}
                    clientId={keys.data.clientId}
                    audience={keys.data.audience}
                    scope={keys.data.scope}
                    redirectUri={window.location.origin}
                >
                    <App/>
                </Auth0.Auth0Provider>
            </Redux.Provider>
            , document.getElementById('app'))
    })
