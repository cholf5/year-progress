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
            position: 'relative',
          }}
        >
          {/* 背景装饰 */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)',
            }}
          />
          
          {/* 主要内容 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              zIndex: 1,
            }}
          >
            {/* 标题 */}
            <h1
              style={{
                fontSize: '64px',
                fontWeight: 'bold',
                margin: '0 0 20px 0',
                background: 'linear-gradient(90deg, #fff 0%, #e0e7ff 100%)',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              {progress.year} 年度进度
            </h1>
            
            {/* 进度百分比 */}
            <div
              style={{
                fontSize: '120px',
                fontWeight: 'bold',
                margin: '20px 0',
                background: 'linear-gradient(90deg, #fbbf24 0%, #f59e0b 100%)',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              {progress.percentage}%
            </div>
            
            {/* 详细信息 */}
            <div
              style={{
                display: 'flex',
                gap: '60px',
                margin: '30px 0',
                fontSize: '24px',
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
                  {progress.daysPassed}
                </div>
                <div style={{ opacity: 0.8 }}>已过去天数</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '32px', fontWeight: 'bold' }}>
                  {progress.remainingDays}
                </div>
                <div style={{ opacity: 0.8 }}>剩余天数</div>
              </div>
            </div>
            
            {/* 底部文案 */}
            <div
              style={{
                fontSize: '28px',
                opacity: 0.9,
                margin: '20px 0',
                fontWeight: 500,
              }}
            >
              时间不等人，珍惜每一天 ✨
            </div>
          </div>
          
          {/* 进度条 */}
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              left: '80px',
              right: '80px',
              height: '12px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '6px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${progress.percentage}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #fbbf24 0%, #f59e0b 100%)',
                borderRadius: '6px',
              }}
            />
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
