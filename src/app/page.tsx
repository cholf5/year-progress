import { Metadata } from 'next'
import moment from 'moment'
import { headers, cookies } from 'next/headers'
import { getSeoBaseUrl } from '../lib/utils/baseUrl'
import YearProgressClient from '../components/YearProgressClient'
import { formatPageTitle, getTranslation, getOgLocale, resolveServerLanguage } from '../lib/i18n'

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const baseUrl = getSeoBaseUrl()
  const params = await searchParams

  // 获取URL参数
  const year = params.year ? parseInt(params.year as string) : new Date().getFullYear()
  const day = params.day ? parseInt(params.day as string) : moment().dayOfYear()

  // 与 src/app/layout.tsx 一致地解析目标语言：URL > cookie > Accept-Language > 'en'
  // 这样 SSR 输出的 <html lang>、og:locale、og:image?lang= 三者保持一致
  const [hdrs, cookieStore] = await Promise.all([headers(), cookies()])
  const language = resolveServerLanguage({
    urlLang: typeof params.lang === 'string' ? params.lang : null,
    settingsCookie: cookieStore.get('yearProgressSettings')?.value,
    acceptLanguage: hdrs.get('accept-language'),
  })

  // 构建动态OG图片URL（lang 用解析后的实际语言，避免 og:image 与 og:locale 漂移）
  const ogImageUrl = `${baseUrl}/api/og?year=${year}&day=${day}&lang=${language}`

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
      locale: getOgLocale(language),
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
