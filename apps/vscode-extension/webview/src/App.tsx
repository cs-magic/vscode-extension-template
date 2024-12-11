import React, { useCallback, useEffect, useState } from 'react';
import { Button, Card } from '@template/ui';
import { MessageBus, StateManager } from '@template/core';

interface VSCodeApi {
  postMessage: (message: any) => void;
  getState: () => any;
  setState: (state: any) => void;
}

interface AppProps {
  vscode: VSCodeApi;
}

// Create message bus instance
const messageBus = new MessageBus();

// Create state manager instance
const stateManager = new StateManager<{
  theme: 'light' | 'dark';
  messages: string[];
}>({
  theme: 'light',
  messages: [],
});

export function App({ vscode }: AppProps) {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  // Handle messages from extension
  useEffect(() => {
    const messageHandler = (event: MessageEvent) => {
      const message = event.data;
      switch (message.type) {
        case 'update':
          setMessages(prev => [...prev, message.text]);
          break;
        case 'theme':
          stateManager.setState({ theme: message.value });
          break;
      }
    };

    window.addEventListener('message', messageHandler);
    return () => window.removeEventListener('message', messageHandler);
  }, []);

  // Subscribe to state changes
  useEffect(() => {
    return stateManager.subscribe(state => {
      // Update VS Code state
      vscode.setState(state);
    });
  }, [vscode]);

  // Handle send message
  const handleSend = useCallback(() => {
    if (inputValue.trim()) {
      vscode.postMessage({
        command: 'alert',
        text: inputValue,
      });
      setInputValue('');
    }
  }, [inputValue, vscode]);

  return (
    <div className="p-6">
      <Card title="VS Code WebView Demo">
        <div className="space-y-4">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              className="vscode-input flex-1"
              placeholder="输入消息..."
            />
            <Button onClick={handleSend}>发送</Button>
          </div>

          <div className="space-y-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className="p-2 bg-gray-100 dark:bg-gray-800 rounded"
              >
                {msg}
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
