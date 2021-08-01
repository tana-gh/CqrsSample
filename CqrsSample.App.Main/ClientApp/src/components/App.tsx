import * as React   from 'react'
import * as Redux   from 'react-redux'
import * as Router  from 'react-router-dom'
import * as Mui     from '@material-ui/core'
import * as Auth0   from '@auth0/auth0-react'
import IndexPage    from './IndexPage'
import HelloPage    from './HelloPage'
import NotFoundPage from './NotFoundPage'
import * as Main    from '../index'
import * as States  from '../store/states'
import * as Actions from '../store/actions'

const useStyles = Mui.makeStyles({
    grow: {
        flexGrow: 1
    }
})

export default (): React.FunctionComponentElement<void> => {
    const classes      = useStyles()
    const appContext   = React.useContext(Main.AppContext)
    const [ userInfo ] = Redux.useSelector((state: States.State) => [ state.mainReducer.userInfo ])
    const dispatch     = Redux.useDispatch<React.Dispatch<Actions.Action>>()
    const {
        isLoading,
        isAuthenticated,
        getAccessTokenSilently
    } = Auth0.useAuth0()

    const getAccessToken = React.useCallback(() =>
        getAccessTokenSilently({
            audience: appContext.keys.audience,
            scope   : appContext.keys.scope
        })
    , [ getAccessTokenSilently ])

    React.useEffect(() =>
        dispatch({
            type   : 'SET_AUTH0',
            payload: {
                getAccessToken
            }
        })
    , [ dispatch, getAccessTokenSilently ])

    React.useEffect(() => {
        dispatch({
            type   : 'REQ_USER_INFO',
            payload: {}
        })
    }, [ dispatch, isAuthenticated ])

    return (
        <Router.HashRouter basename="/" hashType="slash">
            <header>
                <Mui.AppBar position="fixed">
                    <Mui.Toolbar>
                        <Mui.Typography>
                            React Page
                        </Mui.Typography>
                        <div className={classes.grow}/>
                        <Mui.Typography>
                            { userInfo.name }
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
