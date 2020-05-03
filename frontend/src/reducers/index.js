import currentUser from './currentUser'
import deploymentReducer from './deploymentReducer'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    currentUser,
    deploymentReducer
})

export default rootReducer