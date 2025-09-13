import { Metadata } from 'next'
import moment from 'moment'
import { getSeoBaseUrl } from '../lib/utils/baseUrl'
import YearProgressClient from '../components/YearProgressClient'
import { formatPageTitle, getTranslation, Language } from '../lib/i18n'

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const baseUrl = getSeoBaseUrl()
  const params = await searchParams
  
  // 获取URL参数
  const year = params.year ? parseInt(params.year as string) : new Date().getFullYear()
  const day = params.day ? parseInt(params.day as string) : moment().dayOfYear()
  const lang = (params.lang as string) || 'en'
  
  // 确保语言类型正确
  const language = lang as Language
  
  // 构建动态OG图片URL
  const ogImageUrl = `${baseUrl}/api/og?year=${year}&day=${day}&lang=${lang}`
  
  // 获取多语言内容
  const pageTitle = formatPageTitle(language)
  const siteName = getTranslation(language, 'siteName') as string
  const description = getTranslation(language, 'description') as string
  const subtitle = getTranslation(language, 'subtitle') as string
  
  return {
    openGraph: {
      title: pageTitle,
      description: description,
      url: baseUrl,
      siteName: siteName,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${siteName} - ${subtitle}`,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: description,
      creator: '@yearofprogress',
      images: [ogImageUrl],
    },
  }
}

export default async function Page({ searchParams }: Props) {
  const params = await searchParams
  return <YearProgressClient searchParams={params} />
}
