module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage",
        corejs: 3,
        modules: false,
        exclude: ["transform-typeof-symbol"],
      },
    ],
    ["@babel/preset-react"],
    ["@babel/preset-typescript"],
  ],
  plugins: [
    [
      "import",
      {
        libraryName: "antd",
        style: "css",
      },

      "antd",
    ],
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    [
      "@babel/plugin-proposal-class-properties",
      {
        loose: true,
      },
    ],
    [
      "@babel/plugin-proposal-object-rest-spread",
      {
        useBuiltIns: true,
      },
    ],
    [
      "@babel/plugin-transform-runtime",
      {
        corejs: false,
        helpers: true,
        regenerator: false, // 通过 preset-env 已经使用了全局的 regeneratorRuntime, 不再需要 transform-runtime 提供的 不污染全局的 regeneratorRuntime
        useESModules: true, // 使用 es modules helpers, 减少 commonJS 语法代码
      },
    ],
    ["@babel/plugin-syntax-dynamic-import"],
    /*[
      require("./scripts/polyfillsPlugin"),
      {
        polyfills: ["es.promise"],
        entryFiles: JSON.parse(process.env.ENTRY_FILES),
      },
    ],*/
  ],
};
