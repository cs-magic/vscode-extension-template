import React from 'react';
import ReactDOM from 'react-dom/client';
import { Button, Card, Input, Spinner } from '../components';
import '../styles.css';
import '../theme/vscode.css';
import { isInVSCode } from '../theme/vscode';

const DevApp = () => {
  const [theme, setTheme] = React.useState<'dark' | 'light'>('dark');
  const [loading, setLoading] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    // 如果不在 VSCode 中，添加主题切换功能
    if (!isInVSCode()) {
      document.documentElement.setAttribute('data-vscode-theme', theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleButtonClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (e.target.value.length < 3) {
      setError('输入至少需要 3 个字符');
    } else {
      setError('');
    }
  };

  return (
    <div className="min-h-screen bg-vscode-editor-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-vscode-foreground">UI 组件库开发环境</h1>
          {!isInVSCode() && (
            <Button variant="secondary" onClick={toggleTheme}>
              切换主题
            </Button>
          )}
        </div>
        
        <div className="space-y-8">
          {/* 按钮演示 */}
          <Card title="按钮组件">
            <div className="p-6 space-y-4">
              <h4 className="text-sm font-medium text-vscode-foreground opacity-80 mb-2">基础按钮</h4>
              <div className="space-x-4">
                <Button onClick={handleButtonClick}>
                  默认按钮
                </Button>
                <Button variant="secondary">
                  次要按钮
                </Button>
                <Button disabled>
                  禁用按钮
                </Button>
              </div>
              
              <h4 className="text-sm font-medium text-vscode-foreground opacity-80 mb-2">按钮尺寸</h4>
              <div className="space-x-4">
                <Button size="sm">小按钮</Button>
                <Button size="md">中按钮</Button>
                <Button size="lg">大按钮</Button>
              </div>

              <h4 className="text-sm font-medium text-vscode-foreground opacity-80 mb-2">加载状态</h4>
              <div>
                <Button onClick={handleButtonClick} disabled={loading}>
                  {loading ? <Spinner size="sm" /> : '加载按钮'}
                </Button>
              </div>
            </div>
          </Card>

          {/* 输入框演示 */}
          <Card title="输入框组件">
            <div className="p-6 space-y-4">
              <h4 className="text-sm font-medium text-vscode-foreground opacity-80 mb-2">基础输入框</h4>
              <Input
                label="基础输入框"
                placeholder="请输入内容"
              />
              
              <h4 className="text-sm font-medium text-vscode-foreground opacity-80 mb-2">带验证的输入框</h4>
              <Input
                label="带验证的输入框"
                value={inputValue}
                onChange={handleInputChange}
                error={error}
                placeholder="请输入至少 3 个字符"
              />

              <h4 className="text-sm font-medium text-vscode-foreground opacity-80 mb-2">禁用状态</h4>
              <Input
                label="禁用状态"
                disabled
                value="禁用的输入框"
              />
            </div>
          </Card>

          {/* 加载动画演示 */}
          <Card title="加载动画组件">
            <div className="p-6">
              <h4 className="text-sm font-medium text-vscode-foreground opacity-80 mb-4">不同尺寸</h4>
              <div className="space-x-4">
                <div className="inline-block p-2">
                  <Spinner size="sm" />
                </div>
                <div className="inline-block p-2">
                  <Spinner size="md" />
                </div>
                <div className="inline-block p-2">
                  <Spinner size="lg" />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <DevApp />
    </React.StrictMode>
  );
}
