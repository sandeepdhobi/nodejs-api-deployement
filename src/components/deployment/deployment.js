const express = require('express')
const Deployment = require('./deploymentSchema');
const {Translate} = require('@google-cloud/translate').v2;
const {TranslationServiceClient} = require('@google-cloud/translate');
const { payloadValidationRules, validate } = require('./deploymentController');
const router = new express.Router()

router.post('/addDeployment', payloadValidationRules(), validate, async (req, res) => {
    try {
        const singleDoc = await Deployment.find({url:req.body.url.trim()})
        if(singleDoc.length > 0){
            res.status(201).send({ message: "Url already exists." })
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

router.post('/getTranslate', async (req, res) => {
    try {
        const CREDENTIALS = {}  //JSON of google credential 
          
        const projectId = 'durable-zoo-308011';


        //V3
        const translationClient = new TranslationServiceClient({projectId, keyFilename: CREDENTIALS, credentials: CREDENTIALS});
        async function translateText() {
        const request = {
            model: `projects/${projectId}/locations/global/models/general/nmt`,
            parent: `projects/${projectId}/locations/global`,
            contents: ['DIY Surprise Love Explosion Box for Anniversary Scrapbook Photo Album birthday Gift'],
            mimeType: 'text/html', // mime types: text/plain, text/html
            sourceLanguageCode: 'en',
            targetLanguageCode: 'ar',
        };

        // Run request
        const [response] = await translationClient.tranlate (request);
        for (const translation of response.translations) {
            console.log(`Translation V3: ${translation.translatedText}`);
        }
        res.status(500).send(response)
        }

        translateText();




        //V2
        // const translate = new Translate({
        // credentials: CREDENTIALS,
        // projectId: projectId
        // });
        // async function quickStart() {
        // // The text to translate
        // const text = 'DIY Surprise Love Explosion Box for Anniversary Scrapbook Photo Album birthday Gift';
        // // The target language
        // const target = 'ar';
        // // Translates some text into Russian
        // const [translation] = await translate.translate(text, target);
        // console.log(`Text: ${text}`);
        // console.log(`Translation: ${translation}`);
        // }
        // quickStart();


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
        res.status(200).send({ message: "deleted deployment from list", data: deployments })
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router