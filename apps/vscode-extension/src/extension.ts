import * as vscode from 'vscode';
import { WebviewManager } from './webview/WebviewManager';

export function activate(context: vscode.ExtensionContext) {
  console.log('Extension is now active!');

  const webviewManager = new WebviewManager(context);

  let disposable = vscode.commands.registerCommand('extension.showWebview', () => {
    webviewManager.show();
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
