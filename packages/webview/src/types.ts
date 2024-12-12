export interface WebviewMessage {
  command: string;
  text?: string;
  [key: string]: any;
}

export interface VSCodeAPI {
  postMessage(message: WebviewMessage): void;
  setState(state: any): void;
  getState(): any;
}

declare global {
  interface Window {
    acquireVsCodeApi(): VSCodeAPI;
  }
}
