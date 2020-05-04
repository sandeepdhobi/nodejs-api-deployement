const { body, validationResult } = require('express-validator')
var validUrl = require('valid-url');

const payloadValidationRules = () => {
  return [
    body('url').custom(value => { return validUrl.isUri(value)}),
    body('templateName').notEmpty(),
    body('version').notEmpty(),
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }

  //only for url check
  if(!validUrl.isUri(req.body.url)){
    return res.status(201).json({ message: "Url is not valid." });
  }

  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(201).json({
    errors: extractedErrors,
  })
}

module.exports = { payloadValidationRules, validate }

