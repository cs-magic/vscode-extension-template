export interface WebviewMessage {
  type?: string;
  command?: 'alert' | 'error';
  text?: string;
  payload?: any;
}

export interface VSCodeAPI {
  postMessage: (message: WebviewMessage) => void;
  setState: (state: any) => void;
  getState: () => any;
}

declare global {
  interface Window {
    acquireVsCodeApi: () => VSCodeAPI;
  }
}

export {};
