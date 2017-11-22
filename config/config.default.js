const { styledJsxOptions } = require('../lib/utils');

exports.styledJsx = {
  postcss: {
    plugins: [ require('lost')({}), require('postcss-nested')({}) ],
  },
};

exports.build = {
  babel: (babelConfig, config) => {
    babelConfig.plugins.push([
      require.resolve('styled-jsx/babel'),
      styledJsxOptions({
        plugins: [
          [ require.resolve('../lib/processor'), config.styledJsx.postcss ],
        ],
      }),
    ]);
    return babelConfig;
  },
};
