import * as vscode from "vscode";
import * as path from "path";

const log = {
  info: (...args: any[]) => {
    console.log("[Extension]", ...args);
  },
  error: (...args: any[]) => {
    console.error("[Extension]", ...args);
    vscode.window.showErrorMessage(args.join(" "));
  },
};

function getWebviewContent(webviewJsSrc: vscode.Uri): string {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src vscode-resource: https:; script-src 'unsafe-eval' 'unsafe-inline' vscode-resource:; style-src vscode-resource: 'unsafe-inline';">
      <title>VSCode Extension Template</title>
    </head>
    <body>
      <div id="root"></div>
      <script src="${webviewJsSrc}"></script>
    </body>
  </html>`;
}

export function activate(context: vscode.ExtensionContext) {
  log.info("Extension is now active!");

  try {
    let disposable = vscode.commands.registerCommand(
      "extension.showWebview",
      () => {
        try {
          const panel = vscode.window.createWebviewPanel(
            "templateWebview",
            "Template Webview",
            vscode.ViewColumn.One,
            {
              enableScripts: true,
              retainContextWhenHidden: true,
              localResourceRoots: [
                vscode.Uri.file(path.join(context.extensionPath, "dist")),
              ],
            }
          );

          const webviewJsPath = vscode.Uri.file(
            path.join(context.extensionPath, "dist", "webview.js")
          );
          const webviewJsSrc = panel.webview.asWebviewUri(webviewJsPath);

          panel.webview.html = getWebviewContent(webviewJsSrc);

          // 处理来自 webview 的消息
          panel.webview.onDidReceiveMessage(
            message => {
              switch (message.command) {
                case 'alert':
                  vscode.window.showInformationMessage(message.text);
                  // 发送响应回 webview
                  panel.webview.postMessage({ 
                    type: 'update',
                    text: `Extension received: ${message.text}`
                  });
                  return;
              }
            },
            undefined,
            context.subscriptions
          );
        } catch (error) {
          log.error("Failed to show webview:", error);
        }
      }
    );

    context.subscriptions.push(disposable);
  } catch (error) {
    log.error("Failed to activate extension:", error);
  }
}

export function deactivate() {
  log.info("Extension is deactivating...");
}
