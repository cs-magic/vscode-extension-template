import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './styles.css';

// VS Code WebView API
declare global {
  interface Window {
    acquireVsCodeApi: () => {
      postMessage: (message: any) => void;
      getState: () => any;
      setState: (state: any) => void;
    };
  }
}

// Initialize VS Code API
const vscode = window.acquireVsCodeApi();

// Create root container
const container = document.getElementById('root');
const root = createRoot(container!);

// Render app
root.render(
  <React.StrictMode>
    <App vscode={vscode} />
  </React.StrictMode>
);
