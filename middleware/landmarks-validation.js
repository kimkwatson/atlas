const { body, validationResult } = require("express-validator");
const validate = {};

validate.landmarksRules = () => {
  return [
    // name is required and must be a string
    body("name")
      .trim()
      .notEmpty().withMessage("Please provide a landmark name.")
      .isString().withMessage("Landmark name must be a string."),

    // description is required and must be a string
    body("description")
      .trim()
      .notEmpty().withMessage("Please provide a description.")
      .isString().withMessage("Description must be a string."),

    // category is required and must be a string
    body("category")
      .trim()
      .notEmpty().withMessage("Please provide a category.")
      .isString().withMessage("Category must be a string."),

    // locationId is required and must be a string
    body("locationId")
      .trim()
      .notEmpty().withMessage("Please provide a location ID.")
      .isString().withMessage("Location ID must be a string."),

    // website is optional but must be a valid URL if provided
    body("website")
      .optional()
      .trim()
      .isURL().withMessage("Website must be a valid URL."),
  ];
};

validate.checkData = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  next();
};

module.exports = validate;
