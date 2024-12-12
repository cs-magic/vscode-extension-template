# VS Code Extension Template

<!-- toc -->

[核心优势](#核心优势) • [特性](#特性) • [项目结构](#项目结构) • [快速开始](#快速开始) • [开发指南](#开发指南) • [常见问题](#常见问题) • [许可证](#许可证)

<!-- tocstop -->


一个现代化的 VS Code 插件开发模板，基于 [YAAC](https://github.com/cs-magic/YAAC) 项目的技术栈，集成了：

- 🏃 Turborepo - 高性能的构建系统
- 📝 TypeScript - 类型安全的开发体验
- 🖼️ WebView - VS Code 自定义界面
- ⚛️ React - 组件化开发
- 🎨 Tailwind CSS - 现代化 UI 设计
- 🛠️ VS Code API - 深度扩展集成
- 📦 Webpack - 优化的打包工具

## 核心优势

- 🔍 优化的调试体验

  - 预配置的 F5 调试设置
  - 智能的断点和变量监控
  - 集成的开发者工具支持

- 📦 完善的依赖管理

  - 基于 pnpm 的高效依赖管理
  - 智能的构建缓存策略
  - 自动化的依赖更新

- 🎨 增强的 WebView 体验
  - 响应式设计支持
  - 主题自适应
  - 优化的状态管理

## 特性

- ⚡️ 快速开发启动
- 📦 Monorepo 工作区管理
- 🔄 开发环境热重载
- 🎯 TypeScript 严格模式
- 🎨 现代化 UI 框架
- 🛠️ 完整的工具链集成

## 项目结构

```
.
├── apps/
│   └── vscode-extension/     # VS Code 插件主程序
│       ├── src/             # 插件源码
│       └── webpack.config.js # Webpack 构建配置
│
├── packages/
│   ├── core/               # 核心业务逻辑
│   │   └── src/           # 共享的核心功能
│   │
│   ├── ui/                # UI 组件库
│   │   ├── src/          # React 组件
│   │   └── tailwind.config.js # Tailwind 配置
│   │
│   └── webview/           # WebView 前端应用
│       └── src/          # WebView 源码
│
├── pnpm-workspace.yaml    # 工作区配置
└── turbo.json            # Turborepo 配置
```

### 目录说明

- `apps/vscode-extension`: VS Code 插件主程序

  - 负责插件生命周期管理
  - 处理 VS Code 命令和事件
  - 集成 WebView 和核心功能

- `packages/core`: 核心业务逻辑

  - 提供共享的业务功能
  - 实现数据处理和状态管理
  - 定义核心 API 和接口

- `packages/ui`: UI 组件库

  - 基于 React 的可复用组件
  - 集成 Tailwind CSS 样式系统
  - 支持主题定制和响应式设计

- `packages/webview`: WebView 前端应用
  - 独立的 React 应用
  - 负责展示和用户交互
  - 与插件主程序通信

## 快速开始

1. 克隆项目:

   ```bash
   git clone [your-template-url]
   cd vscode-extension-template
   ```

2. 安装依赖:

   ```bash
   # 安装 pnpm（如果未安装）
   npm install -g pnpm@8.10.0

   # 安装项目依赖
   pnpm install
   ```

3. 开发模式:

   ```bash
   # 启动所有相关包的开发模式
   pnpm dev
   ```

4. VS Code 插件调试:
   - 在 VS Code 中打开项目根目录
   - 按 F5 启动调试（已预配置调试设置）
   - 在新窗口中使用 `Cmd/Ctrl + Shift + P` 运行 "Show WebView" 命令

## 开发指南

### 项目开发

1. **开发工作流**

   ```bash
   # 启动开发模式（监听所有相关包的变更）
   pnpm dev

   # 构建所有包
   pnpm build

   # 运行代码检查
   pnpm lint

   # 格式化代码
   pnpm format
   ```

2. **清理项目**
   ```bash
   # 清理所有构建缓存和依赖
   pnpm clean
   ```

### 包开发指南

1. **Core 包开发**

   - 位置：`packages/core`
   - 职责：实现核心业务逻辑
   - 开发建议：
     - 保持良好的类型定义
     - 编写单元测试
     - 遵循模块化原则

2. **UI 包开发**

   - 位置：`packages/ui`
   - 职责：提供可复用的 UI 组件
   - 开发建议：
     - 使用 Storybook 开发和测试组件
     - 遵循 Tailwind 设计规范
     - 确保组件的可访问性

3. **WebView 开发**

   - 位置：`packages/webview`
   - 职责：实现 VS Code WebView 界面
   - 开发建议：
     - 使用 React DevTools 调试
     - 注意状态管理和性能优化
     - 遵循 VS Code 的设计规范

4. **插件开发**
   - 位置：`apps/vscode-extension`
   - 职责：实现 VS Code 插件功能
   - 开发建议：
     - 使用 VS Code 调试工具
     - 查看开发者工具的控制台输出
     - 测试不同的 VS Code 主题兼容性

### 调试技巧

1. **WebView 调试**

   - 在 VS Code 中打开开发者工具（帮助 > 切换开发人员工具）
   - 使用 React DevTools 检查组件
   - 查看控制台输出和网络请求

2. **插件调试**

   - 使用断点和日志调试
   - 查看 VS Code 输出面板
   - 使用 VS Code 的调试控制台

3. **性能优化**
   - 使用 React Profiler 分析性能
   - 检查 Webpack 构建配置
   - 优化状态更新和渲染

### 发布准备

1. **版本发布**

   ```bash
   # 构建生产版本
   pnpm build

   # 运行测试
   pnpm test

   # 打包插件（在 apps/vscode-extension 目录下）
   cd apps/vscode-extension
   vsce package
   ```

2. **发布检查清单**
   - 确保所有测试通过
   - 检查构建产物
   - 在不同版本的 VS Code 中测试
   - 更新版本号和更新日志
   - 检查发布配置

## 常见问题

1. WebView 不显示？

   - 确保已运行 `pnpm build` 构建 WebView
   - 检查 WebView 的构建输出
   - 查看 VS Code 的开发者工具

2. 热重载不工作？
   - 确保开发服务器正在运行
   - 检查控制台错误
   - 重新加载 VS Code 窗口

## 许可证

MIT
