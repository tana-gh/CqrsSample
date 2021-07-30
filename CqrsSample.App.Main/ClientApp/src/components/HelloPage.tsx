import * as React                          from 'react'
import { useSelector, useDispatch }        from 'react-redux'
import * as Mui                            from '@material-ui/core'
import { State }                           from '../store/states'
import Contents                            from './Contents'
import { helloString, contentCountString } from '../utils/strings'

export default (): React.FunctionComponentElement<void> => {
    const [
        name,
        helloText,
        contentText,
        contents
    ]: [
        string,
        string,
        string,
        string[]
    ] = useSelector((state: State) => [
        state.mainReducer.name,
        state.mainReducer.helloText,
        state.mainReducer.contentText,
        state.mainReducer.contents
    ])
    const dispatch = useDispatch()
    
    const onNameChange = React.useCallback((ev: React.ChangeEvent<HTMLInputElement>) => dispatch({
        type   : 'SET_NAME',
        payload: {
            name: ev.target.value
        }
    }), [ dispatch ])
    
    const onHelloClick = React.useCallback((_: React.MouseEvent) => dispatch({
        type: 'SEND_HELLO',
        payload: {
            hello: helloString(name)
        }
    }), [ dispatch, name ])

    const onContentTextChange = React.useCallback((ev: React.ChangeEvent<HTMLInputElement>) => dispatch({
        type: 'SET_CONTENT_TEXT',
        payload: {
            contentText: ev.target.value
        }
    }), [ dispatch ])

    const onAddContentClick = React.useCallback((_: React.MouseEvent) => dispatch({
        type: 'ADD_CONTENT',
        payload: {
        }
    }), [ dispatch ])

    React.useEffect(() => {
        document.title = `React Page - ${ helloText }`
    })

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
            <section>
                <div>
                    <h3>
                        <Mui.Typography>
                            { contentCountString(contents.length) }
                        </Mui.Typography>
                    </h3>
                    <Mui.TextField label="Content" value={contentText} onChange={onContentTextChange}/>
                    <Mui.Button variant="contained" color="primary" onClick={onAddContentClick}>
                        Add one content
                    </Mui.Button>
                    <div>
                        <Contents/>
                    </div>
                </div>
            </section>
        </article>
    )
}
