import React, { createContext, useContext, useEffect, useState } from 'react';
import type { VSCodeAPI, WebviewMessage } from './types';

interface VSCodeContextType {
  postMessage: (message: WebviewMessage) => void;
  setState: (state: any) => void;
  getState: () => any;
}

const VSCodeContext = createContext<VSCodeContextType | null>(null);

export const useVSCode = () => {
  const context = useContext(VSCodeContext);
  if (!context) {
    throw new Error('useVSCode must be used within a VSCodeProvider');
  }
  return context;
};

interface VSCodeProviderProps {
  children: React.ReactNode;
  onMessage?: (message: WebviewMessage) => void;
}

export const VSCodeProvider: React.FC<VSCodeProviderProps> = ({
  children,
  onMessage
}) => {
  const [vscode] = useState<VSCodeAPI>(() => {
    try {
      return window.acquireVsCodeApi();
    } catch (error) {
      console.error('Failed to acquire VSCode API:', error);
      return {
        postMessage: (message: WebviewMessage) => {
          console.log('Mock postMessage:', message);
        },
        setState: (state: any) => {
          console.log('Mock setState:', state);
        },
        getState: () => {
          console.log('Mock getState');
          return {};
        }
      };
    }
  });

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      onMessage?.(event.data);
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onMessage]);

  return (
    <VSCodeContext.Provider value={vscode}>
      {children}
    </VSCodeContext.Provider>
  );
};
