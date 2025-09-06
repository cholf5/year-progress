import { Metadata } from 'next'
import { getSeoBaseUrl } from '@/lib/utils/baseUrl'

interface Props {
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const baseUrl = getSeoBaseUrl()
  
  // 获取URL参数
  const year = searchParams.year ? parseInt(searchParams.year as string) : new Date().getFullYear()
  const day = searchParams.day ? parseInt(searchParams.day as string) : Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 1).getTime()) / (1000 * 60 * 60 * 24)) + 1
  const lang = (searchParams.lang as string) || 'en'
  
  // 构建动态OG图片URL
  const ogImageUrl = `${baseUrl}/api/og?year=${year}&day=${day}&lang=${lang}`
  
  return {
    openGraph: {
      title: 'Year Progress - Real-time Yearly Progress Visualization',
      description: 'Real-time yearly progress visualization. See how much of the year has passed and how much time remains. Share on social media to generate beautiful progress cards!',
      url: baseUrl,
      siteName: 'Year Progress',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: 'Year Progress - Real-time yearly progress visualization',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Year Progress - Real-time Yearly Progress Visualization',
      description: 'Real-time yearly progress visualization. See how much of the year has passed and how much time remains. Share on social media to generate beautiful progress cards!',
      creator: '@yearofprogress',
      images: [ogImageUrl],
    },
  }
}
