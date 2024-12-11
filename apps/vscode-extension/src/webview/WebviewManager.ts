import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export class WebviewManager {
  private panel: vscode.WebviewPanel | undefined;
  private context: vscode.ExtensionContext;
  private readonly webviewPath: string;

  constructor(context: vscode.ExtensionContext) {
    this.context = context;
    this.webviewPath = path.join(context.extensionPath, 'webview', 'dist');
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
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

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
