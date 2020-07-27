/*module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", {
      "targets": {
        "node": "current"
      }
    }]
    ]
  };
};
*/

module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};
