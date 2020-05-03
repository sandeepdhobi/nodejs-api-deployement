
const fetchDeploymentList = (data) => {
    return {
        type: "FETCH_DEPLOYMENT_LIST",
        data: data
    }
}

const addDeployment = (data) => {
    return {
        type: "ADD_DEPLOYMENT",
        data: data
    }
}

const deleteDeployment = (data) => {
    return {
        type: "DELETE_DEPLOYMENT",
        data: data
    }
}

export default {
    fetchDeploymentList,
    addDeployment,
    deleteDeployment,
}