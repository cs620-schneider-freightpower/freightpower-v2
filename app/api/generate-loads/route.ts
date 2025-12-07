import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Load } from '@/app/types/load';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || '');

export async function POST(request: NextRequest) {
  try {
    const { destination } = await request.json();

    if (!destination) {
      return NextResponse.json(
        { error: 'Destination is required' },
        { status: 400 }
      );
    }

    if (!process.env.GOOGLE_GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Google Gemini API key not configured' },
        { status: 500 }
      );
    }

    // Parse the destination to extract city and state
    const destinationParts = destination.split(',').map((s: string) => s.trim());
    const destinationCity = destinationParts[0] || destination;
    const destinationState = destinationParts[1] || '';

    // Get the Gemini model
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash-lite' });

    // Create a detailed prompt for generating freight loads
    const prompt = `Generate 20 realistic freight truck loads from Madison, WI to ${destinationCity}, ${destinationState}.

Return ONLY a valid JSON array with NO markdown formatting, NO code blocks, and NO additional text. The response must start with [ and end with ].

Each load object must have this EXACT structure:
{
  "id": "unique_id_string",
  "price": number (realistic freight price based on distance, typically $1-3 per mile),
  "distance": number (actual road distance in miles from Madison, WI to ${destinationCity}, ${destinationState}),
  "weight": number (between 30000-45000 lbs),
  "loadedRPM": number (revenue per mile loaded, typically 1.2-2.0),
  "estTotalRPM": number (estimated total RPM including empty miles, typically 0.9-1.8),
  "pickup": {
    "city": "MADISON",
    "state": "WI",
    "date": "string (format like 'Oct 22', 'Oct 23', etc. - vary dates in late October 2025)",
    "time": "string (format like '08:00 AM', '14:30 PM', etc.)",
    "emptyMiles": number (20-100),
    "address": "string (realistic street address in Madison, WI)"
  },
  "delivery": {
    "city": "${destinationCity.toUpperCase()}",
    "state": "${destinationState.toUpperCase()}",
    "date": "string (2-5 days after pickup date, format like 'Oct 24', 'Oct 27', etc.)",
    "time": "string (format like '08:00 AM', '14:30 PM', etc.)",
    "instructions": ["string array with 1-2 delivery instructions like 'Call before arrival', 'Dock 3', etc."],
    "emptyMiles": number (30-150),
    "address": "string (realistic street address in ${destinationCity}, ${destinationState})"
  }
}

Important requirements:
- Generate exactly 20 unique loads
- Vary the pickup times, dates, weights, and addresses
- Make prices realistic based on distance (around $1.50-$2.50 per mile)
- Calculate loadedRPM as price/distance
- estTotalRPM should be slightly lower than loadedRPM
- Use realistic street names and addresses for both cities
- Pickup dates should vary from Oct 21-26, 2025
- Delivery dates should be 2-5 days after pickup
- Return ONLY the JSON array, nothing else`;

    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // Clean up the response - remove markdown code blocks if present
    text = text.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();

    // Parse the JSON
    let loads: Load[];
    try {
      loads = JSON.parse(text);
    } catch (parseError) {
      console.error('Failed to parse Gemini response:', parseError, text);
      return NextResponse.json(
        { error: 'Failed to parse AI response', details: text },
        { status: 500 }
      );
    }

    // Validate that we got an array
    if (!Array.isArray(loads)) {
      return NextResponse.json(
        { error: 'AI response is not an array' },
        { status: 500 }
      );
    }

    // Ensure we have 20 loads (or pad if necessary)
    if (loads.length < 20) {
      console.warn(`Only received ${loads.length} loads from AI`);
    }

    return NextResponse.json({ loads: loads.slice(0, 20) });
  } catch (error) {
    console.error('Error generating loads:', error);
    return NextResponse.json(
      { error: 'Failed to generate loads', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

