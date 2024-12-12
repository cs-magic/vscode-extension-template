import React from "react";
import { Button, Card, Input, Spinner } from "@template/ui";
// import '@template/ui/styles.css';
import "./styles.css";

import { useVSCode } from "./VSCodeProvider";

export interface WebviewAppProps {
  title?: string;
}

const WebviewApp: React.FC<WebviewAppProps> = ({
  title = "VSCode Extension",
}) => {
  const vscode = useVSCode();
  const [messages, setMessages] = React.useState<
    Array<{ text: string; timestamp: number; type: "sent" | "received" }>
  >([]);
  const [inputMessage, setInputMessage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    setIsLoading(true);
    try {
      const message = inputMessage.trim();
      vscode.postMessage({ command: "alert", text: message });
      setMessages((prev) => [
        ...prev,
        { text: message, timestamp: Date.now(), type: "sent" },
      ]);
      setInputMessage("");
      scrollToBottom();
      inputRef.current?.focus();
    } catch (error) {
      vscode.postMessage({ command: "error", text: "消息发送失败" });
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const message = event.data;
      if (message.type === "update") {
        setMessages((prev) => [
          ...prev,
          { text: message.text, timestamp: Date.now(), type: "received" },
        ]);
        scrollToBottom();
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const getStatusColor = () => {
    if (isLoading) return "bg-yellow-500";
    return messages.length > 0 ? "bg-green-500" : "bg-blue-500";
  };

  return (
    <div className="h-screen flex flex-col">
      {/* VSCode 风格的标题栏 */}
      <div className="h-[35px] flex items-center px-3 bg-[var(--vscode-titleBar-activeBackground)] text-[var(--vscode-titleBar-activeForeground)]">
        <div className="flex items-center space-x-2">
          <span
            className={`w-2.5 h-2.5 rounded-full ${getStatusColor()} transition-colors duration-200`}
          />
          <span className="text-[11px] opacity-60 select-none">extension</span>
          <span className="text-[13px] select-none">{title}</span>
        </div>
      </div>
      {/* 主内容区 */}
      <div className="flex-1 flex flex-col bg-[var(--vscode-editor-background)] text-[var(--vscode-editor-foreground)]">
        {/* 消息区域 */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full space-y-3 select-none">
              <div className="text-3xl opacity-30">⌘</div>
              <div className="flex items-center space-x-1.5 text-[12px] opacity-60">
                <span className="px-1.5 py-0.5 bg-[var(--vscode-button-secondaryBackground)] rounded">
                  Ctrl
                </span>
                <span>+</span>
                <span className="px-1.5 py-0.5 bg-[var(--vscode-button-secondaryBackground)] rounded">
                  Enter
                </span>
                <span>发送消息</span>
              </div>
            </div>
          )}
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.type === "sent" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-[4px] px-2.5 py-2 ${
                  msg.type === "sent"
                    ? "bg-[var(--vscode-button-background)] text-[var(--vscode-button-foreground)]"
                    : "bg-[var(--vscode-input-background)]"
                }`}
              >
                <pre className="text-[12px] font-mono whitespace-pre-wrap break-words leading-5">
                  <code>{msg.text}</code>
                </pre>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-[10px] font-mono opacity-50">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </span>
                  <span className="text-[10px] opacity-50">
                    {msg.type === "sent" ? "> sent" : "< received"}
                  </span>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* 输入区域 */}
        <div className="border-t border-[var(--vscode-panel-border)] bg-[var(--vscode-editor-background)] p-3">
          <div className="flex space-x-2">
            <div className="flex-1 relative">
              <Input
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="输入命令..."
                className="w-full h-[24px] text-[12px] font-mono"
                disabled={isLoading}
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[11px] opacity-40 select-none pointer-events-none">
                Press Ctrl+Enter to send
              </div>
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="h-[24px] min-w-[80px] text-[12px] font-mono"
            >
              {isLoading ? (
                <div className="flex items-center space-x-1.5">
                  <Spinner size="sm" />
                  <span>执行中</span>
                </div>
              ) : (
                <div className="flex items-center space-x-1.5">
                  <span>执行</span>
                  <span className="opacity-60">⌘⏎</span>
                </div>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { WebviewApp };
