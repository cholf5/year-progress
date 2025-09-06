/**
 * 域名工具函数
 * 用于在不同环境下获取正确的基础 URL
 */

// 生产环境域名常量
const PRODUCTION_URL = 'https://yearprogress.org'

/**
 * 获取基础 URL
 * @param headers 请求头对象（可选）
 * @returns 基础 URL 字符串
 */
export function getBaseUrl(headers?: Headers): string {
  
  // 如果有环境变量设置，优先使用
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL
  }
  
  // 如果没有 headers，返回生产域名
  if (!headers) {
    return PRODUCTION_URL
  }
  
  try {
    const host = headers.get('host')
    const protocol = headers.get('x-forwarded-proto') || 'https'
    
    if (!host) {
      return PRODUCTION_URL
    }
    
    // 开发环境
    if (host.includes('localhost') || host.includes('127.0.0.1')) {
      return `${protocol}://${host}`
    }
    
    // 生产域名
    if (host === 'yearprogress.org') {
      return PRODUCTION_URL
    }
    
    // Vercel 预览域名 - 使用生产域名确保 SEO 一致性
    if (host.includes('vercel.app')) {
      return PRODUCTION_URL
    }
    
    // 其他自定义域名
    return `${protocol}://${host}`
    
  } catch (error) {
    console.log('Error getting base URL from headers, using production URL')
    return PRODUCTION_URL
  }
}

/**
 * 异步获取基础 URL（用于服务器组件）
 * @returns Promise<string> 基础 URL
 */
export async function getBaseUrlAsync(): Promise<string> {
  // 如果有环境变量设置，优先使用
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL
  }
  
  try {
    // 尝试获取请求头信息
    const { headers } = await import('next/headers')
    const headersList = await headers()
    
    return getBaseUrl(headersList)
  } catch (error) {
    // 如果无法获取 headers（比如在构建时），使用生产域名
    return PRODUCTION_URL
  }
}

/**
 * 客户端获取基础 URL
 * @returns 基础 URL 字符串
 */
export function getClientBaseUrl(): string {
  if (typeof window === 'undefined') {
    // 服务器端，返回生产域名
    return process.env.NEXT_PUBLIC_SITE_URL || PRODUCTION_URL
  }
  
  // 客户端，使用当前 origin
  return window.location.origin
}
