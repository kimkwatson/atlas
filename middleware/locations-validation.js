const { body, validationResult } = require("express-validator")
const validate = {}

validate.locationsRules = () => {
    return [
      // name is required and must be string
      body("name")
        .trim()
        .notEmpty().withMessage("Please provide a location name.")
        .isString()
        .withMessage("Location name must be a string."),
  
      // type is required and must be string
      body("type")
        .trim()
        .notEmpty().withMessage("Please provide a location type.")
        .isString()
        .withMessage("Location type must be a string."),

      // country is required and must be string
      body("country")
        .trim()
        .notEmpty().withMessage("Please provide a country.")
        .isString()
        .withMessage("Country must be a string."),
  
      // valid time zone is required
      body("timezone")
        .trim()
        .notEmpty().withMessage("Please provide a time zone.")
        .isTimeZone()
        .withMessage("Timezone must be a valid IANA timezone."),

      // latitude is required and must be a float
      body("lat")
        .notEmpty().withMessage("Latitude is required.")
        .isFloat({ min: -90, max: 90 })
        .withMessage("Latitude must be between -90 and 90.")
        .toFloat(),

      // longitude is required and must be a float
      body("lon")
        .notEmpty().withMessage("Longitude is required.")
        .isFloat({ min: -180, max: 180 })
        .withMessage("Longitude must be between -180 and 180.")
        .toFloat(),
    ]
}

    validate.checkData = (req, res, next) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        next();
    };
    

module.exports = validate