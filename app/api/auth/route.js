import { NextResponse } from 'next/server';

export async function POST(request) {
  const { username, password } = await request.json();

  const validUsername = process.env.DASHBOARD_USERNAME;
  const validPassword = process.env.DASHBOARD_PASSWORD;

  if (username === validUsername && password === validPassword) {
    return NextResponse.json({ message: 'Authentication successful' }, { status: 200 });
  } else {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }
}