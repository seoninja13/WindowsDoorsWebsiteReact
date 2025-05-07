"use client";

import React, { useState } from 'react';

interface EstimateFormProps {
  title: string;
  subtitle: string;
  formId: string;
  formPage?: string;
  bottomImage?: string;
  bottomImageAlt?: string;
}

export const EstimateForm: React.FC<EstimateFormProps> = ({
  title,
  subtitle,
  formId,
  formPage = 'home',
  bottomImage,
  bottomImageAlt = 'Window World Family with dogs'
}) => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    zip: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would submit the form data to an API
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      full_name: '',
      email: '',
      phone: '',
      zip: ''
    });
  };

  return (
    <form className="form-general" action="" method="post" data-anchor-link={formId} onSubmit={handleSubmit}>
      <div className="form-body bottom-image">
        <div className="form-title">
          <div className="title underline">{title}</div>
          <div className="subtitle">{subtitle}</div>
        </div>
        <div className="form-fields">
          <div className="expandable-fields">
            <div className="form-row">
              <label htmlFor={`full_name_${formId}`}>Name*</label>
              <input
                id={`full_name_${formId}`}
                className="input-txt required"
                type="text"
                name="full_name"
                required
                value={formData.full_name}
                onChange={handleChange}
              />
            </div>
            <div className="form-row">
              <label htmlFor={`email_${formId}`}>Email*</label>
              <input
                id={`email_${formId}`}
                className="input-txt required"
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-row split">
              <div className="form-row">
                <label htmlFor={`phone_${formId}`}>Phone Number*</label>
                <input
                  id={`phone_${formId}`}
                  className="input-txt required"
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="form-row">
                <label htmlFor={`zip_${formId}`}>Zip Code*</label>
                <input
                  id={`zip_${formId}`}
                  className="input-txt required"
                  type="number"
                  name="zip"
                  required
                  value={formData.zip}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <input type="hidden" name="breathing" />
          <input type="hidden" name="form_source" value="general" />
          <input type="hidden" name="form_page" value={formPage} />
          <input type="hidden" name="form_id" value={formId} />
          <input type="hidden" name="g-recaptcha-response" />
          <div className="submit-row">
            <button className="btn-green" type="submit">Request Free Estimate</button>
            {bottomImage && (
              <img
                className="form-image"
                src={bottomImage}
                alt={bottomImageAlt}
              />
            )}
          </div>
        </div>
      </div>
    </form>
  );
};
