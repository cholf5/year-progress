# View Today 按钮交互优化

## Why（为什么需要这次修改）

### 问题背景
YearProgress.org 的分享功能允许用户分享带有时间参数的链接（如 `?year=2024&day=100`），但这些链接会显示固定时间的进度而非实时进度。用户需要一种简单的方式返回"今天"的实时进度。

### 用户体验问题
最初的 View Today 按钮存在以下问题：
1. **缺乏视觉反馈**：按钮点击时没有明显的交互反馈，用户不确定是否成功点击
2. **事件响应时机**：使用 `onClick` 事件，用户按下按钮即触发，缺乏完整的交互体验
3. **主题适配问题**：在 Tailwind CSS v4 环境下，`dark:` 前缀的行为不稳定，导致主题切换时样式混乱

### 设计目标
- 提供与 Hover 状态对应的按下状态视觉反馈
- 实现鼠标/触摸松开时触发导航（类似原生应用的交互模式）
- 确保在日间和夜间主题下都有合适的视觉效果

## How（如何实现的）

### 第一版方案：JavaScript 状态管理

#### 实现思路
使用 React 状态管理按钮的按下状态，配合 `onMouseDown`/`onMouseUp` 事件：

```typescript
const [isButtonPressed, setIsButtonPressed] = useState(false);

<button
  onMouseDown={() => setIsButtonPressed(true)}
  onMouseUp={() => {
    setIsButtonPressed(false);
    navigateToToday();
  }}
  onMouseLeave={() => setIsButtonPressed(false)}
  onTouchStart={() => setIsButtonPressed(true)}
  onTouchEnd={() => {
    setIsButtonPressed(false);
    navigateToToday();
  }}
  className={`... ${isButtonPressed ? 'scale-90 !bg-gray-300 dark:!bg-gray-600' : 'hover:scale-105'}`}
>
```

#### 遇到的问题
1. **Tailwind CSS v4 兼容性问题**：`dark:` 前缀在条件应用时行为异常
2. **样式优先级冲突**：全局 CSS 规则覆盖了 Tailwind 类
3. **主题切换错误**：日间模式下按下时会显示夜间主题的颜色

### 第二版方案：CSS `:active` 伪类

#### 最终实现
采用更标准的 CSS 伪类方案，移除复杂的 JavaScript 状态管理：

**CSS 样式定义（globals.css）**：
```css
/* View Today 按钮按下状态的样式 */
.view-today-button:active {
  background-color: #d1d5db !important;
  transform: scale(0.9) translateY(2px) !important;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1) !important;
}

.dark .view-today-button:active {
  background-color: #4b5563 !important;
}
```

**React 组件实现**：
```typescript
<button
  onMouseUp={navigateToToday}
  onTouchEnd={navigateToToday}
  className="view-today-button px-4 py-1.5 bg-gray-100 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 text-sm font-medium rounded-full transition-all duration-200 border-gray-300 dark:border-gray-700 hover:shadow-md transform hover:scale-105"
>
```

### 技术要点

#### 1. 事件处理优化
- **响应时机**：使用 `onMouseUp` 和 `onTouchEnd` 而非 `onClick`，确保用户松开时才触发导航
- **完整支持**：同时处理鼠标和触摸事件，覆盖桌面和移动设备

#### 2. 视觉反馈设计
- **缩放效果**：按下时缩放至 90%，Hover 时放大至 105%
- **位移动画**：按下时向下移动 2px，模拟物理按键效果
- **背景变化**：按下时背景色变深，提供明确的视觉反馈
- **内阴影**：添加 `inset shadow` 增强按下感

#### 3. 主题适配策略
- **手动主题管理**：使用 `.dark .view-today-button:active` 选择器分别定义日间和夜间模式样式
- **避免 Tailwind v4 问题**：通过原生 CSS 绕过 Tailwind 的 `dark:` 前缀机制
- **使用 !important**：确保样式优先级，覆盖可能的冲突

#### 4. 性能考虑
- **移除 React 状态**：减少不必要的重渲染
- **CSS 硬件加速**：使用 `transform` 属性确保动画流畅
- **过渡效果**：统一的 `transition-all duration-200` 保证交互一致性

### 效果对比

#### 修改前
- 点击按钮立即触发导航，无视觉反馈
- 交互体验生硬，用户不确定操作是否成功
- 没有主题适配问题，但功能不完整

#### 修改后
- **按下状态**：按钮缩小、变深、下移，内阴影效果
- **Hover 状态**：按钮放大、阴影加深
- **主题一致性**：日间和夜间模式下都有合适的视觉效果
- **交互体验**：符合用户期望的"按下-松开-触发"交互模式

## 总结

这次优化通过采用 CSS `:active` 伪类配合手动主题定义，成功解决了 Tailwind CSS v4 环境下的主题适配问题，同时提供了完整的交互反馈。实现方式更加标准、可靠，减少了 JavaScript 复杂度，提升了用户体验和代码维护性。