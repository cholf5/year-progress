import { ImageResponse } from 'next/og';
import { translations } from '@/lib/i18n';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    // Parse URL parameters
    const { searchParams } = new URL(request.url);
    const yearParam = searchParams.get('year');
    const dayParam = searchParams.get('day');
    const langParam = searchParams.get('lang') || 'en';

    // Validate and use parameters or fallback to current date
    let year: number;
    let daysPassed: number;
    
    if (yearParam && dayParam) {
      // Use provided parameters
      year = parseInt(yearParam);
      daysPassed = parseInt(dayParam);
      
      // Basic validation - prevent obviously invalid values
      if (isNaN(year) || isNaN(daysPassed) || 
          year < 1900 || year > 3000 || 
          daysPassed < 1 || daysPassed > 366) {
        throw new Error('Invalid parameters');
      }
    } else {
      // Fallback to current date (backward compatibility)
      const now = new Date();
      year = now.getFullYear();
      const startOfYear = new Date(year, 0, 1);
      // 确保与主页面逻辑一致：当前日期是第几天（从1开始）
      daysPassed = Math.floor((now.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    }
    
    const isLeapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    const totalDays = isLeapYear ? 366 : 365;
    const percentage = Math.round((daysPassed / totalDays) * 100 * 100) / 100;
    
    // Get translations for the specified language
    const lang = langParam as keyof typeof translations;
    const t = translations[lang] || translations.en;
    
    // Create pixel grid for progress visualization
    const squaresPerRow = 53; // Weeks in a year
    const rows = 7; // 7 rows to display the grid
    
    return new ImageResponse(
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          backgroundColor: '#000000',
          fontFamily: 'system-ui',
          color: 'white',
          padding: 60,
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
              fontSize: 72, 
              fontWeight: 'bold', 
              color: 'white',
              display: 'flex',
              textAlign: 'center',
              marginBottom: 20,
            }}
          >
            {t.progressTitle.replace('{year}', year.toString()).replace('{percentage}', percentage.toString())}
          </div>
          
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              padding: 20,
              backgroundColor: '#1a1a1a',
              borderRadius: 12,
              border: '2px solid #333',
            }}
          >
            {Array.from({ length: rows }, (_, rowIndex) => (
              <div
                key={rowIndex}
                style={{
                  display: 'flex',
                  gap: 4,
                }}
              >
                {Array.from({ length: squaresPerRow }, (_, colIndex) => {
                  // Calculate which day this square represents (column-first order)
                  // Column 0: days 1-7, Column 1: days 8-14, etc.
                  const dayNumber = colIndex * rows + rowIndex + 1;
                  // Check if this day has passed (fill green) or not (fill white)
                  const isFilled = dayNumber <= daysPassed && dayNumber <= totalDays;
                  // Don't show squares beyond the total days of the year
                  const shouldShow = dayNumber <= totalDays;
                  
                  if (!shouldShow) {
                    return (
                      <div
                        key={colIndex}
                        style={{
                          width: 16,
                          height: 16,
                          display: 'flex',
                        }}
                      />
                    );
                  }
                  
                  return (
                    <div
                      key={colIndex}
                      style={{
                        width: 16,
                        height: 16,
                        backgroundColor: isFilled ? '#22c55e' : '#ffffff',
                        borderRadius: 3,
                        display: 'flex',
                      }}
                    />
                  );
                })}
              </div>
            ))}
          </div>
          
          <div 
            style={{ 
              fontSize: 28, 
              color: '#94a3b8',
              display: 'flex',
              textAlign: 'center',
              fontWeight: '400',
              marginTop: 20,
            }}
          >
            It&apos;s {t.week} {Math.ceil(daysPassed / 7)}, {t.day} {daysPassed} {t.of} {year}.
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
