import { body, validationResult } from "express-validator";

export const validate = (validations) => {
  return async (req, res, next) => {
    for (let validation of validations) {
      const result = await validation.run(req);
    }
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    return res.status(422).json({ errors: errors.array() });
  };
};

export const loginValidator = [
  body("username").notEmpty().withMessage("Name is required"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

export const signupValidator = [
  body("email").trim().isEmail().withMessage("Email is required"),
  ...loginValidator,
];
