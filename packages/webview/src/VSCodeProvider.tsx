import React, { createContext, useContext, useEffect, useState } from "react";
import type { VSCodeAPI, WebviewMessage } from "./types";

interface VSCodeContextType {
  postMessage: (message: WebviewMessage) => void;
  setState: (state: any) => void;
  getState: () => any;
}

const VSCodeContext = createContext<VSCodeContextType | null>(null);

export const useVSCode = () => {
  const context = useContext(VSCodeContext);
  if (!context) {
    throw new Error("useVSCode must be used within a VSCodeProvider");
  }
  return context;
};

interface VSCodeProviderProps {
  children: React.ReactNode;
  onMessage?: (message: WebviewMessage) => void;
}

// 创建一个 mock VSCode API 用于开发环境
const mockVSCodeAPI = (): VSCodeAPI => ({
  postMessage: (message: WebviewMessage) => {
    console.log("Mock postMessage:", message);
  },
  setState: (state: any) => {
    console.log("Mock setState:", state);
  },
  getState: () => {
    console.log("Mock getState");
    return {};
  },
});

// 获取 VSCode API 的函数
const getVSCodeAPI = (): VSCodeAPI => {
  try {
    if (typeof window.acquireVsCodeApi === 'function') {
      // 使用 let 避免重复获取 API
      if (!(window as any).vscodeApi) {
        (window as any).vscodeApi = window.acquireVsCodeApi();
      }
      return (window as any).vscodeApi;
    }
  } catch (error) {
    console.warn('Failed to acquire VSCode API:', error);
  }
  return mockVSCodeAPI();
};

export const VSCodeProvider: React.FC<VSCodeProviderProps> = ({
  children,
  onMessage,
}) => {
  const [vscode] = useState<VSCodeAPI>(getVSCodeAPI);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      onMessage?.(event.data);
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [onMessage]);

  // const contextValue: VSCodeContextType = {
  //   postMessage: vscode.postMessage.bind(vscode),
  //   setState: vscode.setState.bind(vscode),
  //   getState: vscode.getState.bind(vscode)
  // };

  return (
    <VSCodeContext.Provider value={vscode}>{children}</VSCodeContext.Provider>
  );
};
