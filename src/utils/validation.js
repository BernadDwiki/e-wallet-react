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

const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required().messages({
    'string.empty': 'Current password is required'
  }),
  newPassword: passwordSchema,
  confirmPassword: Joi.string().required().valid(Joi.ref('newPassword')).messages({
    'any.only': 'Passwords do not match',
    'string.empty': 'Please confirm your new password'
  })
}).custom((value) => {
  if (value.currentPassword === value.newPassword) {
    throw new Error('New password cannot be the same as current password');
  }
  return value;
}).messages({
  'any.custom': 'New password cannot be the same as current password'
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

export const validateChangePasswordForm = (formData) => {
  const { error } = changePasswordSchema.validate(formData, { abortEarly: false, allowUnknown: false });
  return formatErrors(error);
};

/**
 * Validate email address.
 *
 * @param {string} email - Email address to validate.
 * @returns {string} Error message if invalid, empty string if valid.
 */
export const validateEmail = (email) => {
  const emailSchema = Joi.string().email({ tlds: { allow: false } }).required();
  const { error } = emailSchema.validate(email);
  if (error) {
    if (!email) return 'Email is required';
    return 'Please enter a valid email address';
  }
  return '';
};

/**
 * Validate password.
 *
 * @param {string} password - Password to validate.
 * @returns {string} Error message if invalid, empty string if valid.
 */
export const validatePassword = (password) => {
  const { error } = passwordSchema.validate(password);
  if (error) {
    return error.details[0].context?.message || error.details[0].message;
  }
  return '';
};

