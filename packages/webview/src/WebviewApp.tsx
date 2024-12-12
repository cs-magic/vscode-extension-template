import React from 'react';
import { Button, Card } from '@template/ui';

import { useVSCode } from './VSCodeProvider';

export interface WebviewAppProps {
  title?: string;
}

export const WebviewApp: React.FC<WebviewAppProps> = ({ title = 'VSCode Extension' }) => {
  const vscode = useVSCode();
  const [messages, setMessages] = React.useState<string[]>([]);

  const handleClick = () => {
    const message = 'Hello from Webview!';
    vscode.postMessage({ command: 'alert', text: message });
    setMessages(prev => [...prev, `Sent: ${message}`]);
  };

  React.useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const message = event.data;
      if (message.type === 'update') {
        setMessages(prev => [...prev, message.text]);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className="p-4">
      <Card>
        <h1 className="text-2xl font-bold mb-4">{title}</h1>
        <Button onClick={handleClick}>Send Message</Button>
        <div className="mt-4">
          {messages.map((msg, index) => (
            <p key={index} className="text-sm">{msg}</p>
          ))}
        </div>
      </Card>
    </div>
  );
};
