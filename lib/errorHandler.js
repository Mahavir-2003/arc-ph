import { NextResponse } from 'next/server';

export const handleApiError = (error) => {
  console.error('API Error:', error);
  return NextResponse.json(
    { error: 'An unexpected error occurred' },
    { status: 500 }
  );
};