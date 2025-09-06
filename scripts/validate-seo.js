#!/usr/bin/env node

/**
 * SEO 验证脚本
 * 验证 robots.txt、sitemap.xml 和其他 SEO 相关配置
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:3000';
const PRODUCTION_URL = 'https://yearprogress.org';

console.log('🔍 开始 SEO 配置验证...\n');

// 检查文件是否存在
function checkFileExists(filePath) {
  return fs.existsSync(filePath);
}

// 发送 HTTP 请求检查端点
async function checkEndpoint(url) {
  try {
    const response = await fetch(url);
    return {
      status: response.status,
      contentType: response.headers.get('content-type'),
      ok: response.ok
    };
  } catch (error) {
    return { error: error.message };
  }
}

async function validateSEO() {
  console.log('📁 检查 SEO 相关文件...');
  
  const files = [
    'src/app/robots.ts',
    'src/app/sitemap.ts', 
    'src/app/manifest.ts',
    'src/lib/structuredData.ts'
  ];
  
  files.forEach(file => {
    if (checkFileExists(file)) {
      console.log(`✅ ${file} 存在`);
    } else {
      console.log(`❌ ${file} 不存在`);
    }
  });
  
  console.log('\n🌐 检查端点响应...');
  
  const endpoints = [
    '/robots.txt',
    '/sitemap.xml',
    '/manifest.webmanifest',
    '/api/og'
  ];
  
  for (const endpoint of endpoints) {
    console.log(`检查 ${BASE_URL}${endpoint}...`);
    const result = await checkEndpoint(`${BASE_URL}${endpoint}`);
    
    if (result.error) {
      console.log(`❌ ${endpoint}: ${result.error}`);
    } else if (result.ok) {
      console.log(`✅ ${endpoint}: ${result.status} (${result.contentType})`);
    } else {
      console.log(`⚠️  ${endpoint}: ${result.status}`);
    }
  }
  
  console.log('\n📊 SEO 检查完成!');
  console.log('\n💡 建议：');
  console.log('1. 确保开发服务器正在运行 (npm run dev)');
  console.log('2. 在生产环境中测试所有端点');
  console.log('3. 使用 Google Search Console 验证 sitemap');
  console.log('4. 使用结构化数据测试工具验证 Schema.org 标记');
}

// 运行验证
validateSEO().catch(console.error);
