const { styledJsxOptions, postcssOptions } = require('../lib/utils');

exports.styledJsx = {
  postcss: {
    plugins: {
      lost: require('lost')({}),
      'postcss-nested': require('postcss-nested')({}),
    },
  },
};

exports.build = {
  babel: (babelConfig, config) => {
    babelConfig.plugins.push([
      require.resolve('styled-jsx/babel'),
      styledJsxOptions({
        plugins: [
          [
            'avet-styled-jsx-plugin-postcss',
            postcssOptions(config.styledJsx.postcss),
          ],
        ],
      }),
    ]);
    return babelConfig;
  },
};
