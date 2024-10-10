import { useState, useEffect } from 'react';
import { z } from 'zod';

export const useForm = (initialState, schema) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e, onSubmit) => {
    e.preventDefault();
    try {
      schema.parse(formData);
      setErrors({});
      await onSubmit(formData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationErrors = {};
        error.errors.forEach((err) => {
          validationErrors[err.path[0]] = err.message;
        });
        setErrors(validationErrors);
      } else {
        console.error('Form submission error:', error);
      }
    }
  };

  useEffect(() => {
    const validateField = (name, value) => {
      try {
        schema.pick({ [name]: true }).parse({ [name]: value });
        setErrors((prev) => ({ ...prev, [name]: '' }));
      } catch (error) {
        if (error instanceof z.ZodError) {
          setErrors((prev) => ({ ...prev, [name]: error.errors[0].message }));
        }
      }
    };

    Object.keys(formData).forEach((field) => {
      validateField(field, formData[field]);
    });
  }, [formData, schema]);

  return { formData, setFormData, handleChange, errors, handleSubmit };
};