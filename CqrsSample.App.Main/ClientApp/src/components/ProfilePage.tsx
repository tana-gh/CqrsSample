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
                {
                    editing
                        ?
                        <>
                            <div>
                                <Mui.Typography display="inline">User Name : </Mui.Typography>
                                <Mui.TextField label="User Name" defaultValue={userInfo.name}/>
                            </div>
                            <div>
                                <Mui.Typography display="inline">Pictire URL : </Mui.Typography>
                                <Mui.TextField label="Picture URL" defaultValue={userInfo.pictureUrl}/>
                            </div>
                        </>
                        :
                        <>
                            <div>
                                <Mui.Typography display="inline">User Name : </Mui.Typography>
                                <Mui.TextField label="User Name" value={userInfo.name} contentEditable="false"/>
                            </div>
                            <div>
                                <Mui.Typography display="inline">Pictire URL : </Mui.Typography>
                                <Mui.TextField label="Picture URL" value={userInfo.pictureUrl} contentEditable="false"/>
                            </div>
                        </>
                }
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
