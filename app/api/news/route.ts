import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const apiKey = process.env.CURRENTS_API;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Currents API key not configured' },
        { status: 500 }
      );
    }

    // Fetch news from Currents API with freight/logistics keywords
    const response = await fetch(
      `https://api.currentsapi.services/v1/latest-news?apiKey=${apiKey}&language=en&page_size=20`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Currents API error:', errorText);
      return NextResponse.json(
        { error: 'Failed to fetch news from Currents API', details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Transform the response to match our news format
    const news = (data.news || []).map((article: any, index: number) => ({
      id: article.id || `currents-${index}`,
      title: article.title || 'No title',
      description: article.description || article.title || 'No description available',
      date: article.published ? new Date(article.published).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }) : 'Recent',
      category: 'Industry News',
      url: article.url,
      image: article.image,
      author: article.author,
    }));

    return NextResponse.json({ news });
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}


