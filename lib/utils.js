// Resolve styled-jsx plugins
function styledJsxOptions(opts) {
  if (!opts) {
    return {};
  }

  if (!Array.isArray(opts.plugins)) {
    return opts;
  }

  opts.plugins = opts.plugins.map(plugin => {
    if (Array.isArray(plugin)) {
      const [ name, options ] = plugin;
      return [ require.resolve(name), options ];
    }

    return require.resolve(plugin);
  });

  return opts;
}

function postcssOptions(opts, config) {
  if (!opts) {
    return {};
  }

  if (!opts.plugins) {
    return opts;
  }

  opts.plugins = Object.keys(opts.plugins).map(name => {
    const fn = opts.plugins[name];
    let pluginFn;

    if (Array.isArray(fn)) {
      pluginFn = fn[0](fn[1]);
    } else if (typeof fn === 'string') {
      pluginFn = require(fn);
    } else if (typeof fn === 'function') {
      pluginFn = fn(config);
    }

    return pluginFn;
  });

  return opts;
}

module.exports = {
  postcssOptions,
  styledJsxOptions,
};
