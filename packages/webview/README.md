# @template/webview

VSCode Webview 功能库，提供了与 VSCode 扩展通信的基础设施。

## 功能特性

- VSCode Webview 通信适配器
- React 组件封装
- TypeScript 类型支持
- 主题集成

## 安装

```bash
pnpm add @template/webview
```

## 使用方法

```typescript
import { VSCodeProvider, WebviewApp } from '@template/webview';

function App() {
  const handleMessage = (message) => {
    console.log('Received message:', message);
  };

  return (
    <VSCodeProvider onMessage={handleMessage}>
      <WebviewApp title="My Extension" />
    </VSCodeProvider>
  );
}
```

## API 文档

### VSCodeProvider

提供 VSCode Webview API 的 React Context。

Props:
- `children`: React.ReactNode
- `onMessage`: (message: WebviewMessage) => void

### WebviewApp

预配置的 Webview 应用组件。

Props:
- `title`: string (可选) - 应用标题

### useVSCode

用于访问 VSCode API 的 React Hook。

返回值:
- `postMessage`: (message: WebviewMessage) => void
- `setState`: (state: any) => void
- `getState`: () => any
