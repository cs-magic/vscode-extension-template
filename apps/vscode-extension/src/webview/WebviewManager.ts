import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export class WebviewManager {
  private panel: vscode.WebviewPanel | undefined;
  private context: vscode.ExtensionContext;
  private readonly webviewPath: string;

  constructor(context: vscode.ExtensionContext) {
    this.context = context;
    // 使用新的 UI 包路径
    this.webviewPath = path.join(context.extensionPath, 'node_modules', '@template', 'vscode-extension-ui', 'dist');
  }

  public show() {
    if (this.panel) {
      this.panel.reveal(vscode.ViewColumn.One);
    } else {
      this.panel = vscode.window.createWebviewPanel(
        'extensionWebview',
        'Extension WebView',
        vscode.ViewColumn.One,
        {
          enableScripts: true,
          retainContextWhenHidden: true,
          localResourceRoots: [
            vscode.Uri.file(this.webviewPath)
          ]
        }
      );

      this.panel.webview.html = this.getWebviewContent();

      this.panel.onDidDispose(
        () => {
          this.panel = undefined;
        },
        null,
        this.context.subscriptions
      );

      // Handle messages from the webview
      this.panel.webview.onDidReceiveMessage(
        message => {
          switch (message.command) {
            case 'alert':
              vscode.window.showInformationMessage(message.text);
              // Send response back to webview
              this.panel?.webview.postMessage({
                type: 'update',
                text: `Received: ${message.text}`
              });
              return;
          }
        },
        undefined,
        this.context.subscriptions
      );
    }
  }

  private getWebviewContent() {
    const htmlPath = path.join(this.webviewPath, 'index.html');
    let htmlContent;
    try {
      htmlContent = fs.readFileSync(htmlPath, 'utf-8');
    } catch (error) {
      return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Extension WebView</title>
</head>
<body>
  <div id="root">
    <h1>Failed to load UI</h1>
    <p>Error: ${error instanceof Error ? error.message : String(error)}</p>
  </div>
</body>
</html>`;
    }

    // Get paths to scripts and styles
    const scriptPathOnDisk = vscode.Uri.file(
      path.join(this.webviewPath, 'main.js')
    );
    const scriptUri = this.panel!.webview.asWebviewUri(scriptPathOnDisk);

    // Replace placeholders in HTML
    return htmlContent
      .replace(
        /<%=\s*webview\.cspSource\s*%>/g,
        this.panel!.webview.cspSource
      )
      .replace(
        '</body>',
        `<script src="${scriptUri}"></script></body>`
      );
  }
}
