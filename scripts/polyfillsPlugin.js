const { addSideEffect } = require("@babel/helper-module-imports");

// slightly modifiled from @babel/preset-env/src/utils
// use an absolute path for core-js modules, to fix conflicts of different core-js versions
function getModulePath(mod, useAbsolutePath) {
  const modPath = mod === "regenerator-runtime" ? "regenerator-runtime/runtime" : `core-js/modules/${mod}`;
  return useAbsolutePath ? require.resolve(modPath) : modPath;
}

function createImport(path, mod, useAbsolutePath) {
  return addSideEffect(path, getModulePath(mod, useAbsolutePath));
}

function getPolyfills(targets, includes, { ignoreBrowserslistConfig, configPath }) {
  const { isPluginRequired } = require("@babel/preset-env");
  const builtInsList = require("core-js-compat/data");
  const getTargets = require("@babel/preset-env/lib/targets-parser").default;
  const builtInTargets = getTargets(targets, {
    ignoreBrowserslistConfig,
    configPath,
  });

  return includes.filter((item) => {
    return isPluginRequired(builtInTargets, builtInsList[item]);
  });
}

// add polyfill imports to the first file encountered.
module.exports = ({ types }, { polyfills, entryFiles = [], useAbsolutePath }) => {
  const userPolyfills = getPolyfills(undefined, polyfills, {
    ignoreBrowserslistConfig: false,
    configPath: undefined,
  });

  return {
    name: "inject-polyfills",
    visitor: {
      Program(path, state) {
        if (!entryFiles.includes(state.filename)) {
          return;
        }

        // imports are injected in reverse order
        userPolyfills
          .slice()
          .reverse()
          .forEach((p) => {
            createImport(path, p, useAbsolutePath);
          });
      },
    },
  };
};
