const { loopWhile } = require('deasync');
const postcss = require('postcss');

let _processor;

function processor(src, options) {
  options = options || {};
  const { plugins } = options;

  return Promise.resolve()
    .then(() => {
      if (!_processor) {
        _processor = postcss(plugins);
      }
      return _processor.process(src);
    })
    .then(result => result.css);
}

module.exports = (css, settings) => {
  const cssWithPlaceholders = css.replace(
    /%%styled-jsx-placeholder-(\d+)%%/g,
    (_, id) => `/*%%styled-jsx-placeholder-${id}%%*/`
  );
  let processedCss;
  let wait = true;

  function resolved(result) {
    processedCss = result;
    wait = false;
  }

  processor(cssWithPlaceholders, settings)
    .then(resolved)
    .catch(resolved);
  loopWhile(() => wait);

  if (processedCss instanceof Error || processedCss.name === 'CssSyntaxError') {
    throw processedCss;
  }

  return processedCss.replace(
    /\/\*%%styled-jsx-placeholder-(\d+)%%\*\//g,
    (_, id) => `%%styled-jsx-placeholder-${id}%%`
  );
};
