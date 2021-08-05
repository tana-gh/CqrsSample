import * as React  from 'react'
import * as Redux  from 'react-redux'
import * as Mui    from '@material-ui/core'
import * as States from '../store/states'

export default (): React.FunctionComponentElement<void> => {
    const [ userInfo ] = Redux.useSelector((state: States.State) => [ state.mainReducer.userInfo ])

    React.useEffect(() => {
        document.title = 'React Page - Account Settings'
    })

    const [ editing, setEditing ] = React.useState<boolean>(false)

    const onEditClick = React.useCallback(() => setEditing(true), [ setEditing ])
    const onSaveClick = React.useCallback(() => {
        setEditing(false)
    }, [ setEditing ])

    return (
        <article>
            <div>
                <div>
                    {
                        userInfo.username &&
                            <Mui.TextField key="username" label="User Name" defaultValue={userInfo.username} InputProps={{ readOnly: !editing }}/>
                    }
                </div>
                <div>
                    {
                        userInfo.pictureUrl &&
                            <Mui.TextField key="pictureUrl" label="Picture URL" defaultValue={userInfo.pictureUrl} InputProps={{ readOnly: !editing }}/>
                    }
                </div>
                <div>
                    { userInfo.providers.map(p => <Mui.Typography key={p} display="inline">{ p } </Mui.Typography>) }
                </div>
                <div>
                    <Mui.Button variant="contained" color="primary" onClick={onEditClick} disabled={editing}>
                        Edit
                    </Mui.Button>
                    <Mui.Button variant="contained" color="primary" onClick={onSaveClick} disabled={!editing}>
                        Save
                    </Mui.Button>
                </div>
            </div>
        </article>
    )
}
