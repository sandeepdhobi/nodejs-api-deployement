const express = require('express')
require('./db/mongoose')
var cors = require('cors')
const deploymentRouter = require('./components/deployment/deployment')
const imageResizeAndPostRouter = require('./components/imageResizeAndPost/index')

const app = express()
const port = process.env.PORT

app.use(cors())

app.use(express.json())
app.use(deploymentRouter)
app.use(imageResizeAndPostRouter)


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})