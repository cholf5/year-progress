import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  // 元数据优化
  experimental: {
    optimizePackageImports: ['react-share'],
  },
  
  // 静态导出相关配置（如果需要的话）
  trailingSlash: false,
  
  // 图片优化
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  
  // 压缩配置
  compress: true,
};

export default nextConfig;
