import * as React from 'react'
import * as Mui   from '@material-ui/core'

export default (): React.FunctionComponentElement<void> => {
    React.useEffect(() => {
        document.title = 'React Page - Not Found'
    })

    return (
        <article>
            <div>
                <h1>
                    <Mui.Typography>
                        Not Found
                    </Mui.Typography>
                </h1>
            </div>
        </article>
    )
}
