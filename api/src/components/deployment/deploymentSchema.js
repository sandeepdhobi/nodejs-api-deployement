const mongoose = require('mongoose')

const deploymentSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    templateName: {
        type: String,
        required: true
    },
    version: {
        type: String,
        required: true,
    },
}, {
    timestamps: {createdAt : 'deployedAt'}
})

deploymentSchema.methods.toJSON = function () {
    const deployment = this
    const deploymentObject = deployment.toObject()
    delete deploymentObject.__v
    delete deploymentObject.updatedAt
    return deploymentObject
}

const Deployment = mongoose.model('Deployment', deploymentSchema)

module.exports = Deployment