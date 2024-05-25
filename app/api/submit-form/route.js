import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const formData = await request.json();
    console.log('Form data:', formData);

    // Process the form data as needed
    // For example, you can send the form data to a third-party service like Formspark
    const response = await fetch('https://submit-form.com/j3aa0XiL4', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      return NextResponse.json({ message: 'Form submitted successfully' });
    } else {
      return NextResponse.json({ error: 'Error submitting form' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    return NextResponse.json({ error: 'Error submitting form' }, { status: 500 });
  }
}
