import * as React   from 'react'
import * as Redux   from 'react-redux'
import * as Mui     from '@material-ui/core'
import * as Auth0   from '@auth0/auth0-react'
import * as States  from '../store/states'
import * as Actions from '../store/actions'

export default (): React.FunctionComponentElement<void> => {
    const [ name, helloText ]: [ string, string] =
        Redux.useSelector((state: States.State) => [
            state.mainReducer.name,
            state.mainReducer.helloText
        ])
    const dispatch = Redux.useDispatch<React.Dispatch<Actions.Action>>()
    const { getAccessTokenSilently } = Auth0.useAuth0()

    const getAccessToken = React.useCallback(() =>
        getAccessTokenSilently({
            audience: 'https://studio-ephyra.jp.auth0.com/api/v2/',
            scope: 'read:current_user'
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
    
    const onNameChange = React.useCallback(
        (ev: React.ChangeEvent<HTMLInputElement>) => dispatch({
            type   : 'SET_NAME',
            payload: {
                name: ev.target.value
            }
        }), [ dispatch ])
    
    const onHelloClick = React.useCallback(
        (_: React.MouseEvent) => dispatch({
            type: 'SEND_NAME',
            payload: {
                name
            }
        }), [ dispatch, name ])

    React.useEffect(() => {
        document.title = `React Page - ${ helloText }`
    }, [ helloText ])

    return (
        <article>
            <section>
                <div>
                    <h2>
                        <Mui.Typography>
                            { helloText }
                        </Mui.Typography>
                    </h2>
                    <Mui.TextField label="Name" onChange={onNameChange}/>
                    <Mui.Button variant="contained" color="primary" onClick={onHelloClick}>
                        Hello
                    </Mui.Button>
                </div>
            </section>
        </article>
    )
}
