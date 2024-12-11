# VS Code Extension Template

一个现代化的 VS Code 插件开发模板，基于 YAAC 项目的技术栈，集成了：

- 🏃 Turborepo - 高性能的构建系统
- 📝 TypeScript - 类型安全的开发体验
- 🖼️ WebView - VS Code 自定义界面
- ⚛️ React - 组件化开发
- 🎨 Tailwind CSS - 现代化 UI 设计
- 🛠️ VS Code API - 深度扩展集成
- 📦 Webpack - 优化的打包工具

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
│   └── vscode-extension/    # VS Code 插件主体
│       ├── src/            # 插件源码
│       └── webview/        # React WebView 应用
├── packages/
│   ├── ui/                # 共享 UI 组件
│   ├── core/             # 核心业务逻辑
│   └── config/           # 共享配置
├── package.json
└── turbo.json
```

## 快速开始

1. 克隆模板:
   ```bash
   git clone [your-template-url]
   ```

2. 安装依赖:
   ```bash
   pnpm install
   ```

3. 开发模式:
   ```bash
   # 在根目录运行
   pnpm dev
   ```

4. VS Code 插件调试:
   - 打开 VS Code
   - 打开 `apps/vscode-extension` 目录
   - 按 F5 启动调试
   - 使用 `Ctrl/Cmd + Shift + P` 运行 "Show WebView" 命令

## 开发指南

### WebView 开发

1. WebView 开发服务器:
   ```bash
   cd apps/vscode-extension/webview
   pnpm dev
   ```
   这将启动一个开发服务器，你可以在浏览器中预览和调试 React 应用。

2. 构建 WebView:
   ```bash
   cd apps/vscode-extension/webview
   pnpm build
   ```
   构建后的文件会被放在 `dist` 目录，插件会自动加载这些文件。

### 插件开发

1. 启动插件开发:
   ```bash
   cd apps/vscode-extension
   pnpm dev
   ```
   这将同时启动插件和 WebView 的开发模式。

2. 调试流程:
   - 在 VS Code 中打开 `apps/vscode-extension` 目录
   - 确保 WebView 已经构建 (`pnpm build`)
   - 按 F5 启动插件调试
   - 使用命令面板测试功能

### 开发最佳实践

1. **WebView 开发**
   - 使用 React DevTools 调试
   - 利用热重载加快开发
   - 遵循 VS Code 的设计规范

2. **插件开发**
   - 使用 VS Code 的调试工具
   - 查看输出面板的日志
   - 测试不同的 VS Code 主题

3. **发布准备**
   - 运行完整构建
   - 测试打包后的插件
   - 检查所有功能

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
