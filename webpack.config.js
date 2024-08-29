const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = (env) => {
  const isProd = env.mode === "production";
  const output = isProd
    ? {
        filename: "bundle.js",
        path: path.resolve(__dirname, "build"),
      }
    : {
        // filename: "bundle.js",
        path: path.resolve(__dirname, "build"),
      };

  const plugins = [];

  return {
    context: __dirname,
    target: "node",
    externals: [nodeExternals()],
    entry: path.resolve(__dirname, "./src/main.ts"),
    devtool: isProd ? false : "source-map",
    mode: env.mode,
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".js"],
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    stats: {
      colors: true,
    },
    output,
    plugins,
  };
};
