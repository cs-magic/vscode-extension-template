/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    '../ui/src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'vscode': {
          'editor': {
            'background': 'var(--vscode-editor-background)',
            'foreground': 'var(--vscode-editor-foreground)',
          },
          'button': {
            'background': 'var(--vscode-button-background)',
            'foreground': 'var(--vscode-button-foreground)',
            'hover': 'var(--vscode-button-hoverBackground)',
            'secondary': 'var(--vscode-button-secondaryBackground)',
            'secondary-hover': 'var(--vscode-button-secondaryHoverBackground)',
          },
          'input': {
            'background': 'var(--vscode-input-background)',
            'foreground': 'var(--vscode-input-foreground)',
            'border': 'var(--vscode-input-border)',
            'placeholder': 'var(--vscode-input-placeholderForeground)',
          },
          'dropdown': {
            'background': 'var(--vscode-dropdown-background)',
            'foreground': 'var(--vscode-dropdown-foreground)',
            'border': 'var(--vscode-dropdown-border)',
          },
        },
      },
    },
  },
  plugins: [],
}
