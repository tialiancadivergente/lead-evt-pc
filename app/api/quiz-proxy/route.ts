import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Get the data from the request
    const data = await request.json();
    
    // Forward the data to the external API
    const response = await fetch(
      'https://xkb1r81n29.execute-api.us-east-1.amazonaws.com/dev/register/lead/quiz',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    
    // Get the response from the external API
    const responseData = await response.json();
    
    // Return the response from the external API
    return NextResponse.json(responseData, { status: response.status });
  } catch (error) {
    console.error('Error in quiz-proxy:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
} 