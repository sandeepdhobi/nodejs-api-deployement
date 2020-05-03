import React, { useState } from 'react'

const AddDeploymentForm = props => {
	const initialFormState = { id: null, url: '', templateName: '',version: '' }
	const [ template, setTemplate ] = useState(initialFormState)
	const [ versions, setVersion ] = useState([])
	const templateToUse = [
		{
		  "name": "Natural One",
		  "versions": [
			"1.0.0",
			"1.0.1",
			"1.1.0",
			"2.0.0"
		  ]
		},
		{
		  "name": "Techno 01",
		  "versions": [
			"1.0.0",
			"1.1.1",
			"2.0.1"
		  ]
		},
		{
		  "name": "Sporty",
		  "versions": [
			"1.0.0",
			"1.1.0",
			"1.2.0",
			"1.2.1",
			"1.3.0",
			"2.0.0"
		  ]
		}
	  ]
	const handleInputChange = event => {
		const { name, value } = event.target
		setTemplate({ ...template, [name]: value })
	}
	const handleSelectionChange = event => {
		const { name, value } = event.target
		const matchOption = templateToUse.filter(temp => {return temp.name == value})
		setTemplate({ ...template, [name]: value })
		setVersion(matchOption.length >0 ? matchOption[0].versions : [])
	}
	const handleSelectionChangeVersion = event => {
		const { name, value } = event.target
		setTemplate({ ...template, [name]: value })
	}

	return (
		<form
			onSubmit={event => {
				event.preventDefault()
				if (!template.url || !template.templateName || !template.version) return

				props.addDeployment(template)
				setTemplate(initialFormState)
			}}
		>
			<label>Url</label>
			<input type="text" name="url" value={template.url} onChange={handleInputChange} />
			<label>Template Name</label>
			<select name="templateName" onChange={handleSelectionChange} value={template.templateName}>
			<option value="">None</option>
			{
			templateToUse.map((temp) => (
				<option value={temp.name} versions={temp.versions}>{temp.name}</option>
			))
			}
			</select>
			<label>Version</label>
			<select name="version" onChange={handleSelectionChangeVersion} value={template.version}>
				<option value="">None</option>
				{
					versions.map(version => (
					<option value={version}>{version}</option>
				))
				}
			</select>
			<button>Add new Deployment</button>
		</form>
	)
}

export default AddDeploymentForm
