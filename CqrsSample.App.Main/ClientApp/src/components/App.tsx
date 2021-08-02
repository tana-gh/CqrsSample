import * as React   from 'react'
import * as Redux   from 'react-redux'
import * as Router  from 'react-router-dom'
import * as Mui     from '@material-ui/core'
import * as Icons   from '@material-ui/icons'
import * as Auth0   from '@auth0/auth0-react'
import IndexPage    from './IndexPage'
import ProfilePage  from './ProfilePage'
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
    const history      = Router.useHistory()
    const {
        isLoading,
        isAuthenticated,
        getAccessTokenSilently,
        logout
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

    const [ userMenuAnchor, setUserMenuAnchor ] = React.useState<Element | null>(null)
    const openUserMenu  = React.useCallback((ev: React.UIEvent) => setUserMenuAnchor(ev.currentTarget), [ setUserMenuAnchor ])
    const closeUserMenu = React.useCallback(()                  => setUserMenuAnchor(null)            , [ setUserMenuAnchor ])

    const onIndexClick   = React.useCallback(() => {                          history.push('/')        }, [ history ])
    const onProfileClick = React.useCallback(() => { setUserMenuAnchor(null); history.push('/profile') }, [ history ])
    const onLogoutClick  = React.useCallback(() => { setUserMenuAnchor(null); logout()                 }, [ logout  ])

    return (
        <>
            <Mui.AppBar position="fixed">
                <Mui.Toolbar>
                    <Mui.Button color="inherit" onClick={onIndexClick}>
                        React Page
                    </Mui.Button>
                    <div className={classes.grow}/>
                    {
                        isAuthenticated &&
                            <>
                                <Mui.Typography>
                                    { userInfo.username }
                                </Mui.Typography>
                                <Mui.IconButton color="inherit" onClick={openUserMenu}>
                                    <Icons.AccountCircle/>
                                </Mui.IconButton>
                                <Mui.Menu
                                    anchorEl={userMenuAnchor}
                                    open    ={!!userMenuAnchor}
                                    onClose ={closeUserMenu}
                                    anchorOrigin={{
                                        vertical  : 'top',
                                        horizontal: 'right'
                                    }}
                                    transformOrigin={{
                                        vertical  : 'top',
                                        horizontal: 'right'
                                    }}
                                    keepMounted
                                >
                                    <Mui.MenuItem onClick={onProfileClick}>
                                        Profile
                                    </Mui.MenuItem>
                                    <Mui.MenuItem onClick={onLogoutClick}>
                                        Logout
                                    </Mui.MenuItem>
                                </Mui.Menu>    
                            </>
                    }
                </Mui.Toolbar>
            </Mui.AppBar>
            <Mui.Toolbar/>
            <main>
                { isLoading ? <Mui.CircularProgress/> : <AuthenticationRequired/> }
            </main>
        </>
    )
}

const AuthenticationRequired = Auth0.withAuthenticationRequired(() =>
    <Router.Switch>
        <Router.Route exact path="/">
            <IndexPage/>
        </Router.Route>
        <Router.Route path="/profile">
            <ProfilePage/>
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
