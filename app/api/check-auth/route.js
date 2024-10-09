import { NextResponse } from 'next/server';

export async function GET(request) {
  const isLoggedIn = request.cookies.get('isLoggedIn');

  if (isLoggedIn === 'true') {
    return NextResponse.json({ isAuthenticated: true }, { status: 200 });
  } else {
    return NextResponse.json({ isAuthenticated: false }, { status: 401 });
  }
}