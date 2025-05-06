'use client';

import React, { useState } from 'react';
import { Button } from './Button';
import { cn } from '@/lib/utils';

interface ContactFormProps {
  className?: string;
  title?: string;
  subtitle?: string;
  services?: string[];
  includeTimePreference?: boolean;
}

/**
 * ContactForm component for lead generation
 * Used on contact page and in CTAs throughout the site
 */
const ContactForm: React.FC<ContactFormProps> = ({
  className,
  title = "Request Your Free Estimate",
  subtitle = "Fill out the form below and our team will contact you shortly.",
  services = ["Windows", "Doors", "Siding", "Other"],
  includeTimePreference = true,
}) => {
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    service: '',
    message: '',
    timePreference: '',
    loading: false,
    success: false,
    error: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Set loading state
    setFormState(prev => ({ ...prev, loading: true, success: false, error: false }));
    
    try {
      // In a real implementation, this would send data to your API
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Set success state and reset form
      setFormState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        zipCode: '',
        service: '',
        message: '',
        timePreference: '',
        loading: false,
        success: true,
        error: false,
      });
    } catch (error) {
      // Handle error
      setFormState(prev => ({ ...prev, loading: false, error: true }));
    }
  };

  return (
    <div className={cn(
      "bg-white rounded-lg shadow-md p-6 border border-gray-100",
      className
    )}>
      {/* Form Header */}
      {(title || subtitle) && (
        <div className="mb-6 text-center">
          {title && <h2 className="text-2xl font-bold text-ww-dark-gray mb-2">{title}</h2>}
          {subtitle && <p className="text-gray-600">{subtitle}</p>}
        </div>
      )}
      
      {/* Success Message */}
      {formState.success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-6">
          <p className="font-medium">Thank you for your request!</p>
          <p>We've received your information and will contact you shortly.</p>
        </div>
      )}
      
      {/* Error Message */}
      {formState.error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
          <p className="font-medium">Something went wrong!</p>
          <p>Please try again or contact us directly by phone.</p>
        </div>
      )}
      
      {/* Contact Form */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* First Name */}
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formState.firstName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ww-blue"
            />
          </div>
          
          {/* Last Name */}
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formState.lastName}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ww-blue"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ww-blue"
            />
          </div>
          
          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formState.phone}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ww-blue"
            />
          </div>
        </div>
        
        {/* Address */}
        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            Address *
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formState.address}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ww-blue"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* City */}
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
              City *
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formState.city}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ww-blue"
            />
          </div>
          
          {/* Zip Code */}
          <div>
            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
              Zip Code *
            </label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formState.zipCode}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ww-blue"
            />
          </div>
        </div>
        
        {/* Service */}
        <div className="mb-4">
          <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
            What service are you interested in? *
          </label>
          <select
            id="service"
            name="service"
            value={formState.service}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ww-blue"
          >
            <option value="">Select a service</option>
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>
        
        {/* Time Preference */}
        {includeTimePreference && (
          <div className="mb-4">
            <label htmlFor="timePreference" className="block text-sm font-medium text-gray-700 mb-1">
              Best time to contact you
            </label>
            <select
              id="timePreference"
              name="timePreference"
              value={formState.timePreference}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ww-blue"
            >
              <option value="">Select a time</option>
              <option value="Morning">Morning (8am - 12pm)</option>
              <option value="Afternoon">Afternoon (12pm - 5pm)</option>
              <option value="Evening">Evening (5pm - 8pm)</option>
              <option value="Anytime">Anytime</option>
            </select>
          </div>
        )}
        
        {/* Message */}
        <div className="mb-6">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Additional Information
          </label>
          <textarea
            id="message"
            name="message"
            value={formState.message}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ww-blue"
          />
        </div>
        
        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          fullWidth
          loading={formState.loading}
        >
          Submit Request
        </Button>
      </form>
    </div>
  );
};

export { ContactForm };
