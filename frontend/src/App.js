import React, { useState, Fragment, useEffect } from 'react'
import API from './api';
import {useSelector, useDispatch} from 'react-redux'
import AddDeploymentForm from './components/forms/AddDeploymentForm'
import DeploymentTable from './components/tables/DeploymentTable'
import allActions from './actions'
import CountDown from './components/tables/countDown';

const App = () => {
	const [ isCountZero, setisCountZero ] = useState(false)
	const [ startCountDown, setstartCountDown ] = useState(false)


	const disploymentList = useSelector(state => state.deploymentReducer.disploymentList)
	const dispatch = useDispatch()


	useEffect( async () => {
		async function fetchDeployments() {
			try {
				const response = await API.get(`getDeployment`);
				dispatch(allActions.deploymentActions.fetchDeploymentList(response.data.data))
			} catch (error) {
				console.log(error)
			}

			}
			fetchDeployments();
	  }, []);

	const deleteDeployment = async id => {
		try {
			const response = await API.delete(`deleteDeployments/${id}`);
			dispatch(allActions.deploymentActions.deleteDeployment(response.data.data))
		} catch (error) {
			console.log(error)
		}
	}

	const addDeployment = async data => {
		try {
			const payload = {
				url: data.url,
				templateName: data.templateName,
				version: data.version
			  }
			const response = await API.post(`addDeployment`,payload);
			dispatch(allActions.deploymentActions.addDeployment(response.data.data))
			setstartCountDown(true)
		} catch (error) {
			console.log(error)
		}
	}

	const countReachesZero = () =>{
		setisCountZero(true);
		setstartCountDown(false);
	}

	return (
		<div className="container">
			<div className="flex-row">
				<div className="flex-large">
					<Fragment>
						<h2>Add deployment</h2>
						<AddDeploymentForm addDeployment={addDeployment} />
					</Fragment>
				</div>
				<div className="flex-large">
					<h2>View deployments</h2>
					<DeploymentTable disploymentList={disploymentList} deleteDeployment={deleteDeployment} />
					{
						startCountDown &&
						<CountDown countReachesZero={countReachesZero} />
					}
				</div>
			</div>
		</div>
	)
}

export default App
