module.exports = {
  sourceMap: true,
  plugins: function() {
    return [
      require("postcss-preset-env")({
        autoprefixer: { grid: true },
      }),
    ];
  },
};
