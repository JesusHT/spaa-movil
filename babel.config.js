module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'], // Solo necesitas este preset
    // No más plugins, el preset se encarga de todo
  };
};