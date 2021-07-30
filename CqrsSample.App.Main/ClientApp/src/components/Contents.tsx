import * as React                   from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as Mui                     from '@material-ui/core'
import { State }                    from '../store/states'

export default (): React.FunctionComponentElement<void> => {
    const [ contents ] = useSelector((state: State) => [ state.mainReducer.contents ])

    return (
        <Mui.List>
            {
                contents.map((c, i) => <Content key={`${i} ${c}`} index={i}>{ c }</Content>)
            }
        </Mui.List>
    )
}

interface ContentProps {
    key?    : string
    index   : number
    children: string
}

const Content = (props: ContentProps) => {
    const dispatch = useDispatch()
    const onClick  = React.useCallback((_: React.MouseEvent) => dispatch({
        type   : 'REMOVE_CONTENT',
        payload: {
            index: props.index
        }
    }), [ dispatch, props ])

    return (
        <Mui.ListItem>
            <Mui.ListItemText onClick={onClick}>
                { props.children }
            </Mui.ListItemText>
        </Mui.ListItem>
    )
}
