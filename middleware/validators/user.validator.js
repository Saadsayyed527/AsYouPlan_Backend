//middleware/validators/user.validator.js

import Joi from 'joi';

export const registerUserSchema = Joi.object({
  firstName: Joi.string()
    .min(2)
    .trim()
    .required()
    .messages({
      'string.min': 'First name must be at least 2 characters long.',
      'any.required': 'First name is required.',
    }),
  lastName: Joi.string()
    .min(2)
    .trim()
    .required()
    .messages({
      'string.min': 'Last name must be at least 2 characters long.',
      'any.required': 'Last name is required.',
    }),
  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .trim()
    .messages({
      'string.pattern.base': 'Phone number must be exactly 10 digits.',
      'any.required': 'Phone number is required.',
    }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org', 'in', 'co'] } })
    .trim()
    .lowercase()
    .required()
    .messages({
      'string.email': 'Please enter a valid email address.',
      'any.required': 'Email is required.',
    }),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])'))
    .required()
    .messages({
      'string.min': 'Password must be at least 8 characters long.',
      'string.pattern.base':
        'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character (!@#$%^&*).',
      'any.required': 'Password is required.',
    }),
});

export const loginUserSchema = Joi.object({
  email: Joi.string()
    .required()
    .messages({
      'any.required': 'Email is required.',
    }),
  password: Joi.string()
    .required()
    .messages({
      'any.required': 'Password is required.',
    }),
});

export const updateUserSchema = Joi.object({
  firstName: Joi.string()
    .min(2)
    .trim()
    .messages({
      'string.min': 'First name must be at least 2 characters long.',
    }),

  lastName: Joi.string()
    .min(2)
    .trim()
    .messages({
      'string.min': 'Last name must be at least 2 characters long.',
    }),

  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .trim()
    .messages({
      'string.pattern.base': 'Phone number must be exactly 10 digits.',
    }),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org', 'in', 'co'] } })
    .trim()
    .lowercase()
    .messages({
      'string.email': 'Please enter a valid email address.',
    }),

  role: Joi.string()
  //admin update these roles by there need
    .valid('admin', 'user', 'vender') 
    .messages({
      'any.only': 'Role must be either admin, employee, or manager.',
    }),
});