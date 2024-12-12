import React from 'react';
import { Button, Card, Input, Spinner } from '@template/ui';

import { useVSCode } from './VSCodeProvider';

export interface WebviewAppProps {
  title?: string;
}

export const WebviewApp: React.FC<WebviewAppProps> = ({ title = 'VSCode Extension' }) => {
  const vscode = useVSCode();
  const [messages, setMessages] = React.useState<Array<{ text: string; timestamp: number; type: 'sent' | 'received' }>>([]);
  const [inputMessage, setInputMessage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    setIsLoading(true);
    try {
      const message = inputMessage.trim();
      vscode.postMessage({ command: 'alert', text: message });
      setMessages(prev => [...prev, { text: message, timestamp: Date.now(), type: 'sent' }]);
      setInputMessage('');
      scrollToBottom();
    } catch (error) {
      vscode.postMessage({ command: 'error', text: '消息发送失败' });
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const message = event.data;
      if (message.type === 'update') {
        setMessages(prev => [...prev, { text: message.text, timestamp: Date.now(), type: 'received' }]);
        scrollToBottom();
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Card className="flex-1 m-4 overflow-hidden flex flex-col">
        <div className="border-b border-gray-200 p-4">
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.type === 'sent' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  msg.type === 'sent'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                <p className="text-sm break-words">{msg.text}</p>
                <p className="text-xs mt-1 opacity-70">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t border-gray-200 p-4">
          <div className="flex space-x-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
              placeholder="输入消息..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="min-w-[100px]"
            >
              {isLoading ? <Spinner size="sm" /> : '发送'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
