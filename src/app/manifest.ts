import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'YearProgress.org - Real-time Yearly Progress Visualization',
    short_name: 'YearProgress.org',
    description: 'Real-time yearly progress visualization. See how much of the year has passed and share beautiful progress cards!',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    orientation: 'portrait',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    categories: ['utilities', 'productivity', 'lifestyle'],
    lang: 'en',
    scope: '/',
    screenshots: [
      {
        src: '/og-default.png',
        sizes: '1200x630',
        type: 'image/png',
        form_factor: 'wide',
        label: 'YearProgress.org visualization with progress grid'
      }
    ]
  }
}
