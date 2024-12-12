const path = require("path");

const distDir = path.resolve(__dirname, "dist");
console.log("Dist directory:", distDir); // 打印输出目录以便确认

/** @type {import('webpack').Configuration} */
const extensionConfig = {
  target: "node",
  mode: "none",
  entry: "./src/extension.ts",
  output: {
    path: distDir,
    filename: "extension.js",
    libraryTarget: "commonjs2",
  },
  externals: {
    vscode: "commonjs vscode",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
    ],
  },
  devtool: "nosources-source-map",
  infrastructureLogging: {
    level: "log",
  },
};

/** @type {import('webpack').Configuration} */
const webviewConfig = {
  target: "web",
  mode: "development",
  entry: path.resolve(__dirname, "../../packages/webview/src/index.tsx"),
  output: {
    path: distDir,
    filename: "webview.js",
    libraryTarget: "window",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      "@template/ui$": path.resolve(__dirname, "../../packages/ui/src/index.tsx"),
      "@template/core$": path.resolve(__dirname, "../../packages/core/src/index.ts"),
    },
    fallback: {
      "react": require.resolve("react"),
      "react-dom": require.resolve("react-dom"),
      "react/jsx-runtime": require.resolve("react/jsx-runtime"),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  devtool: "source-map",
};

module.exports = [extensionConfig, webviewConfig];
