import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/book
 * 
 * Stub API endpoint for booking loads.
 * In a real implementation, this would:
 * 1. Validate the load ID
 * 2. Check availability
 * 3. Create a booking record
 * 4. Return booking confirmation
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { loadId } = body;

        if (!loadId) {
            return NextResponse.json(
                { success: false, error: 'Load ID is required' },
                { status: 400 }
            );
        }

        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Generate a booking ID
        const bookingId = `BK-${loadId}-${Date.now().toString(36).toUpperCase()}`;

        return NextResponse.json({
            success: true,
            bookingId,
            loadId,
            bookedAt: new Date().toISOString(),
            message: 'Load booked successfully'
        });

    } catch {
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
