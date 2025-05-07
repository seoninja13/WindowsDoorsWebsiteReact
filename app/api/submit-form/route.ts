import { NextRequest, NextResponse } from 'next/server';
import { insertRecord } from '@/lib/database';
import { FormSubmission } from '@/types/database';

/**
 * API route for submitting forms
 * @param request The request object
 * @returns The response object
 */
export async function POST(request: NextRequest) {
  try {
    // Get the form data from the request
    const formData = await request.json();
    
    // Validate the form data
    if (!formData.form_type) {
      return NextResponse.json(
        { error: { message: 'Form type is required' } },
        { status: 400 }
      );
    }
    
    if (!formData.first_name || !formData.last_name) {
      return NextResponse.json(
        { error: { message: 'First name and last name are required' } },
        { status: 400 }
      );
    }
    
    if (!formData.email) {
      return NextResponse.json(
        { error: { message: 'Email is required' } },
        { status: 400 }
      );
    }
    
    if (!formData.phone) {
      return NextResponse.json(
        { error: { message: 'Phone number is required' } },
        { status: 400 }
      );
    }
    
    // Add IP address and user agent if not provided
    if (!formData.ip_address) {
      formData.ip_address = request.headers.get('x-forwarded-for') || request.ip || '';
    }
    
    if (!formData.user_agent) {
      formData.user_agent = request.headers.get('user-agent') || '';
    }
    
    // Insert the form submission into the database
    const data = await insertRecord<FormSubmission>('form_submissions', formData);
    
    if (!data) {
      throw new Error('Failed to insert form submission');
    }
    
    // Return success response
    return NextResponse.json(
      { data, success: true },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error submitting form:', error);
    
    // Return error response
    return NextResponse.json(
      { error: { message: 'Failed to submit form' } },
      { status: 500 }
    );
  }
}
