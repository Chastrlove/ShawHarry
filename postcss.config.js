module.exports = {
  sourceMap: true,
  plugins: function() {
    return [
      require("precss"),
      require("postcss-preset-env")({
        autoprefixer: { grid: true },
      }),
    ];
  },
};
