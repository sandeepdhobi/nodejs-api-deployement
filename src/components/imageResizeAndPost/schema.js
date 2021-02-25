const mongoose = require('mongoose')

const reviewDataSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
        trim: true,
    },
    rating: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true,
    },
}, {
    timestamps: {createdAt : 'date'}
})

reviewDataSchema.methods.toJSON = function () {
    const modal = this
    const modalObject = modal.toObject()
    delete modalObject.__v
    delete modalObject.updatedAt
    return modalObject
}


const reviewData = mongoose.model('reviewData', reviewDataSchema)

module.exports = reviewData