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

module.exports = {
  styledJsxOptions,
};
