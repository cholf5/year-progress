# Year Progress - 年度进度

一个优雅的年度进度展示应用，实时显示当前年份的时间进度。

## ✨ 功能特性

- 🎯 **实时进度计算** - 精确显示年度进度百分比
- 📊 **美观的进度卡片** - 渐变色彩和流畅动画
- 📱 **响应式设计** - 完美适配各种设备
- 🎨 **动态社交卡片** - 自动生成分享图片
- 📤 **一键分享** - 支持原生分享和链接复制
- 🌍 **SEO 优化** - 完整的元数据和 OG 标签

## 🚀 快速开始

### 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 运行开发服务器

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看结果。

### 构建生产版本

```bash
npm run build
npm start
```

## 🎨 设计亮点

### 进度卡片
- 圆形进度环带渐变色彩
- 实时显示年份、已过天数、剩余天数
- 励志文案随进度变化
- 平滑的动画效果

### 社交分享
- 动态生成 OG 图片
- 包含年度进度的可视化信息
- 优化的 Twitter 卡片
- 支持原生分享 API

### 响应式体验
- 移动端优化布局
- 平滑的交互动画
- 自适应字体大小
- 触摸友好的按钮

## 🛠️ 技术栈

- **框架**: Next.js 15+ (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **图片生成**: Next.js OG Image Generation
- **部署**: Vercel

## 📊 项目结构

```
src/
├── app/
│   ├── api/og/          # OG 图片生成 API
│   ├── layout.tsx       # 根布局和元数据
│   ├── page.tsx         # 主页面
│   └── globals.css      # 全局样式
├── components/
│   └── ProgressCard.tsx # 进度卡片组件
└── lib/
    └── yearProgress.ts  # 进度计算工具
```

## 🎯 核心功能

### 进度计算
- 精确的天数计算（考虑闰年）
- 实时更新（每小时）
- 百分比精确到小数点后两位

### 数据展示
- 当前年份
- 已过去天数
- 剩余天数
- 进度百分比
- 动态励志文案

### 分享功能
- 原生分享 API 支持
- 链接复制备用方案
- 动态生成的社交媒体卡片
- SEO 友好的元数据

## 🌟 使用场景

- 个人时间管理
- 年度目标追踪
- 社交媒体分享
- 时间感知提醒
- 励志内容传播

## 📝 自定义

### 修改文案
在 `src/lib/yearProgress.ts` 中修改 `getProgressMessage` 函数来自定义励志文案。

### 调整样式
在 `src/components/ProgressCard.tsx` 和 `src/app/globals.css` 中调整颜色、动画和布局。

### 更新元数据
在 `src/app/layout.tsx` 中更新 SEO 和社交媒体元数据。

## 🔧 部署

### Vercel (推荐)
```bash
npm run build
```

项目会自动部署到 Vercel，支持边缘函数和 OG 图片生成。

### 其他平台
确保平台支持：
- Node.js 18+
- 边缘函数 (用于 OG 图片生成)
- 静态文件服务

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

⏰ **时间不等人，珍惜每一天！** ✨
