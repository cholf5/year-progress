import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { calculateYearProgress } from '@/lib/yearProgress';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const progress = calculateYearProgress();
    
    return new ImageResponse(
      (
        <div
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            color: 'white',
          }}
        >
          <div
            style={{
              fontSize: '64px',
              fontWeight: 'bold',
              marginBottom: '20px',
              textAlign: 'center',
            }}
          >
            {progress.year} 年度进度
          </div>
          
          <div
            style={{
              fontSize: '120px',
              fontWeight: 'bold',
              margin: '20px 0',
              color: '#fbbf24',
              textAlign: 'center',
            }}
          >
            {progress.percentage}%
          </div>
          
          <div
            style={{
              fontSize: '28px',
              opacity: 0.9,
              marginTop: '20px',
              fontWeight: 500,
              textAlign: 'center',
            }}
          >
            时间不等人，珍惜每一天 ✨
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    console.error(e);
    return new Response('Failed to generate image', { status: 500 });
  }
}
