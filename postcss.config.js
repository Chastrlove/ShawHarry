const paths = require("./config/path");
const isEnvProduction = process.env.NODE_ENV === "production";
module.exports = {
  sourceMap: isEnvProduction,
  plugins: function() {
    return [
      require("postcss-import")({
        resolve: (id, basedir, importOptions) => {
          return `${paths.clientPath}/${id}`;
        },
      }),
      require("postcss-apply"),
      require("postcss-flexbugs-fixes"),
      require("postcss-preset-env")({
        autoprefixer: { grid: true },
        importFrom: [paths.cssVar],
      }),
      require("postcss-normalize")(),
      require("precss"),
      require("postcss-plugin-px2rem")({
        rootValue: 100,
        unitPrecision: 5,
        propWhiteList: [],
        propBlackList: [],
        selectorBlackList: [],
        ignoreIdentifier: false,
        replace: true,
        mediaQuery: false,
        minPixelValue: 0,
      }),
    ];
  },
};
