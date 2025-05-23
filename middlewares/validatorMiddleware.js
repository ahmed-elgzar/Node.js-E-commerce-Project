import { validationResult } from "express-validator";
/**
 *
 * @desc Find the validation error in this request and wraps them in an object with handy functions
 */
const validatorMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export default validatorMiddleware;
