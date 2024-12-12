import * as vscode from 'vscode';
import { WebviewProvider } from '@template/webview';

const log = {
  info: (...args: any[]) => {
    console.log('[Extension]', ...args);
  },
  error: (...args: any[]) => {
    console.error('[Extension]', ...args);
    vscode.window.showErrorMessage(args.join(' '));
  }
};

export function activate(context: vscode.ExtensionContext) {
  log.info('Extension is now active!');

  try {
    let disposable = vscode.commands.registerCommand('extension.showWebview', () => {
      try {
        const panel = vscode.window.createWebviewPanel(
          'templateWebview',
          'Template Webview',
          vscode.ViewColumn.One,
          {
            enableScripts: true,
            retainContextWhenHidden: true
          }
        );

        panel.webview.html = getWebviewContent();
      } catch (error) {
        log.error('Failed to show webview:', error);
      }
    });

    context.subscriptions.push(disposable);
  } catch (error) {
    log.error('Failed to activate extension:', error);
  }
}

function getWebviewContent() {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Template Webview</title>
    </head>
    <body>
        <div id="root"></div>
        <script src="${WebviewProvider}"></script>
    </body>
    </html>`;
}

export function deactivate() {
  log.info('Extension is deactivating...');
}
