const express = require('express')
const Deployment = require('./deploymentSchema');
const { payloadValidationRules, validate } = require('./deploymentController');
const router = new express.Router()

router.post('/addDeployment', payloadValidationRules(), validate, async (req, res) => {
    try {
        const singleDoc = await Deployment.find({url:req.body.url.trim()})
        if(singleDoc.length > 0){
            res.status(400).send({ message: "Url already exists." })
            return
        }
        const deployment = new Deployment(req.body);
        await deployment.save()
        res.status(200).send({ message: "Added deployments", data: deployment })
    } catch (e) {
        console.log(e);
        res.status(500).send(e)
    }
})


router.get("/getDeployment", async (req, res) => {
    try {
        const deployments = await Deployment.find({})
        if (deployments) {
            res.status(200).json({ message: "This is all deployments", data: deployments })
        }
        else {
            res.status(200).json({ message: "No deployments added yet", data: deployments })
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
})

router.delete('/deleteDeployments/:id', async (req, res) => {
    try {
        const deployment = await Deployment.findById(req.params.id).remove()
        const deployments = await Deployment.find({})
        res.status(200).send({ message: "deleted deployment", data: deployments })
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router