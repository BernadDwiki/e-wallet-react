import Joi from 'joi';

const passwordSchema = Joi.string()
  .required()
  .min(6)
  .custom((value, helpers) => {
    if (!/[a-z]/.test(value)) {
      return helpers.error('any.invalid', { message: 'Password must contain at least one lowercase letter' });
    }
    if (!/[A-Z]/.test(value)) {
      return helpers.error('any.invalid', { message: 'Password must contain at least one uppercase letter' });
    }
    if (!/\d/.test(value)) {
      return helpers.error('any.invalid', { message: 'Password must contain at least one number' });
    }
    return value;
  })
  .messages({
    'string.empty': 'Password is required',
    'string.min': 'Password must be at least 6 characters long'
  });

const loginSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Please enter a valid email address'
  }),
  password: passwordSchema
});

const registerSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Please enter a valid email address'
  }),
  password: passwordSchema,
  confirmPassword: Joi.string().required().valid(Joi.ref('password')).messages({
    'any.only': 'Passwords do not match',
    'string.empty': 'Please confirm your password'
  })
});

/**
 * Convert Joi validation error details into a keyed error object.
 *
 * @param {object|null} error - Joi validation error object.
 * @returns {object} Map of field names to error messages.
 */
const formatErrors = (error) => {
  if (!error) return {};
  return error.details.reduce((acc, detail) => {
    const key = detail.path[0];
    if (!acc[key]) {
      // Use context.message if available (from custom validators), otherwise use detail.message
      acc[key] = detail.context?.message || detail.message;
    }
    return acc;
  }, {});
};

/**
 * Validate login form values.
 *
 * @param {{ email: string, password: string }} formData
 * @returns {{ email?: string, password?: string }} Validation errors keyed by field.
 */
export const validateLoginForm = (formData) => {
  const { error } = loginSchema.validate(formData, { abortEarly: false, allowUnknown: false });
  return formatErrors(error);
};

export const validateRegisterForm = (formData) => {
  const { error } = registerSchema.validate(formData, { abortEarly: false, allowUnknown: false });
  return formatErrors(error);
};

