'use client';

import React, { useState } from 'react';
import { Button } from './Button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface FreeEstimateFormProps {
  title?: string;
  subtitle?: string;
  className?: string;
  compact?: boolean;
  onSubmit?: (formData: any) => void;
}

/**
 * FreeEstimateForm component for lead generation
 * Exactly matches the Window World LA website's free estimate form
 */
const FreeEstimateForm: React.FC<FreeEstimateFormProps> = ({
  title = "Schedule Your Free Estimate",
  subtitle = "Fill out the form below and our team will contact you shortly.",
  className,
  compact = false,
  onSubmit,
}) => {
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: 'CA',
    zipCode: '',
    projectType: '',
    timeframe: '',
    comments: '',
    contactPreference: 'phone',
    loading: false,
    success: false,
    error: false,
  });

  const projectTypes = [
    "Windows",
    "Entry Doors",
    "Patio Doors",
    "Vinyl Siding",
    "Roofing",
    "Other"
  ];

  const timeframes = [
    "Immediately",
    "1-3 Months",
    "3-6 Months",
    "6+ Months",
    "Just Researching"
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      
      // If onSubmit prop is provided, call it with form data
      if (onSubmit) {
        const { loading, success, error, ...formDataToSubmit } = formState;
        onSubmit(formDataToSubmit);
      }
      
      // Set success state and reset form
      setFormState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: 'CA',
        zipCode: '',
        projectType: '',
        timeframe: '',
        comments: '',
        contactPreference: 'phone',
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
      "bg-white rounded-lg shadow-md overflow-hidden",
      compact ? "border border-gray-200" : "",
      className
    )}>
      {/* Form Header */}
      <div className={cn(
        "bg-ww-blue text-white p-6",
        compact ? "py-4" : ""
      )}>
        {title && <h2 className={cn(
          "font-bold text-center",
          compact ? "text-xl" : "text-2xl mb-2"
        )}>{title}</h2>}
        {subtitle && !compact && <p className="text-white/80 text-center">{subtitle}</p>}
      </div>
      
      {/* Success Message */}
      {formState.success && (
        <div className="p-6 bg-green-50 border-l-4 border-green-500">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">Request Submitted Successfully</h3>
              <div className="mt-2 text-sm text-green-700">
                <p>Thank you for your interest in Window World! A representative will contact you shortly to schedule your free estimate.</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Error Message */}
      {formState.error && (
        <div className="p-6 bg-red-50 border-l-4 border-red-500">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">There was an error submitting your request</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>Please try again or call us directly at (800) 786-9342 to schedule your free estimate.</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Form */}
      {!formState.success && (
        <form onSubmit={handleSubmit} className="p-6">
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
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {/* City */}
            <div className="col-span-2 md:col-span-2">
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
            
            {/* State */}
            <div className="col-span-1">
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                State *
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={formState.state}
                onChange={handleChange}
                required
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>
            
            {/* Zip Code */}
            <div className="col-span-1">
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Project Type */}
            <div>
              <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-1">
                Project Type *
              </label>
              <select
                id="projectType"
                name="projectType"
                value={formState.projectType}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ww-blue"
              >
                <option value="">Select Project Type</option>
                {projectTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Timeframe */}
            <div>
              <label htmlFor="timeframe" className="block text-sm font-medium text-gray-700 mb-1">
                Timeframe
              </label>
              <select
                id="timeframe"
                name="timeframe"
                value={formState.timeframe}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ww-blue"
              >
                <option value="">Select Timeframe</option>
                {timeframes.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Comments */}
          <div className="mb-4">
            <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-1">
              Comments
            </label>
            <textarea
              id="comments"
              name="comments"
              value={formState.comments}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ww-blue"
            />
          </div>
          
          {/* Contact Preference */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Contact Method *
            </label>
            <div className="flex space-x-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="contactPhone"
                  name="contactPreference"
                  value="phone"
                  checked={formState.contactPreference === 'phone'}
                  onChange={handleRadioChange}
                  className="h-4 w-4 text-ww-blue focus:ring-ww-blue border-gray-300"
                />
                <label htmlFor="contactPhone" className="ml-2 text-sm text-gray-700">
                  Phone
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="contactEmail"
                  name="contactPreference"
                  value="email"
                  checked={formState.contactPreference === 'email'}
                  onChange={handleRadioChange}
                  className="h-4 w-4 text-ww-blue focus:ring-ww-blue border-gray-300"
                />
                <label htmlFor="contactEmail" className="ml-2 text-sm text-gray-700">
                  Email
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="contactEither"
                  name="contactPreference"
                  value="either"
                  checked={formState.contactPreference === 'either'}
                  onChange={handleRadioChange}
                  className="h-4 w-4 text-ww-blue focus:ring-ww-blue border-gray-300"
                />
                <label htmlFor="contactEither" className="ml-2 text-sm text-gray-700">
                  Either
                </label>
              </div>
            </div>
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
          
          <p className="text-xs text-gray-500 mt-4 text-center">
            By submitting this form, you agree to our <Link href="/privacy-policy" className="text-ww-blue hover:underline">privacy policy</Link>.
          </p>
        </form>
      )}
    </div>
  );
};

export { FreeEstimateForm };
