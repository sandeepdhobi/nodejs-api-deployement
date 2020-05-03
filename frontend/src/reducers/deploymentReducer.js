
const initialState = {
    disploymentList: []
  };

const deploymentState = (state = initialState, action) => {
    switch(action.type){
        case "FETCH_DEPLOYMENT_LIST":
            console.log(action.data,"me datat")
            return {...state, disploymentList: action.data }
        case "DELETE_DEPLOYMENT":
            return {...state, disploymentList: action.data }
        case "ADD_DEPLOYMENT":
            return {...state, disploymentList: [...state.disploymentList, action.data ]}
        default:
            return state
    }
}

export default deploymentState