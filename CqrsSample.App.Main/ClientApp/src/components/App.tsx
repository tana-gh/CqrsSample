import * as React   from 'react'
import * as Router  from 'react-router-dom'
import * as Mui     from '@material-ui/core'
import * as Auth0   from '@auth0/auth0-react'
import IndexPage    from './IndexPage'
import HelloPage    from './HelloPage'
import NotFoundPage from './NotFoundPage'

export default (): React.FunctionComponentElement<void> => {
    const { isLoading } = Auth0.useAuth0()

    return (
        <Router.HashRouter basename="/" hashType="slash">
            <header>
                <Mui.AppBar position="fixed">
                    <Mui.Toolbar>
                        <Mui.Typography>
                            React Page
                        </Mui.Typography>
                    </Mui.Toolbar>
                </Mui.AppBar>
                <Mui.Toolbar/>
            </header>
            <main>
                { isLoading ? <Mui.CircularProgress/> : <AuthenticationRequired/> }
            </main>
        </Router.HashRouter>
    )
}

const AuthenticationRequired = Auth0.withAuthenticationRequired(() =>
    <Router.Switch>
        <Router.Route exact path="/">
            <IndexPage/>
        </Router.Route>
        <Router.Route path="/hello">
            <HelloPage/>
        </Router.Route>
        <Router.Route path="*">
            <NotFoundPage/>
        </Router.Route>
    </Router.Switch>
    , {
        onRedirecting: () => <div>Redirecting you to the login page...</div>
    }
)
