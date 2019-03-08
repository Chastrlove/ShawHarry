module.exports = function(api) {
  //https://babeljs.io/docs/en/config-files
  api.cache(true); //https://github.com/babel/babel/issues/9104#issuecomment-443448080
  return {
    presets: [
      [
        "@babel/preset-env",
        {
          targets: {
            ie: 9,
          },
          ignoreBrowserslistConfig: true,
          useBuiltIns: false,
          modules: false,
          exclude: ["transform-typeof-symbol"],
        },
      ],
      ["@babel/preset-react"],
      "@babel/preset-typescript",
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
      [
        "@babel/plugin-proposal-decorators",
        {
          legacy: true,
        },
      ],
      [
        "@babel/plugin-proposal-class-properties",
        {
          loose: true,
        },
      ],
      "@babel/plugin-proposal-object-rest-spread",
      "@babel/plugin-syntax-dynamic-import",
      "@babel/plugin-proposal-optional-chaining", //a?.b
      ["@babel/plugin-proposal-pipeline-operator", { proposal: "minimal" }], //a|>b
      [
        "@babel/plugin-transform-runtime",
        {
          corejs: false,
          helpers: true,
          regenerator: true,
          useESModules: true,
        },
      ],
    ],
  };
};
