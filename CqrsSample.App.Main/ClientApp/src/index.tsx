import * as React from 'react'
import ReactDOM   from 'react-dom'
import * as Redux from 'react-redux'
import { store }  from './store'
import App        from './components/App'
import '../assets/scss/style.scss'

ReactDOM.render(
    <Redux.Provider store={store}>
        <App/>
    </Redux.Provider>
    , document.getElementById('app'))
