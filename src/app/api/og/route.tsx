import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  try {
    const now = new Date();
    const year = now.getFullYear();
    const startOfYear = new Date(year, 0, 1);
    const daysPassed = Math.floor((now.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    const isLeapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    const totalDays = isLeapYear ? 366 : 365;
    const percentage = Math.round((daysPassed / totalDays) * 100 * 100) / 100;
    
    return new ImageResponse(
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          backgroundColor: '#0a0a0a',
          fontFamily: 'system-ui',
          color: 'white',
          padding: 40,
        }}
      >
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 40,
          }}
        >
          <div 
            style={{ 
              fontSize: 48, 
              fontWeight: 'bold', 
              color: '#ffffff',
              display: 'flex'
            }}
          >
            {year} PROGRESS
          </div>
          
          <div
            style={{
              width: 600,
              height: 60,
              backgroundColor: '#1a1a1a',
              borderRadius: 30,
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: `${percentage}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #ef4444, #22c55e)',
                display: 'flex',
              }}
            />
          </div>
          
          <div 
            style={{ 
              fontSize: 36, 
              fontWeight: 'bold', 
              color: '#3b82f6',
              display: 'flex'
            }}
          >
            {percentage}%
          </div>
          
          <div 
            style={{ 
              fontSize: 24, 
              color: '#94a3b8',
              display: 'flex'
            }}
          >
            {daysPassed} days passed • {totalDays - daysPassed} days remaining
          </div>
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    console.error('OG Image error:', e);
    return new Response(`Error: ${e instanceof Error ? e.message : 'Unknown error'}`, { status: 500 });
  }
}
