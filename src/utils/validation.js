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

export const validateLoginForm = (formData) => {
  const { error } = loginSchema.validate(formData, { abortEarly: false, allowUnknown: false });
  return formatErrors(error);
};

export const validateRegisterForm = (formData) => {
  const { error } = registerSchema.validate(formData, { abortEarly: false, allowUnknown: false });
  return formatErrors(error);
};

export const validatePin = (pin) => {
  if (!pin || pin.length !== 6) return 'PIN must be 6 digits';
  if (!/^\d{6}$/.test(pin)) return 'PIN must contain only numbers';
  return '';
};

// LocalStorage utilities for fake authentication
export const authStorage = {
  // Register user
  register: (userData) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = users.find(user => user.email === userData.email);

    if (existingUser) {
      throw new Error('User already exists with this email');
    }

    const newUser = {
      id: Date.now().toString(),
      ...userData,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    return newUser;
  },

  // Login user
  login: (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(user => user.email === email && user.password === password);

    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Set current user session
    localStorage.setItem('currentUser', JSON.stringify({
      id: user.id,
      email: user.email,
      name: user.name || user.email.split('@')[0]
    }));

    return user;
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('currentUser');
  },

  // Check if user is logged in
  isLoggedIn: () => {
    return !!localStorage.getItem('currentUser');
  }
};