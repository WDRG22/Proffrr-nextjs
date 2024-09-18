import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Extract the necessary fields from the body
    const {
      first_name,
      last_name,
      email,
      password,
      language,
      user_type,
      is_internal,
      is_active,
    } = body;

    // Prepare the payload for the backend API
    const payload = {
      first_name,
      last_name,
      email,
      password,
      language,
      is_customer: user_type === 'customer',
      is_merchant: user_type === 'merchant',
      is_admin: user_type === 'admin',
      is_internal,
      is_active,
      created_at: new Date().toISOString(),
      created_by: 'development',
    };

    // Make the request to your backend API
    const response = await fetch(`${process.env.API_URL}/v1/user/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'An unknown error occurred',
      },
      { status: 400 }
    );
  }
}
